import { IShip, Ship } from './ship';

export interface IGameboard {
  receiveAttack: (x: any, y: any) => void,
  board: [],
  placeShipVertical: (length: number, x: number, y: number) => boolean,
  placeShipHorizontal: (length: number, x: number, y: number) => boolean,
  EMPTY_FIELD_VALUE: any,
}
 
export const Gameboard = function (size = 4) {
  const EMPTY_FIELD_VALUE: any = null;
  const MISS: any = 'water';

  return {
    EMPTY_FIELD_VALUE,
    board: (function (size: any): any {
      let board = [];
      for (let i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
          if (board[i]) {
            board[i].push(EMPTY_FIELD_VALUE);
          }
        }
      }
      return board;
    })(size),

    missedShots: new Array(),
    successfulShots: new Array(),
    ships: new Array<IShip>(),
    assignShipToFieldsHorizontal: function (ship: any, x: number, y: number) {
      for (let i = 0; i < ship.length; i++) {
        this.board[x+i][y] = ship;
      }
    },
    assignShipToFieldsVertical: function (ship: any, x: number, y: number) {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y+i] = ship;
      }
    },

    occupied: function (length: number, x: number, y: number) {
      for (let i = 0; i < length; i++) {
        if (this.board[x][y] !== EMPTY_FIELD_VALUE) {
          return true;
        }
      }
      return false;
    },

    isOutsideOfBounds: function (length: number, x: number, y: number) {
      // check bounds
      const outerBound = this.board.length;
      if (x > outerBound || y > outerBound) return true;
      //if (x + length > outerBound) return true;
      return false;
    },

    placeShipHorizontal: function (length: number, x: number, y: number) {
      if (this.isOutsideOfBounds(length, x, y)) return false;
      if (this.occupied(length, x, y)) return false;
      let ship = Ship(length);
      this.ships.push(ship);
      this.assignShipToFieldsHorizontal(ship, x, y);
      return true;
    },

    placeShipVertical: function (length: number, x: number, y: number) {
      if (this.isOutsideOfBounds(length, x, y)) return false;
      if (this.occupied(length, x, y)) return false;
      let ship = Ship(length);
      this.ships.push(ship);
      this.assignShipToFieldsVertical(ship, x, y);
      return true;
    },

    receiveAttack: function (x: number, y: number) {
      if (this.board[x][y] !== EMPTY_FIELD_VALUE) {
        this.board[x][y].hit();
        this.successfulShots.push({ x, y });
      } else {
        this.missedShots.push({ x, y });
      }
    },

    allShipsSunk() {
      if (
        this.ships.length ===
        this.ships.filter((ship: any) => ship.isSunk()).length
      ) {
        return true;
      }
      return false;
    },
  };
};
