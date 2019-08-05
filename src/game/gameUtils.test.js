import * as R from 'ramda'
import { isVictory } from './gameUtils'

describe('isVictory', () => {
  describe('given a row of matching values', () => {
    const cellsWithRow = [
      "0", "0", "0", null, null, null, null, null, null
    ]
    test('it should return TRUE', () => {
      expect(isVictory(cellsWithRow)).toBe(true)
    })
  })

  describe('given a column of matching values', () => {
   const cellsWithColumn = [
      "0", null, null, "0", null, null, "0", null, null
    ]
    test('it should return TRUE', () => {
      expect(isVictory(cellsWithColumn)).toBe(true)
    })
  })

  describe('given an empty board ', () => {
    const emptyBoard = R.times(() => null, 9)

    test('it should return FALSE', () => {
      expect(isVictory(emptyBoard)).toBe(false)
    })
  })

  describe('given a full board with no rows or columns', () => {
    const cellsWithNoColumnOrRow = [
      "0", "1", "0", "1", "0", "1", "0", "1", "0"
    ]
    // test('it should return TRUE', () => {
    //   expect(isVictory(cellsWithNoColumnOrRow)).toBe(false)
    // })
  })
})