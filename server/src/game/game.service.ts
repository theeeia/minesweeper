import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const BOARD_SIZE = 16;
const MINE_COUNT = 40;
type State = { mines: string[]; revealed: string[]; flagged: string[] };

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  /**
   * Initialize a new game with empty state and randomized mines
   */
  async startGame() {
    const mines = new Set<string>();
    while (mines.size < MINE_COUNT) {
      const x = Math.floor(Math.random() * BOARD_SIZE);
      const y = Math.floor(Math.random() * BOARD_SIZE);
      mines.add(`${x},${y}`);
    }
    const state: State = {
      mines: [...mines],
      revealed: [],
      flagged: [],
    };

    return this.prisma.game.create({
      data: { state, elapsedTime: 0, isFinished: false },
    });
  }

  /**
   * Reveal a cell and its zero-mines neighbors.
   */
  async revealCell(gameId: string, x: number, y: number) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });
    if (!game) throw new Error('Game not found');

    const state = game.state as State;
    const key = `${x},${y}`;

    // end game if cell is on mine
    if (state.mines.includes(key)) {
      state.revealed.push(key);
      return this.prisma.game.update({
        where: { id: gameId },
        data: { state, isFinished: true },
      });
    }

    const toReveal = new Set<string>();
    const visited = new Set<string>();
    toReveal.add(key);

    // get cell neighbors
    const neighbors = (cell: string) => {
      const [i, j] = cell.split(',').map(Number);
      const directions = [-1, 0, 1];

      return directions
        .flatMap((dx) => directions.map((dy) => [i + dx, j + dy] as const))
        .filter(
          ([x, y]) =>
            // skip self
            (x !== i || y !== j) &&
            // check edges
            x >= 0 &&
            x < BOARD_SIZE &&
            y >= 0 &&
            y < BOARD_SIZE,
        )
        .map(([x, y]) => `${x},${y}`);
    };

    // reveal all bordering zero-cells
    while (toReveal.size) {
      const cellKey = toReveal.values().next().value;

      toReveal.delete(cellKey);

      if (visited.has(cellKey)) continue;
      visited.add(cellKey);

      // count adjacent mines
      const adjacentMines = neighbors(cellKey).filter((neighborKey) =>
        state.mines.includes(neighborKey),
      ).length;

      state.revealed.push(cellKey);

      // if no adjacent mines, queue its neighbors
      if (adjacentMines === 0) {
        neighbors(cellKey).forEach((neighborKey) => {
          if (!visited.has(neighborKey)) toReveal.add(neighborKey);
        });
      }
    }

    const totalCells = BOARD_SIZE * BOARD_SIZE;
    const numMines = state.mines.length;
    const numRevealed = state.revealed.length;
    const numFlagged = state.flagged.length;

    // if every non-mine cell is revealed or flagged → win
    if (numRevealed + numFlagged === totalCells - numMines) {
      return this.prisma.game.update({
        where: { id: gameId },
        data: { state, isFinished: true },
      });
    }

    return this.prisma.game.update({
      where: { id: gameId },
      data: { state },
    });
  }

  async toggleFlag(gameId: string, x: number, y: number) {
    const game = await this.prisma.game.findUnique({ where: { id: gameId } });
    if (!game) throw new Error('Game not found');

    const state: State = game.state as State;

    const key = `${x},${y}`;

    const flagged = state.flagged.includes(key)
      ? state.flagged.filter((flaggedKey) => flaggedKey !== key)
      : [...state.flagged, key];

    state.flagged = flagged;

    const totalCells = BOARD_SIZE * BOARD_SIZE;
    const numMines = state.mines.length;
    const numRevealed = state.revealed.length;
    const numFlagged = state.flagged.length;

    // if every non-mine cell is revealed or flagged → win
    if (numRevealed + numFlagged === totalCells - numMines) {
      return this.prisma.game.update({
        where: { id: gameId },
        data: { state, isFinished: true },
      });
    }

    return this.prisma.game.update({
      where: { id: gameId },
      data: { state },
    });
  }
}
