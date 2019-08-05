import * as R from 'ramda'
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import MapBoard from './components/MapBoard'
import createGridModel from './game/createGridModel';


import { isVictory, isDraw } from './game/gameUtils'
const createInitialCells = (length) => Array(length * length).fill(null)
const TicTacToe = Game({
  setup: () => ({ grid: createGridModel(10, 10) }),

  moves: {
    clickCell(G, ctx, id) {
      // Ensure that we can't overwrite cells.
      if (G.grid[id] === null) {
        G.grid[id] = ctx.currentPlayer;
      }
    },
  },
  flow: {
    endGameIf: (G, ctx) => {
      if (isVictory(G.grid)) {
        return { winner: ctx.currentPlayer };
      }
      if (isDraw(G.grid)) {
        return { draw: true };
      }
    },
  },
});

const App = Client({ 
  game: TicTacToe,
  board: MapBoard
});

export default App;