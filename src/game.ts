import { IGameboard, Gameboard } from './gameboard';
import { ComputerPlayer, HumanPlayer } from './player';
import { createGameboard, markPlacedShips, placeGameboard } from './guiDrawer';

export class Game {
  playerGameboard: IGameboard;
  computerGameboard: IGameboard;
  player: typeof HumanPlayer;
  computerPlayer: typeof ComputerPlayer;

  setUpGame() {
    this.playerGameboard = Gameboard(10);
    this.computerGameboard = Gameboard();
    this.player = new (HumanPlayer as any)(this.computerGameboard);
    this.computerPlayer = new (ComputerPlayer as any)(this.playerGameboard);
  }

  startGame() {
    const playerGameboardElement = createGameboard(this.playerGameboard);
    placeGameboard(playerGameboardElement);
    this.placeShips(this.playerGameboard);
    markPlacedShips(this.playerGameboard, playerGameboardElement);
  }

  placeShips(gameboard: IGameboard) {
    gameboard.placeShip(3, 5, 0);
    gameboard.placeShip(2, 0, 7);
    gameboard.placeShip(2, 5, 6);
    gameboard.placeShip(3, 8, 3);
    gameboard.placeShip(3, 3, 6);
  }
}
