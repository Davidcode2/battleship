import { IGameboard } from './gameboard';

export function createGameboard(gameboard: IGameboard) {
  const gameboardElement = document.createElement('div');
  gameboardElement.classList.add('gameboard');
  const numberOfFields = gameboard.board.length;
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

export function markPlacedShips(
  gameboard: IGameboard,
  gameboardElement: Element
) {
  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board.length; j++) {
      if (gameboard.board[i][j] !== gameboard.EMPTY_FIELD_VALUE) {
        let children = gameboardElement.children;
        for (let n = 0; n < children.length; n++) {
          let child = children[n];
          if (
            (child as any).dataset.x === i.toString() &&
            (child as any).dataset.y === j.toString()
          ) {
            (child as any).style.backgroundColor = "#282828";
          }
        }
      }
    }
  }
}
