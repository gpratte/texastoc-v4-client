import {seed} from '../league/leagueStore';
import {
  LOGGED_IN, LOGGED_OUT
} from './loginActions'

// Take the league as the parameter
function loginReducer(league, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, league, {token: action.token});
    case LOGGED_OUT:
      return seed;
    default:
  }

  return league;
}

export default loginReducer
