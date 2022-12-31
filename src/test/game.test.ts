import { Gameboard } from '../gameboard';
import { ComputerPlayer, HumanPlayer } from '../player';
import { Game } from '../game';

describe('set up game', () => {
  test('set up game', () => {
    let game = new Game();
    game.setUpGame();
  });
  test('place ships', () => {
    let game = new Game();
    game.setUpGame();
    game.placeShips(5, game.playerGameboard);
    game.placeShips(5, game.computerGameboard);
  });

});
