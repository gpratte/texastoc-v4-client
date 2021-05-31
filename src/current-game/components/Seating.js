import React from 'react'
import {flatMap, filter, map} from 'lodash';
import Table from 'react-bootstrap/Table';
import SeatingConfig from "./SeatingConfig";
import Button from "react-bootstrap/Button";
import leagueStore from '../../league/leagueStore'
import {TOGGLE_CONFIGURE_SEATING} from "../gameActions";
import {notifySeating} from "../gameClient";

class Seating extends React.Component {

  renderTables(tables) {
    const seats = flatMap(tables, ({seats}) =>
      map(seats, seat => ({...seat}))
    );
    const seatsWithPlayer = filter(seats, (seat) => seat.gamePlayerId)
    return map(seatsWithPlayer, (seat, index) => {
      const {seatNum, tableNum, gamePlayerName} = seat;
      return (
        <tr key={index}>
          <td>{tableNum}</td>
          <td>{seatNum}</td>
          <td>{gamePlayerName}</td>
        </tr>
      )
    })
  }

  render() {
    const game = this.props.game;
    const tables = game.data.seating && game.data.seating.gameTables ? game.data.seating.gameTables: null;
    const isSeated = tables && tables.length > 0 && tables[0].seats && tables[0].seats.length > 0;
    const isNotified = game.seatingNotified;
    return (
      <div>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            <th>Table</th>
            <th>Seat</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTables(tables)}
          </tbody>
        </Table>
        <Button variant="outline-secondary"
                onClick={() => leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: true})}>
          Configure Seating
        </Button>
        {
          isSeated && !isNotified &&
          <Button variant="outline-secondary"
                  className={'notify-seating'}
                  onClick={() => notifySeating()}>
            Notify <i className="fas fa-question"></i>
          </Button>
        }
        {
          isSeated && isNotified &&
          <Button variant="outline-secondary"
                  className={'notify-seating'}
                  onClick={() => notifySeating()}>
            Notified <i className="fas fa-check"></i>
          </Button>
        }
        {/*TODO ask about key to remount the react component*/}
        <SeatingConfig key={game.showConfigureSeatingKey} game={game}/>
      </div>
    );
  }
}

export default Seating
