import { Gameboard } from '../gameboard';

describe('test gameboard', () => {
  test('create default size gameboard', () => {
    let gameboard = Gameboard();
    expect(gameboard).toBeInstanceOf(Object);
  });

  test('create 5x5 gameboard', () => {
    let gameboard = Gameboard(4);
    expect(gameboard).toBeInstanceOf(Object);
  });
});

describe('test ship placement', () => {
  test('place ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(4, 1, 1);
    expect(Object.keys(gameboard.ships).length).toBe(1);
  });
  test('assign ship to field', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShip(2, 1, 1)).toBe(true);
  });
  test('assign ship to occupied field', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2,1,1);
    expect(gameboard.placeShip(2, 1, 1)).toBe(false);
  });
  test.skip('place ship vertically', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShip(2,1,1)).toBe(true);
  });
});

describe('apply attack', () => {
  test('shoot at ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].hits).toBe(1);
  });
  test('shoot at water', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(3, 0);
    expect(gameboard.missedShots).toContainEqual({"x": 3,"y": 0});
  });
  test('sink ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.board[0][0].isSunk()).toBe(true);
  });
  test('do not sink ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].isSunk()).toBe(false);
  });
});

describe('all ships sunk', () => {
  test('all sunk', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
  test('not all sunk', () => {
    let gameboard = Gameboard();
    gameboard.placeShip(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
