import * as R from 'ramda'

function partitionIntoPossibleSequeneces(cells){
  const gridSize = Math.sqrt(cells.length)
  const rowsSequences = R.splitEvery(gridSize, cells)

  const columnSequences = rowsSequences.reduce((acc, sequence) => {
    sequence.forEach((cellVal, idx) => { acc[idx].push(cellVal) })
    return acc
  }, R.times(() => [], gridSize))

  const diagonalSequences = rowsSequences.reduce((acc, sequence, idx) => {
    acc[0].push(sequence[idx])
    acc[1].push(sequence[(gridSize - 1) - idx])
    return acc;
  }, R.times(() => [], 2))

  return [
    ...rowsSequences,
    ...columnSequences,
    ...diagonalSequences,
  ]
}




// Rows
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]

// Rows
// [1, 2, 3, 4]
// [5, 6, 7, 8]
// [9, 10, 11, 12]
// 
const notNull = (val) => R.not(R.equals(null, val))

function allTheSame(sequence) {
  return R.pipe(
    R.all(
      R.both(
        R.equals(sequence[0]),
        notNull,        
      ),
    )
  )(sequence)
}

const anySequenceIsAllSame = cells => R.pipe(
  partitionIntoPossibleSequeneces,
  R.any(allTheSame)
)(cells)

const allCellsAreFilled = cells => R.all(notNull, cells);

// Return true if `cells` is in a winning configuration.
function isVictory(cells) {
  return anySequenceIsAllSame(cells)

}

function isDraw(cells) {
  return allCellsAreFilled(cells)
}

export { isVictory, isDraw }; 