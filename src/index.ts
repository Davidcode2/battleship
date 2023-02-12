import '../css/style.css';
import { Game } from './game';
import { Menu } from './menu';

console.log('woot');

//let gameboardSize = 8;
let gameRunning = false;

const menu = new Menu(gameRunning, startGame);

function startGame(gameboardSize: number) {
  const game = new Game(gameboardSize);
}

function setGameRunning(value: boolean) {
  gameRunning = value;
}

