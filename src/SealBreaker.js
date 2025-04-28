/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

import { CreateGrid } from './Reusable'

//////////////////////////////////////////////////////////////////////////////
//// CSS
//////////////////////////////////////////////////////////////////////////////

export const s = {
  container: css({
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
    marginBottom: theme.main.spacing.md,
    fontFamily: "'Arial Black', Gadget, sans-serif",
    // @todo .theme
    textShadow: `
    0 0 20px ${theme.color.accentShadowLight},
    0 0 30px ${theme.color.accentShadowMedium},
    0 0 40px ${theme.color.accentShadowDark}
  `,
  }),
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const SealBreaker = () => {
  const rows = 3
  const columns = 3
  let grid = CreateGrid(rows, columns)

  //4 tahy
  const [currentGrid, setCurrentGrid] = useState([''])
  const [endGame, setEndGame] = useState(false)
  const [turns, setTurns] = useState(0)

  const ProceedTurn = index => {
    if (!endGame) {
      setTurns(turns + 1)

      // @comment - gratulka našel jsi vlastní řešení problému, které je zjednodušením předchozího :P
      // takto to klidně nech je to správně, relativně jednoduché, ale složitější na definici (tedy tato metoda nebude fungovat pokud se změní rozměr gridu)
      // pokud by jsi to chtěl ještě trošku vylevlit i pro dynamický rozměr gridky tak postup je jednoduchý:
      // vždy se ptáš pouze na sousední 4 pole a pokud existují tak je přepínáš true / false

      // Definícia susedov pre každú pozíciu (index 1-9)
      const neighbors = {
        1: [1, 2, 4], // Lavy horny roh
        2: [2, 1, 3, 5], // Stred hornej casti
        3: [3, 2, 6], // Pravy horny roh
        4: [4, 1, 5, 7], // Stred lavy
        5: [5, 2, 4, 6, 8], // Stred stred
        6: [6, 3, 5, 9], // Stred pravy
        7: [7, 4, 8], // Lavy dolny roh
        8: [8, 5, 7, 9], // Stred dolnej casti
        9: [9, 6, 8], // Pravy dolny roh
      }

      if (neighbors[index]) {
        neighbors[index].forEach(neighborIndex => {
          SwitchTarget(neighborIndex, 0)
        })
      }

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
    <div css={s.container}>
      <h1 css={s.headerTurn}>Number of turns: {turns}</h1>
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
