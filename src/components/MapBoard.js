import React from 'react';
import styled, { css } from 'styled-components/macro'


const Edge = styled.div`
  grid-area: ${props => props.direction}-edge;
  background-color: red;
`

const createTemplateAreas = (dimensions) => {
  const [ width, height ] = dimensions
  let rows = []
  
  rows.push('. ' + new Array(width + 1).join('top-edge ') + '.')

  for(let i = 1; i <= height; i++) {
    const row = 'left-edge ' + new Array(width + 1).join('board ') + 'right-edge';
    rows.push(row);
  }

  rows.push('. ' + new Array(width + 1).join('bottom-edge ') + '.')

  return rows.join(`" "`);
}

const Map = styled.div`
  display: grid;
  // transform: perspective(500px) rotateX(45deg) rotate(45deg);

  ${({size, dimensions}) => css`
    grid-template-areas: "${createTemplateAreas(dimensions)}";
    width: ${size * dimensions[0]}px;
    height: ${size * dimensions[1]}px;
    grid-template-columns: 20px repeat(${dimensions[0]}, ${size}px) 20px;
    grid-template-rows: 20px repeat(${dimensions[1]}, ${size}px) 20px;
   `}
`

const TileContainer = styled.div`
  ${props => css`
    grid-column-start: ${props.col + 2}
    grid-column-end: ${props.col + 3}
    grid-row-start: ${props.row + 2}
    grid-row-end: ${props.row + 3}
  `}
`

const TileUi = styled.div`
  border: 1px solid #555;
  background: green;
  height:100%;
  display: block; 
`


const Tile = (props) => {
  return (
    <TileContainer {...props}>
      <TileUi {...props}  />
     </TileContainer>
   ); 
}

class MapBoard extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = '';
    const gridLength = Math.sqrt(this.props.G.cells.length)
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    let cells = [];
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridLength; j++) {
        const id = gridLength * i + j;
        cells.push(
          <Tile
            key={id} 
            id={id}
            row={i}
            col={j}
            onClick={() => this.onClick(id)}
          />
        );
      }
    }

    return (
      <div>
        <Map size={50} dimensions={[gridLength, gridLength]}>
          {cells}
          <Edge direction="top">Top</Edge>
          <Edge direction="bottom">Bottom</Edge>
          <Edge direction="left">Left</Edge>
          <Edge direction="right">Right</Edge>
        </Map>
        {winner}
      </div>
    );
  }
}

export default MapBoard