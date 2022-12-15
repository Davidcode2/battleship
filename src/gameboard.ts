import { IShip, Ship } from './ship';

export interface IGameboard {
  receiveAttack: (x: any, y: any) => void,
  board: [],
  placeShip: (length: number, x: number, y: number) => boolean,
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
    assignShipToFields: function (ship: any, x: number, y: number) {
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

    placeShip: function (length: number, x: number, y: number) {
      if (this.occupied(length, x, y)) return false;
      let ship = Ship(length);
      this.ships.push(ship);
      this.assignShipToFields(ship, x, y);
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
