import { IGameboard } from './gameboard';

interface GameboardWithGui {
  gameboard: IGameboard;
  gameboardGui: GraphicalGameboard;
}

export class GraphicalGameboard {
  gameboardElement: Element;

  constructor(gameboard: IGameboard) {
    this.gameboardElement = this.createGameboard(gameboard);
  }

  createGameboard(gameboard: IGameboard) {
    const gameboardElement = document.createElement('div');
    gameboardElement.classList.add('gameboard');
    const numberOfFields = gameboard.board.length;
    // for calculation of field size
    gameboardElement.style.setProperty(
      '--number-of-fields',
      `${numberOfFields}`
    );
    for (let i = 0; i < gameboard.board.length; i++) {
      for (let j = 0; j < gameboard.board.length; j++) {
        const fieldElement = document.createElement('div');
        fieldElement.classList.add('gameboard_field');
        fieldElement.dataset.x = j.toString();
        fieldElement.dataset.y = i.toString();
        gameboardElement.appendChild(fieldElement);
      }
    }
    return gameboardElement;
  }

  placeGameboard() {
    const gameboardContainer = document.querySelector('.gameboardContainer');
    gameboardContainer.appendChild(this.gameboardElement);
  }

  togglePlacedShips(gameboard: IGameboard) {
    for (let i = 0; i < gameboard.board.length; i++) {
      for (let j = 0; j < gameboard.board.length; j++) {
        if (
          gameboard.board[i][j] !==
          gameboard.EMPTY_FIELD_VALUE
        ) {
          let children = this.gameboardElement.children;
          for (let n = 0; n < children.length; n++) {
            let child = children[n];
            if (
              (child as any).dataset.x === i.toString() &&
              (child as any).dataset.y === j.toString()
            ) {
              (child as any).classList.toggle('ship');
            }
          }
        }
      }
    }
  }

  colorShip(coordinates: { x: number; y: number }[]) {
    coordinates.forEach((element) => {
      let children = this.gameboardElement.children;
      for (let n = 0; n < children.length; n++) {
        let child = children[n];
        if (
          (child as any).dataset.x === element.x.toString() &&
          (child as any).dataset.y === element.y.toString()
        ) {
          (child as any).classList.add('sunk');
        }
      }
    });
  }

  markShotField(result: string, child: HTMLElement) {
    if (result === 'hit') {
      child.classList.add('hit');
    } else {
      child.classList.add('miss');
    }
  }
}
