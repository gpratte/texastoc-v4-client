import {
  TOGGLE_ADD_PLAYER_TO_GAME,
  TOGGLE_CONFIGURE_SEATING,
  EDIT_GAME_PLAYER,
  GETTING_CURRENT_GAME,
  CURRENT_GAME_NOT_FOUND,
  ADDED_NEW_GAME,
  GOT_CURRENT_GAME,
  SEATING_NOTIFIED
} from './gameActions'

// Take the game as the parameter
function currentGameReducer(game, action) {

  switch (action.type) {
    case TOGGLE_ADD_PLAYER_TO_GAME:
      return Object.assign({}, game, {showAddPlayer: action.show});
    case TOGGLE_CONFIGURE_SEATING:
      return Object.assign({}, game,
        {showConfigureSeating: action.show},
        {showConfigureSeatingKey: new Date().getTime()});
    case EDIT_GAME_PLAYER:
      return Object.assign({}, game, {editGamePlayerId: action.id});
    case ADDED_NEW_GAME:
      return Object.assign({}, game, {data: action.game}, {gettingCurrentGame: false}, {currentGameNotFound: false});
    case GOT_CURRENT_GAME:
      return Object.assign({}, game, {data: action.game}, {gettingCurrentGame: false}, {currentGameNotFound: false});
    case GETTING_CURRENT_GAME:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: true}, {currentGameNotFound: false});
    case CURRENT_GAME_NOT_FOUND:
      return Object.assign({}, game, {data: null}, {gettingCurrentGame: false}, {currentGameNotFound: true});
    case SEATING_NOTIFIED:
      return Object.assign({}, game,  {seatingNotified: action.flag});
    default:
      return game;
  }
}

export default currentGameReducer
