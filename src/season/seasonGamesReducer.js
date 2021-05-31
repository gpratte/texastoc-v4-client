
import {GOT_SEASON_GAMES} from './seasonGamesActions'

// Take the games as the parameter
function seasonGamesReducer(games, action) {
  switch (action.type) {
    case GOT_SEASON_GAMES:
      return Object.assign({}, games, {data: action.games});
    default:
      return games;
  }
}

export default seasonGamesReducer
