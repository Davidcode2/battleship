import { v4 as uuid4 } from 'uuid';

export interface IShip {
  id: string,
  length: number,
  hits: number,
  hit: () => void,
  isSunk: () => boolean
}

export const Ship = (length: number) => {
  let hits = 0;
  const id: string = uuid4();
  return {
    id,
    length: length,
    hits: hits,
    hit: function() {
      this.hits += 1;
    },
    isSunk: function() {
      if (this.hits >= this.length) {
        return true;
      } 
      return false;
    },
  };
};
