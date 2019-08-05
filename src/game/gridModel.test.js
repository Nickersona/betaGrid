import createGridModel from './createGridModel'

describe('createGridModel', () => {
  const rows = 2
  const columns = 6
  const grid = createGridModel(rows, columns)

  test('should be able to fetch list of rows', () => {
    console.log(grid)
    expect(grid.getRows().length).toBe(rows)
  })

  test('should be able to fetch list of columns', () => {
    expect(grid.getColumns().length).toBe(columns)
  })
  describe('get', () => {
    describe('when fetching columns', () => {
      test('it should return a list with a number of entries equal to the rows', () => {
        console.log(grid.get('col', 0))
        expect(grid.get('col', 0).length).toEqual(rows)
      })
    })  
  })
  
})