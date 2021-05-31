import React from 'react'
import Button from "react-bootstrap/Button";
import {finalize, unfinalize} from "../gameClient";

class Finalize extends React.Component {

  render() {
    const {isGameOver, gameId, finalized} = this.props;

    if (finalized) {
      return (
        <Button variant="primary" onClick={() => unfinalize(gameId)}>
          <i className="fas fa-lock"/>
        </Button>
      );
    }

    if (!isGameOver) {
      return null;
    }

    return (
      <div>
        <Button variant="primary" onClick={() => finalize(gameId)}>
          End game  <i className="fas fa-lock-open"/>
        </Button>
      </div>
    );
  }
}

export default Finalize
