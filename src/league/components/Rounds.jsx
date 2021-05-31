import React from 'react'
import {getRounds} from '../leagueClient'
import Table from "react-bootstrap/Table";

class Rounds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rounds: null
    };
  }

  componentDidMount() {
    getRounds(this.updateRounds);
  }

  updateRounds = (rounds) => {
    this.setState({rounds})
  }

  renderRound(round) {
    return (
      <tr key={round.name}>
        <td>{round.name}</td>
        <td>{round.smallBlind}</td>
        <td>{round.bigBlind}</td>
        <td>{round.ante}</td>
        <td>{round.duration}</td>
      </tr>
    )
  }

  render() {
    if (!this.state.rounds) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    return (
      <div>
        <br/>
        <Table striped bordered size="sm">
          <tbody>
          <tr>
            <th>Round</th>
            <th>Small</th>
            <th>Big</th>
            <th>Ante</th>
            <th>Time</th>
          </tr>
          {this.state.rounds.map(round => {
            return this.renderRound(round)
          })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Rounds
