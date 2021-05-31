import React from 'react'
import moment from 'moment-timezone'
import Table from 'react-bootstrap/Table';

class SeasonDetails extends React.Component {

  render() {
    const {
      start, end, numGamesPlayed, totalCombinedAnnualTocCalculated, kittyCalculated} = this.props.value;

    const startDate = moment(start).tz('America/Chicago').format('MM/DD/YYYY')
    const endDate = moment(end).tz('America/Chicago').format('MM/DD/YYYY')

    return (
      <div>
        <Table borderless={true} size="sm">
          <tbody>
          <tr>
            <td>Start date</td>
            <td>{startDate}</td>
          </tr>
          <tr>
            <td>End date</td>
            <td>{endDate}</td>
          </tr>
          <tr>
            <td>Games</td>
            <td>{numGamesPlayed}</td>
          </tr>
          <tr>
            <td>Kitty</td>
            <td>${kittyCalculated}</td>
          </tr>
          <tr>
            <td>Annual TOC</td>
            <td>${totalCombinedAnnualTocCalculated}</td>
          </tr>
          </tbody>
        </Table>

      </div>
    );
  }
}

export default SeasonDetails
