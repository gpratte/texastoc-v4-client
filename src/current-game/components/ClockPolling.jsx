import React from 'react'
import Button from "react-bootstrap/Button";
import {getClock, resume, pause, back, forward} from '../clockClient'

/*
 *
 */
class ClockPolling extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clock: null};
  }

  componentDidMount() {
    this.timer = setInterval(this.check, 900);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  check = () => {
    getClock(this.updateClock)
  };

  updateClock = (clock) => {
    this.setState({clock: clock})
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

export default ClockPolling
