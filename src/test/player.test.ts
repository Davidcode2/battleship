import { Gameboard } from '../gameboard';
import { ComputerPlayer, HumanPlayer } from '../player';

describe('player has turn', () => {
  test('player has turn', () => {
    let gameboard = Gameboard();
    const player1 = new (HumanPlayer as any)(gameboard);
    player1.attack(1,1);
    expect(gameboard.missedShots).toContainEqual({"x": 1, "y": 1});
  });
});

describe('computer shot', () => {
  test('computer shot', () => {
    let gameboard = Gameboard();
    const computer = new (ComputerPlayer as any)(gameboard);
    computer.makeMove();
    expect(gameboard.missedShots.length == 1).toBe(true);
  });
  test('computer shot', () => {
    let gameboard = Gameboard();
    const computer = new (ComputerPlayer as any)(gameboard);
    for (let i = 0; i < Math.pow(gameboard.board.length, 2); i++) {
      computer.makeMove();
    }
    expect(gameboard.missedShots.length == Math.pow(gameboard.board.length, 2)).toBe(true);
  });
});
