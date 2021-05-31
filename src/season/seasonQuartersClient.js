import {server} from '../utils/api'
import {isTokenExpired} from '../utils/util'
import leagueStore from "../league/leagueStore";
import {REFRESH} from "../league/leagueActions";
import {GOT_QUARTERLY_SEASONS} from './seasonQuartersActions'


export function getQuarterlySeasons(token) {
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

  server.get('/api/v3/seasons/' + seasonId + '/quarterlies', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_QUARTERLY_SEASONS, quarterlySeasons: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
    });
}
