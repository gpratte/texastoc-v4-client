import React from 'react'
import moment from 'moment-timezone'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Game from "./Game";
import {redirect, shouldRedirect} from "../../utils/util";
import {unfinalize} from "../../current-game/gameClient";

class Games extends React.Component {

  unlock = (id) => {
    unfinalize(id);
  }

  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    const games = this.props.value;
    if (games) {
      return games.map((game, index) => {
        return (
          <Accordion key={game.id}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  {moment(game.date).tz('America/Chicago').format('MM/DD/YYYY')}
                </Accordion.Toggle>
                {
                  game.finalized &&
                  <Button variant="link" onClick={() => this.unlock(game.id)}>
                    <i className="fas fa-lock"/>
                  </Button>
                }
                {
                  !game.finalized &&
                  <Button variant="link" onClick={() => this.unlock(game.id)}>
                    <i className="fas fa-lock-open"/>
                  </Button>
                }
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body><Game value={game}/></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )
      })
    }
    return null;
  }
}

export default Games
