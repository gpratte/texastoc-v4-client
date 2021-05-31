import {server} from '../utils/api'
import leagueStore from "../league/leagueStore";
import {API_ERROR, REDIRECT, REFRESH} from "../league/leagueActions";
import {
  ADDED_NEW_GAME,
  GOT_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  SEATING_NOTIFIED
} from './gameActions'
import {getCurrentSeason} from "../season/seasonClient";
import {isTokenExpired} from "../utils/util";

export function addNewGame(month, day, year, hostId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;

  if (isTokenExpired(token)) {
    return;
  }


  month = ('' + ++month).padStart(2, '0');
  day = ('' + day).padStart(2, '0');

  let createGameRequest = {};
  createGameRequest.hostId = parseInt('' + hostId);
  createGameRequest.date = year + '-' + month + '-' + day;
  createGameRequest.transportRequired = false;

  server.post('/api/v3/games', createGameRequest, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: ADDED_NEW_GAME, game: result.data})
      leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to start a new game";
      } if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot start a new game while there is a game in progress";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function getCurrentGame(token) {
  if (!token) {
    if (!leagueStore.getState().token) {
      return;
    }
    token = leagueStore.getState().token.token;
  }
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/games', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.current+json'
    },
    data: {}
  })
    .then(result => {
      leagueStore.dispatch({type: GOT_CURRENT_GAME, game: result.data})
      leagueStore.dispatch({type: REFRESH, refresh: false})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      leagueStore.dispatch({type: REFRESH, refresh: false})
      if (error.response && error.response.status && error.response.status === 404) {
        leagueStore.dispatch({type: CURRENT_GAME_NOT_FOUND, flag: true})
      } else {
        leagueStore.dispatch({type: API_ERROR, message: (error.message ? error.message : error.toString())})
      }
    });
}

export function getCurrentGameIfNotFinalized() {
  if (leagueStore.getState().game && leagueStore.getState().game.data && !leagueStore.getState().game.data.finalized) {
    getCurrentGame();
  }
}

export function clearCacheCurrentGame() {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.get('/api/v3/games', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.clear-cache+json'
    },
    data: {}
  })
    .then(result => {
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
    });
}

export function addExistingPlayer(playerId, buyIn, toc, qtoc) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;
  let gamePlayer = {};
  gamePlayer.gameId = parseInt('' + gameId);
  gamePlayer.playerId = parseInt('' + playerId);
  gamePlayer.boughtIn = buyIn;
  gamePlayer.annualTocParticipant = toc;
  gamePlayer.quarterlyTocParticipant = qtoc;

  server.post('/api/v3/games/' + gameId + '/players', gamePlayer, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function addNewPlayer(firstName, lastName, email, buyIn, toc, qtoc) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;
  let firstTimeGamePlayer = {};
  firstTimeGamePlayer.gameId = gameId;
  firstTimeGamePlayer.firstName = firstName ? firstName : null;
  firstTimeGamePlayer.lastName = lastName ? lastName : null;
  firstTimeGamePlayer.email = email ? email : null;
  firstTimeGamePlayer.boughtIn = buyIn;
  firstTimeGamePlayer.annualTocParticipant = toc;
  firstTimeGamePlayer.quarterlyTocParticipant = qtoc;

  server.post('/api/v3/games/' + gameId + '/players', firstTimeGamePlayer, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.first-time+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function updatePlayer(gamePlayerId, buyIn, toc, qtoc, rebuy, place, knockedOut, clockAlert, chop) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;
  const updateGamePlayerRequest = {
    gamePlayerId: parseInt('' + gamePlayerId),
    gameId: gameId,
    boughtIn: buyIn,
    annualTocParticipant: toc,
    quarterlyTocParticipant: qtoc,
    rebought: rebuy,
    place: place,
    knockedOut: knockedOut,
    roundUpdates: clockAlert,
    chop: chop
  };

  server.patch('/api/v3/games/' + gameId + '/players/' + gamePlayerId, updateGamePlayerRequest, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot change the game in any way after it has ended";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function deletePlayer(gamePlayerId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;

  server.delete('/api/v3/games/' + gameId + '/players/' + gamePlayerId, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 409) {
        message = "Cannot change the game in any way after it has ended";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function toggleKnockedOut(gamePlayerId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;

  server.put('/api/v3/games/' + gameId + '/players/' + gamePlayerId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.knockout+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function toggleRebuy(gamePlayerId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;

  server.put('/api/v3/games/' + gameId + '/players/' + gamePlayerId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.rebuy+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function seating(seatsPerTable, tableRequests) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  if (seatsPerTable) {
    for (let i = 0; i < seatsPerTable.length; i++) {
        seatsPerTable[i].tableNum = i+1;
    }
  }

  const gameId = leagueStore.getState().game.data.id;
  let seating = {};
  seating.gameId = parseInt('' + gameId);
  seating.seatsPerTables = seatsPerTable;
  seating.tableRequests = tableRequests;

  server.post('/api/v3/games/' + gameId + '/seats', seating, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.assign-seats+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: SEATING_NOTIFIED, flag: false})
      getCurrentGame(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function notifySeating() {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  const gameId = leagueStore.getState().game.data.id;

  server.post('/api/v3/games/' + gameId + '/seats', {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.notify-seating+json'
    }
  })
    .then(result => {
      leagueStore.dispatch({type: SEATING_NOTIFIED, flag: true})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function finalize(gameId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.put('/api/v3/games/' + gameId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.finalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      const message = error.message ? error.message : error.toString();
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}

export function unfinalize(gameId) {
  if (!leagueStore.getState().token) {
    return;
  }
  const token = leagueStore.getState().token.token;
  if (isTokenExpired(token)) {
    return;
  }

  server.put('/api/v3/games/' + gameId, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.texastoc.unfinalize+json'
    }
  })
    .then(result => {
      getCurrentGame(token);
      getCurrentSeason(token);
      leagueStore.dispatch({type: REDIRECT, to: '/current-game'})
    })
    .catch(function (error) {
      console.log(error.message ? error.message : error.toString());
      let message;
      if (error.response && error.response.status && error.response.status === 403) {
        message = "You are not authorized to edit the game";
      } else {
        message = error.message ? error.message : error.toString();
      }
      leagueStore.dispatch({type: API_ERROR, message: message})
    });
}
