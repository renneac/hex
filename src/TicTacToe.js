/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

import pumpkin from './images/pumpkin.png'
import ghost from './images/ghost.png'

import { CreateGrid } from './Reusable'

//////////////////////////////////////////////////////////////////////////////
//// CSS
//////////////////////////////////////////////////////////////////////////////

export const s = {
  buttonContainer: css({
    // @todo .theme
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // @todo .theme
    background: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`,
  }),
  headerTurn: css({
    color: theme.color.accentColor,
    fontFamily: "'Arial Black', Gadget, sans-serif",
    // @todo .theme
    textShadow: `
    0 0 20px ${theme.color.accentShadowLight},
    0 0 30px ${theme.color.accentShadowMedium},
    0 0 40px ${theme.color.accentShadowDark}
  `,
    fontSize: theme.main.font.xl,
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
  let grid = CreateGrid(rows, columns)

  //3. Hraci
  const player1 = pumpkin
  const player2 = ghost

  //4 tahy
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true)
  const [currentGrid, setCurrentGrid] = useState([''])
  const [endGame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(null)

  const ProceedTurn = index => {
    if (!endGame) {
      if (document.getElementById(index).innerHTML === '') {
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
        grid[a] !== '' ? (setWinner(isFirstPlayerTurn ? player2 : player1), setEndGame(true)) : '-'
        return grid[a]
      }
    }

    if (!grid.includes('')) {
      setEndGame(true)
    }
  }

  useEffect(() => {
    winCheck(currentGrid) === '-' ? console.log('Stale nikto.') : console.log(winCheck(currentGrid))
  }, [isFirstPlayerTurn])

  return (
    <div css={s.buttonContainer}>
      <h1 css={s.headerTurn}>{endGame ? (winner ? 'WINNER' : 'DRAW') : 'TURN'}</h1>
      <img src={endGame ? winner : isFirstPlayerTurn ? player1 : player2} alt='' />
      <table>
        <Global styles={theme.globalStyles} />
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
