import '../css/style.css';
import { Ship } from './ship';
import { Game } from './game';

console.log("woot");

console.log(Ship(3));

const game = new Game();

game.setUpGame();
game.startGame();



