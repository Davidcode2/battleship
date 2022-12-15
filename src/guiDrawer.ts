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
      gameboardElement.appendChild(fieldElement);
    }
  }
  return gameboardElement;
}

export function placeGameboard(gameboard: Element) {
  const gameboardContainer = document.querySelector('.gameboardContainer');
  gameboardContainer.appendChild(gameboard);
}
