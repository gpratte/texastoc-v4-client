import {server} from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR} from "../league/leagueActions";
import {isTokenExpired} from "../utils/util";

export function getPastSeasons(callback) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/seasons/history', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      callback(result.data);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
