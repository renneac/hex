/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

////////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////////
export const s = {
  button: css({
    height: '150px',
    width: '150px',
    margin: '10px',
    backgroundColor: '#006B00',
    border: '4px solid #006600',
    transition: 'background-color 0.3s, color 0.3s',
  }),
}

////////////////////////////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////////////////////////////
export const CreateGrid = (rows, columns) => {
  let cellIndex = 1
  let grid = []
  let row = []
  let square

  for (let i = 0; i < rows; i++) {
    for (let x = 0; x < columns; x++) {
      square = <button id={cellIndex} value={cellIndex} css={s.button}></button>
      row.push(square)
      cellIndex++
    }
    grid.push(row)
    row = []
  }

  return grid
}
