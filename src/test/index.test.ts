import { Game } from '../game'
import * as index from '../index'

test('game running', () => {
  let game = new Game(4);
  expect(index.gameRunning()).toBe(true);
});
