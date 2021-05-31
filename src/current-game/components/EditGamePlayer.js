import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  EDIT_GAME_PLAYER
} from '../gameActions'
import {updatePlayer, deletePlayer} from "../gameClient";
import _ from "lodash";

const tenPlaces = [10,9,8,7,6,5,4,3,2,1]

class EditGamePlayer extends React.Component {

  renderPlaces(gamePlayer, gamePlayers) {
    if (!gamePlayer || !gamePlayers) {
      return null;
    }
    // Build an array of the places taken
    const taken = [];
    for (let i = 0; i < gamePlayers.length; i++) {
      if (gamePlayer.id === gamePlayers[i].id) {
        continue;
      }
      if (gamePlayers[i].place && gamePlayers[i].place < 11) {
        taken.push(gamePlayers[i].place);
      }
    }

    // Build an array of 10 places
    let placesLeft = [...tenPlaces];

    // Remove places taken
    for (let i = 0; i < taken.length; i++) {
      placesLeft = placesLeft.filter(plc => plc !== taken[i])
    }

    return placesLeft.map((place) => {
      return (
        <option key={place} value={place}>{place}</option>
      )
    })
  }

  updateGamePlayer = (e) => {
    e.preventDefault();
    leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: null});
    updatePlayer(e.target.elements.gamePlayerId.value,
      e.target.elements.buyInId.checked,
      e.target.elements.tocId.checked,
      e.target.elements.qtocId.checked,
      e.target.elements.rebuyId.checked,
      e.target.elements.placeId.value,
      e.target.elements.knockedOutId.checked,
      e.target.elements.clockAlertId.checked,
      e.target.elements.chopId.value);
  }

  render() {
    const game = this.props.game;
    const gamePlayers = game.data.players;
    let gamePlayer = _.find(gamePlayers, {'id': game.editGamePlayerId});

    return (
      <div>
        <Modal show={game.editGamePlayerId !== null}
               backdrop={'static'}
               onHide={() => leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: null})}>
          <Modal.Body>
            <p className="text-center">
              {gamePlayer ? gamePlayer.firstName : ''}
              {gamePlayer ? ((gamePlayer.firstName && gamePlayer.lastName) ? ' ' : '') : ''}
              {gamePlayer ? gamePlayer.lastName : ''}
            </p>
            <Form onSubmit={this.updateGamePlayer}>
              <Form.Control type={'hidden'} id={'gamePlayerId'} value={gamePlayer ? gamePlayer.id : 0}/>
              <Form.Group>
                <Form.Check inline
                            type={'checkbox'}
                            id={'buyInId'}
                            label={'Buy-In'}
                            defaultChecked={gamePlayer ? (gamePlayer.boughtIn ? true : false) : false}
                />
                <Form.Check inline
                            type={'checkbox'}
                            id={'rebuyId'}
                            label={'Rebuy'}
                            defaultChecked={gamePlayer ? (gamePlayer.rebought ? true : false) : false}
                />
                <Form.Check inline
                            type={'checkbox'}
                            id={'tocId'}
                            label={'Annual TOC'}
                            defaultChecked={gamePlayer ? (gamePlayer.annualTocParticipant ? true : false) : false}
                />
                <Form.Check inline
                            type={'checkbox'}
                            id={'qtocId'}
                            label={'Quarterly TOC'}
                            defaultChecked={gamePlayer ? (gamePlayer.quarterlyTocParticipant ? true : false) : false}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check inline
                            type={'checkbox'}
                            id={'knockedOutId'}
                            label={'Knocked-Out'}
                            defaultChecked={gamePlayer ? (gamePlayer.knockedOut ? true : false) : false}
                />
                <Form.Check inline
                            type={'checkbox'}
                            id={'clockAlertId'}
                            label={'Clock Alert'}
                            defaultChecked={gamePlayer ? (gamePlayer.roundUpdates ? true : false) : false}
                />
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>&nbsp;&nbsp;Place</Form.Label>
                <Col>
                  <Form.Control as="select" defaultValue={gamePlayer ? (gamePlayer.place ? gamePlayer.place : 11) : 11} id="placeId">
                    <option key={11} value={11}> </option>
                    {this.renderPlaces(gamePlayer, gamePlayers)}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>&nbsp;&nbsp;Chop</Form.Label>
                <Col>
                  <Form.Control as="input" defaultValue={gamePlayer ? gamePlayer.chop : ''} id="chopId"/>
                </Col>
              </Form.Group>
              <Modal.Footer>
                <Button variant="danger" className='mr-auto' onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  const doit = confirm('are you sure?');
                  if (doit) {
                    leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: null});
                    deletePlayer(gamePlayer ? gamePlayer.id : 0);
                  }
                }}>
                  Delete
                </Button>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: EDIT_GAME_PLAYER, id: null})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Update Player
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditGamePlayer
