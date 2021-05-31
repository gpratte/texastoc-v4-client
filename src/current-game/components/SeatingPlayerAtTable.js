import React from 'react'
import './GamePlayers.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import _ from "lodash";

const fiveTables = [1, 2, 3, 4, 5]

class SeatingPlayerAtTable extends React.Component {

  constructor(props) {
    super(props);

    let enableSeatingRequests = false;
    _.forEach(this.props.seating.tableRequests, (tableRequest) => {
      if (tableRequest.gamePlayerId) {
        enableSeatingRequests = true;
      }
    });

    this.state = {
      enableSeatingRequests: enableSeatingRequests
    };
  }

  handleEnablingSeatingRequests() {
    this.setState(Object.assign({enableSeatingRequests: true}))
  }

  renderNumberOfTables() {
    return fiveTables.map((num) => {
      return (
        <option key={num} value={num}>{num}</option>
      )
    })
  }

  renderGamePlayers(gamePlayers, index) {
    return gamePlayers.map((gamePlayer) => {
      const {
        id, name
      } = gamePlayer;
      return (
        <option key={id} value={id}
                tablerequestindex={index}>{name}</option>
      )
    })
  }

  renderTableRequests(tableRequests, gamePlayers, renderGamePlayers, renderNumberOfTables, handlePlayerRequesting, handleTableRequesting) {
    return _.map(tableRequests, function (tableRequest, index) {
      return (
        <Form.Group key={index}>
          <Form.Label>Seat a Player at a Table</Form.Label>
          <Form.Control as="select"
                        defaultValue={tableRequest.gamePlayerId}
                        id={'playerRequestId-' + index}
                        onChange={(e) => handlePlayerRequesting(e, index)}>
            <option key={-1} value={-1} tablerequestindex={index}></option>
            {renderGamePlayers(gamePlayers, index)}
          </Form.Control>
          <Form.Control as="select"
                        defaultValue={tableRequest.tableNum}
                        id={'playerTableRequestId-' + index}
                        onChange={(e) => handleTableRequesting(e, index)}>
            {renderNumberOfTables()}
          </Form.Control>
        </Form.Group>
      )
    });
  }

  render() {
    if (this.state.enableSeatingRequests) {
      return (
        <div>
          {this.renderTableRequests(this.props.seating.tableRequests,
            this.props.gamePlayers,
            this.renderGamePlayers,
            this.renderNumberOfTables,
            this.props.handlePlayerRequesting,
            this.props.handleTableRequesting)}
          <Button variant="outline-secondary" onClick={() => this.props.handleAddAnotherRequest()}>
            Seat Another
          </Button>
        </div>
      );
    } else {
      return (
        <Button variant="outline-secondary" onClick={() => {
          this.props.handleAddAnotherRequest();
          this.handleEnablingSeatingRequests();
        }}>
          Seat a Player at a Table
        </Button>
      );
    }
  }
}

export default SeatingPlayerAtTable
