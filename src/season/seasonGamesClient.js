import {server} from '../utils/api'
import {isTokenExpired} from '../utils/util'
import leagueStore from "../league/leagueStore";
import {REFRESH} from "../league/leagueActions";
import {GOT_SEASON_GAMES} from './seasonGamesActions'


export function getSeasonGames(token) {
  if (!token) {
    if (!leagueStore.getState().token) {
      return;
    }
    token = leagueStore.getState().token.token;
  }
  if (isTokenExpired(token)) {
    return;
  }

  // Need the season id
  let seasonId;
  if (leagueStore.getState().season && leagueStore.getState().season.data && leagueStore.getState().season.data.id) {
    seasonId = leagueStore.getState().season.data.id;
  } else {
    return;
  }

  server.get('/api/v3/games?seasonId=' + seasonId, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_SEASON_GAMES, games: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
    });
}
