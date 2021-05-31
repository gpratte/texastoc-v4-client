import {server} from '../utils/api'
import {isTokenExpired} from '../utils/util'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT, REFRESH} from "../league/leagueActions";
import {ADDED_NEW_SEASON, GOT_SEASON, SEASON_NOT_FOUND} from './seasonActions'
import {getCurrentGame} from "../current-game/gameClient";
import {getQuarterlySeasons} from "./seasonQuartersClient";
import {getSeasonGames} from "./seasonGamesClient"

export function addNewSeason(year) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const seasonStart = {};
  seasonStart['startYear'] = year;

  server.post('/api/v3/seasons', seasonStart, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: ADDED_NEW_SEASON, season: result.data});
      leagueStore.dispatch({type: REDIRECT, to: '/season'})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to create a season";
      } else {
        message = 'There was a problem creating the new season. Make sure all games are closed and the season is closed.';
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function getCurrentSeason(token) {
  if (!token) {
    if (!leagueStore.getState().token) {
      return;
    }
    token = leagueStore.getState().token.token;
  }
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/seasons/current', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_SEASON, season: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      leagueStore.dispatch({type: REFRESH, refresh: false})
      if (error.response && error.response.status && error.response.status === 404) {
        leagueStore.dispatch({type: SEASON_NOT_FOUND, flag: true})
      } else {
        leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
      }
    });
}

export function finalize(seasonId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.put('/api/v3/seasons/' + seasonId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.finalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
      getQuarterlySeasons(token);
      getSeasonGames(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      leagueStore.dispatch({type: API_ERROR, message: "Cannot end the season, try again later"})
    });
}


export function unfinalize(seasonId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.put('/api/v3/seasons/' + seasonId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.unfinalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
      getQuarterlySeasons(token);
      getSeasonGames(token);
      leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "You cannot unlock a game when another game is unlocked";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function goToGame(gameId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  getCurrentGame(token);
  leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
}
