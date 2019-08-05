import * as R from 'ramda'


function propMatches(props, id, value) {
  return R.pipe(
      R.find(R.propEq('id', id)),
      R.propEq('value', value)
    )(props)
}

// Create a filter for each prop. By default generates yEquals, and xEquals
const createFilters = (properties) => properties.reduce(
  (acc, prop) => ({ 
    ...acc, 
    [`${prop.id}Equals`]: R.curry((value, { props }) => propMatches(props, prop.id, value))
  }),
  {}
)

function createProperty({ id, displayName, initialValue }) {
  return {
    id,
    displayName,
    value: initialValue
  }
}

function cellToObject({ props }) {
  return props.reduce((acc, prop) => ({...acc, [prop.id]: prop.value}), {})
}

class QueryableGrid {
  cells

  constructor(cellList, length, width) {
    this.filters = createFilters(cellList['0,0'].props)
      
    this.cells = cellList
    this.columns = width
    this.rows = length
    return this;
  }

  getCol(idx) {
    return Object.values(
      R.filter(
        this.filters.yEquals(idx),
        this.cells,
      )
    ).map(cellToObject)
  }

  getCell(row, cell){
    return cellToObject(this.cells[`${row},${cell}`])
  }

  getCells(){
    return Object.values(this.cells).map(cellToObject);
  }

  getRow(idx) {
    return Object.values(
      R.filter(
        this.filters.xEquals(idx),
        this.cells,
      )
    ).map(cellToObject)
  }

  getRows() {
    return R.times(this.getRow.bind(this), this.rows)
  }

  getColumns() {
    return R.times(this.getCol.bind(this), this.columns)
  }

  get(type, first, optionalSecond) {
    switch(type) {
      case 'col':
        return this.getCol(first)
      case 'row':
        return this.getRow(first)
      case 'cell':
        return this.getCell(first, optionalSecond)
      default: 
        return this.cells; 

    }
  }
}


function createCellsList(length, width, propertiesDefs) {
  const acc = {}
    R.times((x) => {
      R.times((y) => {
        acc[`${x},${y}`] = {
          props: [
            ...propertiesDefs.map(createProperty),
            createProperty({ id: 'x', displayName: 'Row', initialValue: x}),
            createProperty({ id: 'y', displayName: 'Column', initialValue: y}),
          ]
        }
      }, width)
    }, length)
  return acc
}

const createGridModel = (length, width) => {
  const cellList = createCellsList(
    length, width,
    [{
      id: 'height',
      displayName: 'Height',
      initialValue: 1,
    }]
  ) 

  return new QueryableGrid(cellList, length, width)
}

export default createGridModel