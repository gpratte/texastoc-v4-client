import React from 'react'
import moment from 'moment-timezone'
import Table from 'react-bootstrap/Table';

class Details extends React.Component {

  renderPayouts(payouts) {
    if (!payouts) {
      return;
    }
    return payouts.map((payout, index) => {
      const {id, place, amount, chopAmount} = payout
      return (
        <tr key={id}>
          <td>{place}</td>
          {
            chopAmount &&
            <td><del>${amount}</del> ${chopAmount}</td>
          }
          {
            !chopAmount &&
            <td>${amount}</td>
          }
        </tr>
      )
    })
  }

  render() {
    const {
      date, hostName, totalCollected, totalCombinedTocCalculated,
      kittyCalculated, prizePotCalculated, payouts
    } = this.props.game.data;

    const gameDate = moment(date).tz('America/Chicago').format('MM/DD')
    const tocPlusKitty = totalCombinedTocCalculated + kittyCalculated;

    return (
      <div>
        <p><span>Date: {gameDate} | Host: {hostName}</span></p>
        <p>
          <span>Money Collected: ${totalCollected} | TOC+QTOC+Kitty: ${tocPlusKitty} | POT: ${prizePotCalculated}</span>
        </p>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            <th>Place</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          {this.renderPayouts(payouts)}
          </tbody>
        </Table>
        <hr/>
      </div>
    );
  }
}

export default Details
