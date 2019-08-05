import * as R from 'ramda'
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import MapBoard from './components/MapBoard'



import { isVictory, isDraw } from './game/gameUtils'
const createInitialCells = (length) => Array(length * length).fill(null)
const TicTacToe = Game({
  setup: () => ({ cells: createInitialCells(10) }),

  moves: {
    clickCell(G, ctx, id) {
      // Ensure that we can't overwrite cells.
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    },
  },
  flow: {
    endGameIf: (G, ctx) => {
      if (isVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (isDraw(G.cells)) {
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