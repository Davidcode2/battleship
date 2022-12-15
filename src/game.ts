import { IGameboard, Gameboard } from './gameboard';
import { ComputerPlayer, HumanPlayer } from './player';
import { createGameboard, placeGameboard } from './guiDrawer';

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
    const playerGameboard = createGameboard(this.playerGameboard);
    placeGameboard(playerGameboard);
    
  }

  placeShips(gameboard: IGameboard) {
    gameboard.placeShip(3, 1, 1);
    gameboard.placeShip(2, 0, 2);
    gameboard.placeShip(2, 2, 3);
  }
}
