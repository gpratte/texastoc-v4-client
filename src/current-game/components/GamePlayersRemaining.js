import React from 'react'
import './GamePlayers.css'

class GamePlayersRemaining extends React.Component {

  render() {
    const {paidPlayers, paidPlayersRemaining, averageStack} = this.props.game.data;

    return (
      <div>
        <span>Players: {paidPlayersRemaining}/{paidPlayers} | Avg Stack: {averageStack}</span>
      </div>
    );
  }
}

export default GamePlayersRemaining
