import _ from 'lodash';

export function gameOver(gamePlayers) {

  if (!gamePlayers || gamePlayers.length === 0) {
    return false;
  }

  const numPlaces = gamePlayers.length > 10 ? 10 : gamePlayers.length;

  let places = 0

  _.forEach(gamePlayers, function(gamePlayer) {
    if (gamePlayer.place && gamePlayer.place <= 10) {
      ++places;
    }
  });

  return places === numPlaces;
}

export function generateEmptySeating() {

  return {
    "seatsPerTables" : [
      {
        "numSeats":10,
        "tableNum":1
      }
    ],
    "tableRequests": [],
    "gameTables": null
  }
}
