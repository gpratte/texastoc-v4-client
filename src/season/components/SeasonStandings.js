import React from 'react'
import Table from 'react-bootstrap/Table';

class SeasonStandings extends React.Component {

  renderStandings(players, guarenteed) {
    if (players) {
      let finalTable = 0;
      return players.map((player, index) => {
        const {id, place, name, points, entries} = player;

        let showFirstSeperator = false;
        let showSecondSeperator = false;
        let tocPayoutEligible = false;

        if (guarenteed !== 0) {
          if (guarenteed === index) {
            showFirstSeperator = true;
            ++finalTable
          } else if (finalTable < guarenteed + 8) {
            ++finalTable
          } else if (finalTable === guarenteed + 8) {
            showSecondSeperator = true;
            ++finalTable;
          }
        }

        if (points && points >= 250) {
          tocPayoutEligible = true;
        }
        if (entries >= 10) {
          tocPayoutEligible = true;
        }

        if (showFirstSeperator) {
          return (
            <>
              <tr key={id + 1000}>
                <td>--</td>
                <td>-------</td>
                <td>----</td>
                <td>--</td>
                <td></td>
              </tr>
              <tr key={id}>
                <td>{place ? place : ''}</td>
                <td>{name}</td>
                <td>{points ? points : ''}</td>
                <td>{entries}</td>
                <td>{tocPayoutEligible ? String.fromCharCode(10004) : String.fromCharCode(10005)}</td>
              </tr>
            </>
          )
        }
        if (showSecondSeperator) {
          return (
            <>
              <tr key={id + 1000}>
                <td>--</td>
                <td>-------</td>
                <td>----</td>
                <td>--</td>
                <td>--</td>
              </tr>
              <tr key={id}>
                <td>{place ? place : ''}</td>
                <td>{name}</td>
                <td>{points ? points : ''}</td>
                <td>{entries}</td>
                <td>{tocPayoutEligible ? String.fromCharCode(10004) : String.fromCharCode(10005)}</td>
              </tr>
            </>
          )
        }
        return (
          <tr key={id}>
            <td>{place ? place : ''}</td>
            <td>{name}</td>
            <td>{points ? points : ''}</td>
            <td>{entries}</td>
            <td>{tocPayoutEligible ? String.fromCharCode(10004) : String.fromCharCode(10005)}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const {players, guarenteed} = this.props.value;

    return (
      <div>
        <Table striped bordered size="sm">
          <thead>
          <tr key={0}>
            <th><i className="fas fa-clipboard-list"/></th>
            <th>Name</th>
            <th>Points</th>
            <th>Entries</th>
            <th>TOC<br/>Payout<br/>Eligible<sup>*</sup></th>
          </tr>
          </thead>
          <tbody>
          {this.renderStandings(players, guarenteed)}
          </tbody>
        </Table>
        <p><sup>*</sup>TOC Payout Eligible: Must have played at least 10 games or have 250 points</p>
      </div>
    );
  }
}

export default SeasonStandings
