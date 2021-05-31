import React from 'react'
import Table from 'react-bootstrap/Table';

class QuarterlySeasonStandings extends React.Component {

  renderStandings(players, hideEntries) {
    if (players) {
      return players.map((player, index) => {
        const {id, place, name, points, entries} = player
        return (
          <tr key={id}>
            <td>{place ? place : ''}</td>
            <td>{name}</td>
            <td>{points ? points : ''}</td>
            { hideEntries ? <td></td> : <td>{entries}</td>}
          </tr>
        )
      })
    }
  }

  render() {
    const {players, hideEntries} = this.props.value;
    let now = new Date();

    return (
      <Table striped bordered size="sm">
        <thead>
        <tr key={now.getTime()}>
          <th><i className="fas fa-clipboard-list"/></th>
          <th>Name</th>
          <th>Points</th>
          { hideEntries ? <th></th> : <th>Entries</th> }
        </tr>
        </thead>
        <tbody>
        {this.renderStandings(players, hideEntries)}
        </tbody>
      </Table>
    );
  }
}

export default QuarterlySeasonStandings
