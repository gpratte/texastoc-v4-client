import React from 'react'
import Button from "react-bootstrap/Button";
import {finalize, unfinalize} from "../seasonClient";

class Finalize extends React.Component {

  render() {
    const {seasonId, finalized} = this.props;

    if (finalized) {
      return (
        <Button variant="primary" onClick={() => unfinalize(seasonId)}>
          <i className="fas fa-lock"/>
        </Button>
      );
    }

    return (
      <div>
        <Button variant="primary" onClick={() => finalize(seasonId)}>
          End season  <i className="fas fa-lock-open"/>
        </Button>
      </div>
    );
  }
}

export default Finalize
