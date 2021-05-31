import React from 'react'
import Table from 'react-bootstrap/Table';

class Payouts extends React.Component {

  renderPayouts(payouts) {
    if (payouts) {
      return payouts.map((payout, index) => {
        const {id, guaranteed, cash, place, amount} = payout
        return (
          <tr key={id}>
            <td>{place}</td>
            <td>${amount}</td>
            {
              guaranteed && <td>{String.fromCharCode(10004)}</td>
            }
            {
              !guaranteed && <td></td>
            }
            {
              cash && <td>{String.fromCharCode(10004)}</td>
            }
            {
              !cash && <td></td>
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
          <th>Guaranteed</th>
          <th>Cash</th>
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
