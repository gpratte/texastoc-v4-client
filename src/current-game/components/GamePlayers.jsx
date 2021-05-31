import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {
  TOGGLE_ADD_PLAYER_TO_GAME,
  EDIT_GAME_PLAYER
} from '../gameActions'
import AddPlayer from "./AddPlayer";
import EditGamePlayer from "./EditGamePlayer";
import {toggleKnockedOut, toggleRebuy} from "../gameClient";
import {gameOver} from "../gameUtils";

class GamePlayers extends React.Component {

  isThereChop(gamePlayers) {
    if (!gamePlayers) return false;

    for (let i = 0; i < gamePlayers.length; i++) {
      if (gamePlayers[i].chop) {
        return true;
      }
    }
    return false;
  }

  toggleKnockedOut(id) {
    toggleKnockedOut(id);
  }

  toggleRebuy(id) {
    toggleRebuy(id);
  }

  renderAddPlayerButtons(isGameOver) {
    if (isGameOver) {
      return null;
    }
    return (
      <div>
        <Button variant="primary"
                onClick={() => leagueStore.dispatch({type: TOGGLE_ADD_PLAYER_TO_GAME, show: true})}>
          Add Player
        </Button>
      </div>
    )
  }

  renderGamePlayers(gamePlayers, isChop, isGameOver, canRebuy) {
    if (!gamePlayers) {
      return;
    }
    return gamePlayers.map((gamePlayer, index) => {
      const {
        id, name, boughtIn, rebought, annualTocParticipant,
        quarterlyTocParticipant, chop, tocPoints, tocChopPoints,
        qtocPoints, qtocChopPoints, place, knockedOut, roundUpdates
      } = gamePlayer;
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
          {
            !isGameOver && <td className={'knockedout-toggle'}><Button variant="link" className={'knockedout-toggle'} onClick={() => {this.toggleKnockedOut(id);}}>
              {knockedOut ? <i className="fas fa-user-slash knocked-out"/> : <i className="fas fa-user"/>}
            </Button></td>
          }
          <td>{place ? (place < 11 ? place : '') : ''}</td>
          <td>
            <Button variant="link" onClick={() => {
              leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: id});
            }}>
              {roundUpdates ? <i className="far fa-bell"/> : ''}
              {roundUpdates ? ' ' : ''}
              {name ? name : 'unknown'}
            </Button>
          </td>
          <td>{boughtIn ? String.fromCharCode(10004) : ''}</td>
          <td>
            {
              (isGameOver || !canRebuy) &&
              rebought ? String.fromCharCode(10004) : ''
            }
            {
              (!isGameOver && canRebuy) &&
              <Button variant="link" onClick={() => {this.toggleRebuy(id);}}>
                {rebought ? String.fromCharCode(10004) : String.fromCharCode(248)}
              </Button>
            }
          </td>
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

  render() {
    const game = this.props.game;
    if (!game || !game.data) {
      return null;
    }

    const gamePlayers = game.data.players;
    const players = this.props.players;
    const seasonPlayers = this.props.seasonPlayers;
    const isGameOver = gameOver(gamePlayers);
    const isChop = this.isThereChop(gamePlayers);
    const numPaidPlayers = game.data.numPaidPlayers;
    const canRebuy = game.data.canRebuy;

    return (
      <div>
        <p>Paid Players: {numPaidPlayers}</p>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            {
              !isGameOver && <th></th>
            }
            <th><i className="fas fa-clipboard-list"/></th>
            <th>Name</th>
            <th>B<br/>u<br/>y<br/>I<br/>n</th>
            <th>R<br/>e<br/>B<br/>u<br/>y</th>
            <th>T<br/>O<br/>C</th>
            <th>Q<br/>T<br/>O<br/>C</th>
            {
              isChop && <th>Chop</th>
            }
            <th>Pts</th>

          </tr>
          </thead>
          <tbody>
          {this.renderGamePlayers(gamePlayers, isChop, isGameOver, canRebuy)}
          </tbody>
        </Table>

        <AddPlayer game={game} players={players} seasonPlayers={seasonPlayers}/>
        <EditGamePlayer game={game}/>

        {this.renderAddPlayerButtons(isGameOver)}
      </div>
    );
  }
}

export default GamePlayers
