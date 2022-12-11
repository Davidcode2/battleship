import { IGameboard } from './gameboard';

export function HumanPlayer(gameboard: IGameboard): void {
  this.gameboard = gameboard;
}

HumanPlayer.prototype.attack = function (this: any, x: number, y: number) {
  this.gameboard.receiveAttack(x, y);
};

export function ComputerPlayer(gameboard: IGameboard) {
  this.gameboard = gameboard;
}

ComputerPlayer.prototype.makeMove = function (this: any) {
  let shotsTaken = new Array<{ x: number; y: number }>();
  const numberOfFields = Math.pow(this.gameboard.board.length, 2);
  while (shotsTaken.length !== numberOfFields) {
    let x = Math.floor((Math.random() * 100) % this.gameboard.board.length);
    let y = Math.floor((Math.random() * 100) % this.gameboard.board.length);
    if (!shotsTaken.includes({ x, y })) {
      this.gameboard.receiveAttack(x, y);
      return;
    }
  }
};
