import { IGameboard, Gameboard } from './gameboard';
import { ComputerPlayer, HumanPlayer } from './player';
import { drawGameboard } from './guiDrawer';

export class Game {
  playerGameboard: IGameboard;
  computerGameboard: IGameboard;
  player: typeof HumanPlayer;
  computerPlayer: typeof ComputerPlayer;

  setUpGame() {
    this.playerGameboard = Gameboard();
    this.computerGameboard = Gameboard();
    this.player = new (HumanPlayer as any)(this.computerGameboard);
    this.computerPlayer = new (ComputerPlayer as any)(this.playerGameboard);
  }

  startGame() {
    const playerGameboard = document.querySelector('.player_gameboard');
    drawGameboard(this.playerGameboard, playerGameboard);
  }

  placeShips(gameboard: IGameboard) {
    gameboard.placeShip(3, 1, 1);
    gameboard.placeShip(2, 0, 2);
    gameboard.placeShip(2, 2, 3);
  }
}
