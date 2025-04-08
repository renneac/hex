/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

//////////////////////////////////////////////////////////////////////////////
//// CSS
//////////////////////////////////////////////////////////////////////////////

// @todo refactoring .theme

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
  body {
    background-color: #000000;
  }
  button: hover {
    background-color: #663399;
  }
`

export const s = {
  buttonContainer: css({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  button: css({
    height: '150px',
    width: '150px',
    margin: '10px',
    backgroundColor: '#FF6B00',
    border: '4px solid #006600',
    transition: 'background-color 0.3s, color 0.3s',
  }),
  headerTurn: css({
    color: '#ff0000',
    fontFamily: "'Arial Black', Gadget, sans-serif",
  }),
}

// @todo refactoring .theme - END

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const SealBreaker = () => {
  const rows = 3
  const columns = 3
  let grid = []
  let row = []
  let square
  let cellIndex = 1

  //@todo CreateGrid refactoring .reusable
  const CreateGrid = () => {
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

  CreateGrid()

  //4 tahy
  const [currentGrid, setCurrentGrid] = useState([''])
  const [endGame, setEndGame] = useState(false)
  const [turns, setTurns] = useState(0)

  const ProceedTurn = index => {
    if (!endGame) {
      setTurns(turns + 1)

      ////////////////////////////////////////////////////////////
      //@todo refactoring Fn - SwitchTarget.. to much ifs
      ////////////////////////////////////////////////////////////

      SwitchTarget(index, 0)

      // stred vrchnej casti
      if (index > 1 && index < columns) {
        SwitchTarget(index, -1)
        SwitchTarget(index, 1)
        SwitchTarget(index, columns)
      } else if (index < rows * columns && index > rows * columns - columns + 1) {
        // stred spodnej casti
        SwitchTarget(index, 1)
        SwitchTarget(index, -1)
        SwitchTarget(index, -columns)
      }

      // prava strana
      else if (Number(index) % columns === 0) {
        SwitchTarget(index, -1)
        if (Number(index) === columns * rows) {
          // pravy dolny roh
          SwitchTarget(index, -columns)
        } else if (Number(index) === columns) {
          // pravy horny roh
          SwitchTarget(index, columns)
        } else {
          SwitchTarget(index, columns)
          SwitchTarget(index, -columns)
        }
      }
      ////////////////// lava strana//////////////////
      else if (Number(index) % columns === 1) {
        SwitchTarget(index, 1)
        if (Number(index) === (rows - 1) * columns + 1) {
          // lavy dolny roh
          SwitchTarget(index, -columns)
        } else if (Number(index) === 1) {
          // lavy horny roh
          SwitchTarget(index, columns)
        } else {
          // lava strana stred
          SwitchTarget(index, columns)
          SwitchTarget(index, -columns)
        }
      } else {
        //stred stred
        SwitchTarget(index, columns)
        SwitchTarget(index, -columns)
        SwitchTarget(index, 1)
        SwitchTarget(index, -1)
      }

      ////////////////////////////////////////////////////////////
      //@todo refactoring Fn - SwitchTarget.. to much ifs - END
      ////////////////////////////////////////////////////////////

      let newGridState = []
      for (let x = 0; x < 9; x++) {
        newGridState.push(document.getElementById(x + 1).innerHTML)
        setCurrentGrid(newGridState)
      }
    }
  }

  useEffect(() => {
    if (!currentGrid.includes('')) {
      setEndGame(true)
    }
  }, [currentGrid])

  const SwitchTarget = (index, shift) => {
    if (document.getElementById(Number(index) + shift).innerHTML === '') {
      document.getElementById(Number(index) + shift).innerHTML = 'x'
    } else {
      document.getElementById(Number(index) + shift).innerHTML = ''
    }
  }

  return (
    <div>
      <h1 css={s.headerTurn}>Number of turns: {turns}</h1>
      <table>
        <Global styles={globalStyles} />
        <tbody>
          {grid.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index} onClick={event => ProceedTurn(event.target.value)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
