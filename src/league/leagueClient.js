import {server} from '../utils/api'
import leagueStore from "./leagueStore";
import {API_ERROR,
  GOT_LEAGUE_PLAYERS,
  RESET,
  REFRESH,
  VERSION_CHECK,
  NEW_VERSION} from "./leagueActions";
import {getCurrentSeason} from "../season/seasonClient";
import {getQuarterlySeasons} from "../season/seasonQuartersClient";
import {getSeasonGames} from "../season/seasonGamesClient";
import {GETTING_SEASON} from "../season/seasonActions";
import {clearCacheCurrentGame, getCurrentGame} from "../current-game/gameClient";
import {VERSION} from '../utils/constants'
import {isTokenExpired} from "../utils/util";

export function refreshing(delayMillis) {
  leagueStore.dispatch({type: REFRESH, refresh: true})
  if (delayMillis) {
    setTimeout(function(){ leagueStore.dispatch({type: REFRESH, refresh: false}) }, delayMillis);
  }
}

export function isRefreshing(league) {
  return !!league.refresh;
}

export function refreshLeague(token) {
  if (!token) {
    if (!leagueStore.getState().token) {
      return;
    }
    token = leagueStore.getState().token.token;
  }
  if (isTokenExpired(token)) {
    return;
  }

  leagueStore.dispatch({type: RESET})
  leagueStore.dispatch({type: REFRESH, refresh: true})
  leagueStore.dispatch({type: GETTING_SEASON, flag: true})
  getPlayers(token);
  getCurrentSeason(token);
  getQuarterlySeasons(token);
  getSeasonGames(token);
  clearCacheCurrentGame();
  getCurrentGame(token);
}

export function getPlayers(token) {
  if (!token) {
    if (!leagueStore.getState().token) {
      return;
    }
    token = leagueStore.getState().token.token;
  }
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/players', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_LEAGUE_PLAYERS, players: result.data})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
    });
}

export function updatePlayer(playerId, firstName, lastName, phone, email, password) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const updatePlayerRequest = {
    id: parseInt('' + playerId),
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password
  };

  server.put('/api/v3/players/' + playerId, updatePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getPlayers(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to update the player";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

// 1 hour
const DELAY_VERSION_CHECK_MILLIS = 3600000;

export function checkDeployedVersion() {
  if (leagueStore.getState().newVersion) {
    // Have already flagged that a new version is available
    return;
  }

  let checkVersion = false;
  let versionCheck = leagueStore.getState().versionCheck;
  if (!versionCheck) {
    checkVersion = true;
  } else {
    if ((new Date()) - versionCheck > DELAY_VERSION_CHECK_MILLIS) {
       checkVersion = true;
    }
  }

  if (checkVersion) {
    leagueStore.dispatch({type: VERSION_CHECK})

    server.get('/api/v3/settings')
      .then(result => {
        const externalVersion = '' + result.data.version.version;
        if (VERSION !== externalVersion) {
          console.log('UI version ' + VERSION + ' is not equal to ' + externalVersion);
          leagueStore.dispatch({type: NEW_VERSION})
        }
      })
      .catch(function (error) {
        console.log(error.message ? error.message : error.toString());
        // do nothing
      });
  }
}

export function isNewVersion() {
  if (leagueStore.getState().newVersion) {
    // Have already flagged that a new version is available
    return true;
  }
  return false;
}

export function getRounds(callback) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/clock/rounds', {
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

export function getPoints(callback) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/settings', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      callback(result.data.points);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function deletePlayer(playerId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.delete('/api/v3/players/' + playerId, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(result => {
      getPlayers(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to delete the player";
      } else if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot delete a player that has played in a game";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
