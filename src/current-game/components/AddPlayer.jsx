import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {TOGGLE_ADD_PLAYER_TO_GAME} from '../gameActions'
import {addExistingPlayer, addNewPlayer} from "../gameClient";
import _ from 'lodash';

class AddPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'league-player'
    };
  }


  renderPlayers(players, seasonPlayers, gamePlayers) {
    // Remove players already in game
    const playersFiltered = _.filter(players,
      (p) => {
        let index = _.findIndex(gamePlayers, function(gp) {
          return gp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    let seasonPlayersFiltered;
    if (seasonPlayers) {
      // Remove season players already in game
      seasonPlayersFiltered = _.filter(seasonPlayers,
        (sp) => {
          let index = _.findIndex(gamePlayers, function(gp) {
            return gp.playerId === sp.playerId;
          });
          // return true if not found (i.e. the player is not
          // filtered out of the players to choose from
          return index === -1;
        }
      );
    } else {
      seasonPlayersFiltered = [];
    }

    // Remove players in that are in the season
    const playersFiltered2 = _.filter(playersFiltered,
      (p) => {
        let index = _.findIndex(seasonPlayersFiltered, function(sp) {
          return sp.playerId === p.id;
        });
        // return true if not found (i.e. the player is not
        // filtered out of the players to choose from
        return index === -1;
      }
    );

    // Separator
    if (seasonPlayersFiltered && seasonPlayersFiltered.length > 0) {
      seasonPlayersFiltered.push({id: 0, name: '----------------------'})
    }

    // Combine season players followed by players
    seasonPlayersFiltered.push(...playersFiltered2);

    return seasonPlayersFiltered.map((player, index) => {
      const {
        id, playerId, firstName, lastName, name
      } = player;

      let text;
      if (!name) {
        text = firstName ? firstName : '';
        text += (firstName && lastName) ? ' ' : '';
        text += lastName ? lastName : '';
      } else {
        text = name;
      }

      let ident = playerId ? playerId : id;

      return (
        <option key={ident} value={ident}>{text}</option>
      )
    })
  }

  addPlayer = (e) => {
    e.preventDefault();
    if (this.state.tab === 'league-player') {
      if (e.target.elements.playerId.value === '0') {
        alert("Select a player");
        return;
      }
      leagueStore.dispatch({type: TOGGLE_ADD_PLAYER_TO_GAME, show: false})
      addExistingPlayer(e.target.elements.playerId.value,
        e.target.elements.buyInId.checked,
        e.target.elements.tocId.checked,
        e.target.elements.qtocId.checked);
    } else {
      if (!e.target.elements.firstNameId.value && !e.target.elements.lastNameId.value) {
        alert("Enter a name");
        return;
      }
      leagueStore.dispatch({type: TOGGLE_ADD_PLAYER_TO_GAME, show: false})
      addNewPlayer(e.target.elements.firstNameId.value,
        e.target.elements.lastNameId.value,
        e.target.elements.emailId.value,
        e.target.elements.buyInId.checked,
        e.target.elements.tocId.checked,
        e.target.elements.qtocId.checked);
    }
  }

  render() {
    const game = this.props.game;
    const players = this.props.players;
    const gamePlayers = game.data.players;
    const seasonPlayers = this.props.seasonPlayers;

    // Sort season players by name
    seasonPlayers.sort((sp1, sp2) => sp1.name.localeCompare(sp2.name));

    return (
      <div>
        <Modal show={game.showAddPlayer}
               backdrop={'static'}
               onHide={() => leagueStore.dispatch({type: TOGGLE_ADD_PLAYER_TO_GAME, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.addPlayer}>
              <Tabs className="style1"
                    defaultActiveKey="league-player"
                    onSelect = {key => this.setState({tab: key}) }
                    id="uncontrolled-tab-example">
                <Tab className="style2" eventKey="league-player" title="League Player&nbsp;&nbsp;&nbsp;&nbsp;">
                  <Form.Group>
                    <Form.Control as="select" id="playerId">
                      {this.renderPlayers(players, seasonPlayers, gamePlayers)}
                    </Form.Control>
                  </Form.Group>
                </Tab>
                <Tab className="style2" eventKey="new-player" title="&nbsp;&nbsp;&nbsp;&nbsp;New Player">
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="First" id={'firstNameId'}/>
                    <Form.Control type="text" placeholder="Last" id={'lastNameId'}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id={'emailId'}/>
                    <Form.Text className="text-muted">
                      Needed to login
                    </Form.Text>
                  </Form.Group>
                </Tab>
              </Tabs>

              <Form.Check inline
                          type={'checkbox'}
                          id={'buyInId'}
                          label={'Buy-In'}
              />
              <Form.Check inline
                          type={'checkbox'}
                          id={'tocId'}
                          label={'Annual TOC'}
              />
              <Form.Check inline
                          type={'checkbox'}
                          id={'qtocId'}
                          label={'Quarterly TOC'}
              />
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: TOGGLE_ADD_PLAYER_TO_GAME, show: false})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Player
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddPlayer
