import React from 'react'
import './GamePlayers.css'

/*
 * Websocket functionality taken from https://dev.to/finallynero/using-websockets-in-react-4fkp
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      reconnect: true
    };
  }

  componentDidMount() {
    console.log('!!! did mount')
    if (this.state.ws != null) {
      console.log('!!! did mount closing ws')
      this.state.ws.close();
    }
    this.setState({ws: null, reconnect: true})
    this.connect();
  }

  componentWillUnmount() {
    console.log('!!! will unmount')
    if (this.state.ws != null) {
      console.log('!!! will unmoust closing ws')
      this.state.ws.close();
    }
    console.log('!!! setting state to reconnect false')
    this.setState({ws: null, reconnect: false})
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures
   * constant reconnection if connection closes
   */
  connect = () => {

    if (!this.state.reconnect) {
      console.log('!!! do not reconnect')
      return;
    }
    console.log('!!! will attempt to reconnect')

    var ws = new WebSocket("ws://localhost:8080/socket");
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("!!! connected websocket main component");

      this.setState({ws: ws, reconnect: true});

      that.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({dataFromServer: message})
      console.log('!!! message: ' + message)
    }

    // websocket onclose event listener
    ws.onclose = e => {
      console.log(
        `!!! Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );

      //call check function after timeout
      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
    };

    // websocket onerror event listener
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  };

  /**
   * utilited by the @function connect to check if the connection is close,
   * if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect();
  };


  render() {
    console.log('!!! render ' + JSON.stringify(this.state))
    return (
      <div>
        <h1>Clock</h1>
      </div>
    );
  }
}

export default Clock
