import { Ship } from '../ship';

describe('test ship', () => {
  test('hits ship', () => {
    let ship = Ship(4);
    ship.hit();
    expect(ship.hits).toEqual(1);
  });
  
  test('is sunk', () => {
    let ship = Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('is not sunk', () => {
    let ship = Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});


