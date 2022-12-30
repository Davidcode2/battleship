import '../css/style.css';
import { Ship } from './ship';
import { Game } from './game';

console.log('woot');

console.log(Ship(3));

const newGameButton = document.querySelector('#newGame');
newGameButton.addEventListener('click', () => {
  const game = new Game(8);
});
