import { Ship } from '../ship';

describe('test ship', () => {
  test('hits ship', () => {
    let ship = Ship(4);
    expect(ship.hits).toEqual(0);
    ship.hit();
    expect(ship.hits).toEqual(1);
  });
});
