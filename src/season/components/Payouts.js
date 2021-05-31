import React from 'react'
import Table from 'react-bootstrap/Table';

class Payouts extends React.Component {

  renderPayouts(payouts) {
    if (payouts) {
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
  }

  render() {
    const payouts = this.props.value;

    return (
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
    );
  }
}

export default Payouts
