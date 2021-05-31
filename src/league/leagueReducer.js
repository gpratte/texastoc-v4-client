import currentGameReducer from '../current-game/currentGameReducer'
import seasonReducer from '../season/seasonReducer'
import seasonQuartersReducer from '../season/seasonQuartersReducer'
import loginReducer from '../login/loginReducer'
import {seed} from "../league/leagueStore";
import {API_ERROR,
  GOT_LEAGUE_PLAYERS,
  EDIT_LEAGUE_PLAYER,
  REDIRECT,
  RESET,
  REFRESH,
  VERSION_CHECK,
  WAITING,
  NEW_VERSION} from "./leagueActions";
import seasonGamesReducer from "../season/seasonGamesReducer";

function leagueReducer(league, action) {
  switch (action.type) {
    case API_ERROR:
      return Object.assign({}, league, {apiError: action.message});
    case GOT_LEAGUE_PLAYERS:
      return Object.assign({}, league, {players: action.players});
    case EDIT_LEAGUE_PLAYER:
      return Object.assign({}, league, {editLeaguePlayerId: action.id});
    case REDIRECT:
      return Object.assign({}, league, {redirectTo: action.to});
    case RESET:
      return Object.assign({}, seed, {token: league.token});
    case REFRESH:
      return Object.assign({}, league, {refresh: action.refresh});
    case NEW_VERSION:
      return Object.assign({}, league, {newVersion: true});
    case VERSION_CHECK:
      return Object.assign({}, league, {versionCheck: new Date()});
    case WAITING:
      return Object.assign({}, league, {waiting: action.flag});
    default:
      return Object.assign({}, league,
        {apiError: null},
        {token: loginReducer(league.token, action)},
        {game: currentGameReducer(league.game, action)},
        {season: seasonReducer(league.season, action)},
        {quarterlySeasons: seasonQuartersReducer(league.quarterlySeasons, action)},
        {games: seasonGamesReducer(league.games, action)});
  }
}

export default leagueReducer
