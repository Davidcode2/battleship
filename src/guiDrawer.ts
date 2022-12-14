import { IGameboard } from './gameboard';

export function drawGameboard(gameboard: IGameboard, gameboardElement: Element) {
  for (const field of gameboard.board) {
    const fieldElement = document.createElement('div');
    fieldElement.classList.add("gameboard_field");
    gameboardElement.appendChild(fieldElement);
  }
}
