import React from 'react'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {EDIT_LEAGUE_PLAYER} from '../leagueActions'
import _ from "lodash";
import {obfuscateEmail, obfuscatePhone} from "../../utils/util";
import {updatePlayer, deletePlayer} from '../leagueClient'

class EditLeaguePlayer extends React.Component {

  updateThePlayer = (e) => {
    e.preventDefault();

    const playerId = parseInt('' + e.target.elements.playerId.value);
    const leaguePlayer = _.find(leagueStore.getState().players, {'id': playerId});

    // If there is an asterisk in the field use the original
    let phoneValue = e.target.elements.phoneId.value;
    phoneValue = phoneValue.includes('*') ? leaguePlayer.phone : phoneValue;

    // If there is an asterisk in the field use the original
    let emailValue = e.target.elements.emailId.value;
    emailValue = emailValue.includes('*') ? leaguePlayer.email : emailValue;

    // If there is an asterisk in the field use the original
    let passwordValue = e.target.elements.passwordId.value;
    passwordValue = passwordValue.includes('*') ? null : passwordValue;

    leagueStore.dispatch({type: EDIT_LEAGUE_PLAYER, id: null});
    updatePlayer(e.target.elements.playerId.value,
      e.target.elements.firstNameId.value,
      e.target.elements.lastNameId.value,
      phoneValue,
      emailValue,
      passwordValue);
  }

  render() {
    const league = this.props.league;
    const leaguePlayer = _.find(league.players, {'id': league.editLeaguePlayerId});

    if (!leaguePlayer) {
      return null;
    }

    let obfuscatedPhone = obfuscatePhone(leaguePlayer.phone);
    let obfuscatedEmail = obfuscateEmail(leaguePlayer.email);

    return (
      <div>
        <Modal show={league.editLeaguePlayerId !== null}
               backdrop={'static'}
               onHide={() => leagueStore.dispatch({type: EDIT_LEAGUE_PLAYER, id: null})}>
          <Modal.Body>
            <p className="text-center">
              {leaguePlayer ? leaguePlayer.firstName : ''}
              {leaguePlayer ? ((leaguePlayer.firstName && leaguePlayer.lastName) ? ' ' : '') : ''}
              {leaguePlayer ? leaguePlayer.lastName : ''}
            </p>
            <Form onSubmit={this.updateThePlayer}>
              <Form.Control type={'hidden'} id={'playerId'} value={leaguePlayer ? leaguePlayer.id : 0}/>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                              defaultValue={leaguePlayer.firstName}
                              placeholder="First" id={'firstNameId'}/>
                <Form.Control type="text"
                              defaultValue={leaguePlayer.lastName}
                              placeholder="Last" id={'lastNameId'}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                              defaultValue={obfuscatedEmail}
                              placeholder="Enter email" id={'emailId'}/>
                <Form.Text className="text-muted">
                  Needed to login (admin requires admin privilege to change)
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text"
                              defaultValue={obfuscatedPhone}
                              placeholder="Enter phone" id={'phoneId'}/>
                <Form.Text className="text-muted">
                  Needed for text messages
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              defaultValue={'**********'}
                              placeholder="Enter password" id={'passwordId'}/>
              </Form.Group>
              <Modal.Footer>
                <Button variant="danger" className='mr-auto' onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  const doit = confirm('are you sure?');
                  if (doit) {
                    leagueStore.dispatch({type: EDIT_LEAGUE_PLAYER, id: null})
                    deletePlayer(leaguePlayer.id);
                  }
                }}>
                  Delete
                </Button>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: EDIT_LEAGUE_PLAYER, id: null})
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

export default EditLeaguePlayer
