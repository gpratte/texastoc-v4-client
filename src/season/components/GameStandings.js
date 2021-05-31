import React from 'react'
import Table from 'react-bootstrap/Table';

class GameStandings extends React.Component {

  isThereChop(players) {
    if (!players) return false;

    for (let i = 0; i < players.length; i++) {
      if (players[i].chop) {
        return true;
      }
    }
    return false;
  }

  renderStandings(players, isChop) {
    if (players) {
      return players.map((player, index) => {
        const {
          id, name, boughtIn, rebought, annualTocParticipant,
          quarterlyTocParticipant, chop, tocPoints, tocChopPoints,
          qtocPoints, qtocChopPoints, place
        } = player;
        let originalPoints;
        let points;
        if (tocChopPoints) {
          points = tocChopPoints;
          originalPoints = tocPoints;
        } else if (qtocChopPoints) {
          points = qtocChopPoints;
          originalPoints = qtocPoints;
        } else if (tocPoints) {
          points = tocPoints;
        } else if (qtocPoints) {
          points = qtocPoints;
        }
        return (
          <tr key={id}>
            <td>{place}</td>
            <td>{name}</td>
            <td>{boughtIn ? String.fromCharCode(10004) : ''}</td>
            <td>{rebought ? String.fromCharCode(10004) : ''}</td>
            <td>{annualTocParticipant ? String.fromCharCode(10004) : ''}</td>
            <td>{quarterlyTocParticipant ? String.fromCharCode(10004) : ''}</td>
            {
              isChop && <td>{chop ? chop : ''}</td>
            }
            {
              originalPoints && <td><del>{originalPoints}</del> {points}</td>
            }
            {
              !originalPoints && <td>{points ? points : ''}</td>
            }
          </tr>
        )
      })
    }
  }

  render() {
    const {players} = this.props.value;
    const isChop = this.isThereChop(players);

    return (
      <Table striped bordered size="sm">
        <thead>
        <tr>
          <th><i className="fas fa-clipboard-list"/></th>
          <th>Name</th>
          <th>B<br/>u<br/>y<br/>I<br/>n</th>
          <th>R<br/>e<br/>B<br/>u<br/>y</th>
          <th>T<br/>O<br/>C</th>
          <th>Q<br/>T<br/>O<br/>C</th>
          {
            isChop && <th>Chp</th>
          }
          <th>Pts</th>
        </tr>
        </thead>
        <tbody>
        {this.renderStandings(players, isChop)}
        </tbody>
      </Table>
    );
  }
}

export default GameStandings
