/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import * as theme from './theme'

////////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////////
export const s = {
  button: css({
    height: '150px',
    width: '150px',
    margin: '10px',
    fontSize: theme.main.font.xl,
    backgroundColor: theme.color.accentColor,
    border: `4px solid ${theme.color.linkColor}`,
    transition: theme.effects.transition.backgroundAndColor,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color.linkHoverColor,
      color: theme.color.primaryBackgroundStart,
    },
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
