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
    gameboard.placeShipVertical(4, 0, 0);
    expect(Object.keys(gameboard.ships).length).toBe(1);
  });
  test('assign ship to field', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShipVertical(2, 1, 1)).toBe(true);
  });
  test('assign ship to occupied field', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2,1,1);
    expect(gameboard.placeShipVertical(2, 1, 1)).toBe(false);
  });
  test('assign ship to occupied field', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2,2,2);
    expect(gameboard.placeShipHorizontal(3, 0, 2)).toBe(false);
  });
  test('assign ship to occupied field', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(3,2,0);
    expect(gameboard.placeShipHorizontal(3, 0, 2)).toBe(false);
  });
  test('assign ship to not occupied field', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(3,3,0);
    expect(gameboard.placeShipHorizontal(2, 0, 2)).toBe(true);
  });
  test.skip('place ship vertically', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShipVertical(2,1,1)).toBe(true);
  });
});

describe('apply attack', () => {
  test('shoot at ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].hits).toBe(1);
  });
  test('shoot at water', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(3, 0);
    expect(gameboard.missedShots).toContainEqual({"x": 3,"y": 0});
  });
  test('sink ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.board[0][0].isSunk()).toBe(true);
  });
  test('do not sink ship', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].isSunk()).toBe(false);
  });
});

describe('all ships sunk', () => {
  test('all sunk', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.allShipsSunk()).toBe(true);
  });
  test('not all sunk', () => {
    let gameboard = Gameboard();
    gameboard.placeShipVertical(2, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});

describe('is valid field', () => {
  test('outside bounds', () => {
    let gameboard = Gameboard(5);
    expect(gameboard.placeShipVertical(2, 5, 5)).toBe(false);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard(5);
    expect(gameboard.placeShipVertical(3, 3, 3)).toBe(false);
  });
  test('inside bounds', () => {
    let gameboard = Gameboard(5);
    expect(gameboard.placeShipVertical(2, 3, 3)).toBe(true);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShipVertical(2, 4, 4)).toBe(false);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard(5);
    expect(gameboard.placeShipVertical(5, 0, 0)).toBe(true);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard(3);
    expect(gameboard.placeShipVertical(2, 1, 2)).toBe(false);
  });
  test('inside bounds', () => {
    let gameboard = Gameboard(5);
    expect(gameboard.placeShipVertical(2, 0, 2)).toBe(true);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard();
    expect(gameboard.placeShipHorizontal(2, 4, 4)).toBe(false);
  });
  test('outside bounds', () => {
    let gameboard = Gameboard(10);
    expect(gameboard.placeShipHorizontal(3, 8, 9)).toBe(false);
  });
});
