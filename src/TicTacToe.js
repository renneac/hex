/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

import pumpkin from './images/pumpkin.png'
import ghost from './images/ghost.png'

//////////////////////////////////////////////////////////////////////////////
//// CSS
//////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const TicTacToe = () => {
  //1. Rozlozenie / dekompozicia
  //Grid hotovo
  //2 hraci hotovo
  //striedanie tahov Hotovo
  //koniec (9)
  //
  const rows = 3
  const columns = 3
  let grid = []
  let row = []
  let square
  let cellIndex = 1

  const CreateGrid = () => {
    let newGrid = []

    for (let i = 0; i < rows; i++) {
      for (let x = 0; x < columns; x++) {
        square = (
          <button id={cellIndex} value={cellIndex} css={s.button}>
            -
          </button>
        )
        row.push(square)
        cellIndex++
      }
      grid.push(row)
      row = []
    }

    return grid
  }

  CreateGrid()

  //3. Hraci
  const player1 = pumpkin
  const player2 = ghost

  //4 tahy
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true)
  const [currentGrid, setCurrentGrid] = useState(['-'])
  const [endGame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(null)

  const ProceedTurn = index => {
    if (!endGame) {
      // if (document.getElementById(index).innerHTML === '-') {
      //   document.getElementById(index).innerHTML = isFirstPlayerTurn ? player1 : player2
      // }

      if (document.getElementById(index).innerHTML === '-') {
        document.getElementById(index).innerHTML = isFirstPlayerTurn
          ? `<img src="${player1}" alt="Hráč 1">`
          : `<img src="${player2}" alt="Hráč 2">`

        setIsFirstPlayerTurn(!isFirstPlayerTurn)

        let newGridState = []
        for (let x = 0; x < 9; x++) {
          newGridState.push(document.getElementById(x + 1).innerHTML)
          setCurrentGrid(newGridState)
        }
      }
    }
  }

  // 5. Koniec hry
  const winCheck = grid => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i]
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        grid[a] !== '-' ? (setWinner(isFirstPlayerTurn ? player2 : player1), setEndGame(true)) : ''
        console.log(winLines[i])
        return grid[a]
      }
    }

    if (!grid.includes('-')) {
      setEndGame(true)
      console.log('Remiza')
    }
  }

  // useEffect(() => {
  //   console.log(currentGrid)
  //   winCheck(currentGrid) === '-' ? console.log('Stale nikto.') : console.log(winCheck(currentGrid))
  // }, [isFirstPlayerTurn])

  useEffect(() => {
    console.log(currentGrid)
    winCheck(currentGrid) === '-' ? console.log('Stale nikto.') : console.log(winCheck(currentGrid))
  }, [isFirstPlayerTurn])

  return (
    <div css={s.buttonContainer}>
      <h1 css={s.headerTurn}>{endGame ? (winner ? 'WINNER' : 'DRAW') : 'TURN'}</h1>
      <img src={endGame ? winner : isFirstPlayerTurn ? player1 : player2} alt='' />
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
