import React from 'react'
import './GamePlayers.css'
import Form from 'react-bootstrap/Form';
import _ from 'lodash';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const tenSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class SeatingSeatsPerTable extends React.Component {

  renderNumberOfSeatsPerTable() {
    return tenSeats.map((num) => {
      return (
        <option key={num} value={num}>{num}</option>
      )
    })
  }

  renderSeatsPerTable(seatsPerTables, renderNumberOfSeatsPerTable, handleChangeSeatsPerTable) {
    return _.map(seatsPerTables, function (seats, index) {
      return (
        <Form.Group key={index} as={Row} className="align-items-center">
          <Form.Label>&nbsp;&nbsp;Seats for Table {index + 1}</Form.Label>
          <Col>
            <Form.Control as="select"
                          defaultValue={seats.numSeats}
                          id={'seatsId-' + index}
                          onChange={(e) => handleChangeSeatsPerTable(e, index)}>
              {renderNumberOfSeatsPerTable()}
            </Form.Control>
          </Col>
        </Form.Group>
      )
    });
  }

  render() {
    const {seatsPerTables} = this.props.seating;

    return (
      <div>
        {this.renderSeatsPerTable(seatsPerTables, this.renderNumberOfSeatsPerTable, this.props.handleChangeSeatsPerTable)}
      </div>
    );
  }
}

export default SeatingSeatsPerTable
