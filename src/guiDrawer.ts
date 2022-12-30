import { IGameboard } from './gameboard';

interface GameboardWithGui {
  gameboard: IGameboard;
  gameboardGui: Element;
}

export function createGameboard(gameboard: IGameboard) {
  const gameboardElement = document.createElement('div');
  gameboardElement.classList.add('gameboard');
  const numberOfFields = gameboard.board.length;
  // for calculation of field size
  gameboardElement.style.setProperty('--number-of-fields', `${numberOfFields}`);
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

export function placeGameboard(gameboard: Element) {
  const gameboardContainer = document.querySelector('.gameboardContainer');
  gameboardContainer.appendChild(gameboard);
}

export function togglePlacedShips(gameboard: GameboardWithGui) {
  for (let i = 0; i < gameboard.gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.gameboard.board.length; j++) {
      if (
        gameboard.gameboard.board[i][j] !==
        gameboard.gameboard.EMPTY_FIELD_VALUE
      ) {
        let children = gameboard.gameboardGui.children;
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

export function colorShip(
  gameboard: Element,
  coordinates: { x: number; y: number }[]
) {
  coordinates.forEach((element) => {
    let children = gameboard.children;
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

export function markShotField(x: number, y: number) {}
