import React from 'react'
import './GamePlayers.css'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SERVER_URL} from '../../utils/constants';
import Button from "react-bootstrap/Button";
import {back, forward, pause, resume, getClock} from "../clockClient";

/*
 * Websocket functionality taken from https://dev.to/finallynero/using-websockets-in-react-4fkp
 */
class ClockWebSocket extends React.Component {
  constructor(props) {
    super(props);
    // had to connect in the constructor because doing it in the
    // did mount had a race condition with the will unmount and
    // in that case the socket would never get closed
    const socket = this.connect();

    this.state = {
      clock: null,
      ws: socket
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.timer = setInterval(this.check, 10000);
    getClock(this.updateClock)
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.state.ws != null) {
      this.state.ws.close();
    }
    clearInterval(this.timer)
  }

  connect = () => {
    let socket = null;
    try {
      socket = new SockJS(SERVER_URL + '/socket');

      const that = this;

      const stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/clock', data => {
          const clock = JSON.parse(data.body.replace('\\"', '"'));
          that.setState({clock});
        });
      });

      // Take over the function that prints debug messages
      stompClient.debug = function (str) {
        // do nothing
      };
    } finally {
      if (this.mounted) {
        this.setState({ws: socket})
        getClock(this.updateClock)
      }
      return socket;
    }
  };

  check = () => {
    //check if websocket instance is closed, if so call `connect` function.
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect();
  };

  updateClock = (clock) => {
    if (this.mounted) {
      this.setState({clock: clock})
    }
  }

  render() {
    const clock = this.state.clock;
    if (!clock) return null;

    let seconds = '' + clock.seconds;
    if (clock.seconds < 10) {
      seconds = seconds.padStart(2, '0');
    }
    return (
      <div>
        <br/>
        {
          clock &&
          <div>
            <span className={'bigger-round'}>{clock.thisRound.name}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={'bigger-round'}>{clock.minutes}</span>:<span className={'bigger-round'}>{seconds}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={'bigger-round'}>{clock.thisRound.bigBlind}</span>/
            <span className={'bigger-round'}>{clock.thisRound.smallBlind}</span>/
            <span className={'bigger-round'}>{clock.thisRound.ante}</span>
            <br/>
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => back()}>
                <i className="fas fa-step-backward"></i>
              </Button>
            }
            {
              clock.playing &&
              <Button variant="link"
                      onClick={() => pause()}>
                <i className="fas fa-pause"/>
              </Button>
            }
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => resume()}>
                <i className="fas fa-play"/>
              </Button>
            }
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => forward()}>
                <i className="fas fa-step-forward"/>
              </Button>
            }
            <br/>
            <span>{clock.nextRound.name}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{clock.nextRound.bigBlind}</span>/
            <span>{clock.nextRound.smallBlind}</span>/
            <span>{clock.nextRound.ante}</span>
          </div>
        }
        <br/>
      </div>
    );
  }
}

export default ClockWebSocket
