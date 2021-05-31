import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addNewGame} from '../gameClient'
import {shouldRedirect, redirect} from '../../utils/util';
import DatePicker from "react-datepicker";

class NewGame extends React.Component {

  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };


  renderPlayers(players) {
    return players.map((player, index) => {
      const {
        id, firstName, lastName
      } = player;
      return (
        <option key={id} value={id}>{firstName}{(firstName && lastName) ? ' ' : ''}{lastName}</option>
      )
    })
  }

  addNewGame = (e) => {
    e.preventDefault();
    const hostId = e.target.elements.hostId.value;
    addNewGame(this.state.startDate.getMonth(),
      this.state.startDate.getDate(),
      this.state.startDate.getFullYear(),
      hostId);
  }


  render() {
    let redirectTo;
    if ((redirectTo = shouldRedirect(this.props.league))) {
      return redirect(redirectTo);
    }

    const {players} = this.props.league;

    return (
      <div>
        <br/>
        <h1>New Game</h1>
        <br/>
        <Form onSubmit={this.addNewGame}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
              <br/>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Host</Form.Label>
            <Form.Control as="select" id="hostId">
              {this.renderPlayers(players)}
            </Form.Control>
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">New Game</Button>
        </Form>
      </div>
    );
  }
}

export default NewGame
