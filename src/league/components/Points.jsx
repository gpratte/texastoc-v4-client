import React from 'react'
import {getPoints} from '../leagueClient'
import Table from "react-bootstrap/Table";

class Points extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      points: null
    };
  }

  componentDidMount() {
    getPoints(this.updatePoints);
  }

  updatePoints = (points) => {
    this.setState({points})
  }

  renderPoints1Through10(point) {
    return (
      <td>{point[1] ? point[1] : ''}</td>
    )
  }

  renderPoints(numPlayers, points) {
    return (
      <tr key={numPlayers}>
        <td>{numPlayers}</td>
        {Object.entries(points).map(point =>
          this.renderPoints1Through10(point))}
      </tr>

    )
  }

  render() {
    if (!this.state.points) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    const keys = Object.keys(this.state.points)
    return (
      <div>
        <br/>
        <Table striped bordered size="sm">
          <tbody>
          <tr key={'Players'}>
            <th>Players</th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>4th</th>
            <th>5th</th>
            <th>6th</th>
            <th>7th</th>
            <th>8th</th>
            <th>9th</th>
            <th>10th</th>
          </tr>
          {keys.map(key => {
            return this.renderPoints(key, this.state.points[`${key}`])
          })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Points
