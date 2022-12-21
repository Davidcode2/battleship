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
    this.computerGameboard = Gameboard(10);
    this.player = new (HumanPlayer as any)(this.computerGameboard);
    this.computerPlayer = new (ComputerPlayer as any)(this.playerGameboard);
  }

  startGame() {
    const playerGameboardElement = createGameboard(this.playerGameboard);
    const computerGameboardElement = createGameboard(this.computerGameboard);
    placeGameboard(playerGameboardElement);
    placeGameboard(computerGameboardElement);
    this.placeShips(4, this.playerGameboard);
    this.placeShips(4, this.computerGameboard);
    markPlacedShips(this.playerGameboard, playerGameboardElement);
    markPlacedShips(this.computerGameboard, computerGameboardElement);
  }

  checkGameStatus() {
    if (this.playerGameboard.allShipsSunk()) {
      console.log("you lost");
    }
    if (this.computerGameboard.allShipsSunk()) {
      console.log("you won");
    }
  }

  makeRandomShipForPlacement(gameboard: IGameboard) {
    let length = Math.floor((Math.random() * 100) % gameboard.board.length);
    let x = Math.floor((Math.random() * 100) % gameboard.board.length);
    let y = Math.floor((Math.random() * 100) % gameboard.board.length);
    return [length, x, y];
  }

  placeShipsPlayer(gameboard: IGameboard) {
    gameboard.placeShipVertical(3, 5, 0);
    gameboard.placeShipHorizontal(2, 0, 7);
    gameboard.placeShipVertical(2, 5, 6);
    gameboard.placeShipVertical(3, 3, 6);
  }

  placeShips(numberOfShips: number, gameboard: IGameboard) {
    while (gameboard.ships.length < numberOfShips) {
      let placementInfo = this.makeRandomShipForPlacement(gameboard);
      let coinToss = Math.floor(Math.random() * 100) >= 50;
      if (coinToss) {
        gameboard.placeShipVertical.apply(gameboard, placementInfo);
      } else {
        gameboard.placeShipHorizontal.apply(gameboard, placementInfo);
      }
    }
  }
}
