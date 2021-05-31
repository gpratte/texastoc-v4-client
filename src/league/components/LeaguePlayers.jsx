import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import leagueStore from "../leagueStore";
import {EDIT_LEAGUE_PLAYER} from "../leagueActions";
import {obfuscatePhone, obfuscateEmail, shouldRedirect, redirect} from '../../utils/util'
import EditLeaguePlayer from "./EditLeaguePlayer";
import {getPlayers} from '../leagueClient';

class LeaguePlayers extends React.Component {

  componentDidMount() {
    getPlayers();
  }

  renderLeaguePlayers(leaguePlayers) {
    if (!leaguePlayers) {
      return;
    }
    return leaguePlayers.map((leaguePlayer, index) => {
      const {id, firstName, lastName, phone, email} = leaguePlayer;
      let fullName = firstName ? firstName : '';
      fullName += firstName && lastName ? ' ' : '';
      fullName += lastName ? lastName : '';

      let obfuscatedPhone = obfuscatePhone(phone);
      let obfuscatedEmail = obfuscateEmail(email);

      return (
        <tr key={id}>
          <td>
            <Button variant="link" onClick={() => {
              leagueStore.dispatch({type: EDIT_LEAGUE_PLAYER, id: id});
            }}>
              {fullName}
            </Button>
          </td>
          <td>{obfuscatedPhone}</td>
          <td>{obfuscatedEmail}</td>
        </tr>
      )
    })
  }

  render() {
    const league = this.props.league;

    let redirectTo;
    if ((redirectTo = shouldRedirect(league))) {
      return redirect(redirectTo);
    }

    const leaguePlayers = league.players;

    return (
      <div>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
          {this.renderLeaguePlayers(leaguePlayers)}
          </tbody>
        </Table>
        <EditLeaguePlayer league={league}/>
      </div>
    );
  }
}

export default LeaguePlayers
