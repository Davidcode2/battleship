import { IGameboard, Gameboard } from './gameboard';
import { ComputerPlayer, HumanPlayer } from './player';
import {
  createGameboard,
  togglePlacedShips,
  placeGameboard,
  colorShip,
} from './guiDrawer';

interface GameboardWithGui {
  gameboard: IGameboard;
  gameboardGui: Element;
}

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
    const playerGameboard = this.createGameboard(this.playerGameboard);
    const computerGameboard = this.createGameboard(this.computerGameboard);
    this.placeShips(4, this.playerGameboard);
    this.placeShips(4, this.computerGameboard);
    togglePlacedShips(playerGameboard);
    togglePlacedShips(computerGameboard);
  }

  checkGameStatus() {
    if (this.playerGameboard.allShipsSunk()) {
      console.log('you lost');
    }
    if (this.computerGameboard.allShipsSunk()) {
      console.log('you won');
    }
  }

  makeRandomShipForPlacement(gameboard: IGameboard) {
    let length = Math.floor((Math.random() * 100) % gameboard.board.length);
    let x = Math.floor((Math.random() * 100) % gameboard.board.length);
    let y = Math.floor((Math.random() * 100) % gameboard.board.length);
    return [length, x, y];
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

  addEventListenerToFields(gameboard: GameboardWithGui) {
    const children = gameboard.gameboardGui.children;
    for (let i = 0; i < gameboard.gameboardGui.children.length; i++) {
      let child: HTMLElement = children[i] as HTMLElement;
      child.addEventListener('click', () => {
        const result = gameboard.gameboard.receiveAttack(
          child.dataset.x,
          child.dataset.y
        );
        if (result === 'sunk') {
          const shipId =
            gameboard.gameboard.board[Number(child.dataset.x)][
              Number(child.dataset.y)
            ]['id'];
          this.colorEntireShip(shipId, gameboard);
        } else if (result === 'hit') {
          child.classList.add('hit');
        } else {
          child.classList.add('miss');
        }
        this.checkGameStatus();
      });
    }
  }

  colorEntireShip(shipId: string, gameboard: GameboardWithGui) {
    const res: { x: number; y: number }[] = [];
    for (let i = 0; i < gameboard.gameboard.board.length; i++) {
      for (let j = 0; j < gameboard.gameboard.board.length; j++) {
        let field = gameboard.gameboard.board[i][j];
        if (field) {
          let id = gameboard.gameboard.board[i][j]['id'];
          if (id === shipId) {
            res.push({ x: i, y: j });
          }
        }
      }
    }
    colorShip(gameboard.gameboardGui, res);
  }

  createGameboard(gameboard: IGameboard) {
    const gameboardElement = createGameboard(gameboard);
    let completeGameboard: GameboardWithGui = Object.create({
      gameboard: gameboard,
      gameboardGui: gameboardElement,
    });
    this.addEventListenerToFields(completeGameboard);
    placeGameboard(gameboardElement);
    return completeGameboard;
  }
}
