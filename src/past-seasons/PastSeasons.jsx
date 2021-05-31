import React from 'react'
import {getPastSeasons} from './pastSeasonClient'
import Table from "react-bootstrap/Table";

class PastSeasons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seasons: null
    };
  }

  componentDidMount() {
    getPastSeasons(this.updatePastSeasons);
  }

  updatePastSeasons = (pastSeasons) => {
    this.setState({seasons: pastSeasons})
  }

  renderPlayer(player, index) {
    let name;
    if (player.name) {
      name = player.name;
    } else {
      name = player.firstName ? player.firstName : '';
      name += player.firstName && player.lastName ? ' ' : '';
      name += player.lastName ? player.lastName : '';
    }

    return (
      <tr key={name}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{player.points}</td>
        <td>{player.entries}</td>
      </tr>
    )
  }

  renderPastSeason(pastSeason) {
    return (
      <div key={pastSeason.startYear}>
        <h3>{pastSeason.startYear} - {pastSeason.endYear}</h3>
        <Table striped bordered size="sm">
          <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Points</th>
            <th>Entries</th>
          </tr>
          {pastSeason.players.map((player, index) => {
            return this.renderPlayer(player, index)
          })}
          </tbody>
        </Table>
      </div>
    )
  }

  render() {
    if (!this.state.seasons) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    return this.state.seasons.map((pastSeason, index) => {
      return (
        this.renderPastSeason(pastSeason)
      )
    })

  }
}

export default PastSeasons
