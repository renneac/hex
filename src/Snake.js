/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect, useRef } from 'react'

const mq = {
  // Mobile – 360 x 640; 375 x 667; 360 x 720.
  // iPhone – 375 x 812.
  // Tablet – 768 x 1024.
  // Laptop – 1366 x 768.
  // Desktop or high-resolution laptop – 1920 x 1080.
  mobile: `@media (max-width: 500px)`,
  tabletSm: `@media (max-width: 650px)`,
  tablet: `@media (max-width: 850px)`,
  laptopSm: `@media (max-width: 1100px)`,
  laptop: `@media (max-width: 1500px)`,
  desktop: `@media (max-width: 2000px)`,
  outOfLimit: `@media (min-width: 2001px)`,
}

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////
export const s = {
  snakeContainer: css({
    height: theme.layout.fullScreenHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.main.spacing.md,
    background: theme.background.primaryBackground,
    color: theme.color.primaryText,
    fontFamily: "'Arial', sans-serif",
  }),
  cell: css({
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
  }),
  playground: css({
    border: `2px solid ${theme.color.accentShadowDark}`,
    margin: theme.main.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  }),
  button: css({
    width: '90px',
    height: '30px',
    margin: theme.main.spacing.xs,
    cursor: 'pointer',
    borderRadius: theme.borderRadius.sm,
    border: `2px solid ${theme.color.accentShadowMedium}`,
    backgroundColor: theme.color.accentColor,
    color: theme.color.primaryBackgroundStart,
    fontSize: theme.main.font.md,
    transition: theme.effects.transition.backgroundTransform,
    '&:hover': {
      backgroundColor: theme.color.accentShadowLight,
      transform: theme.effects.scale.sm,
    },
  }),
  arrowButton: css({
    width: '40px',
    height: '40px',
    margin: '8px',
    cursor: 'pointer',
    borderRadius: theme.borderRadius.sm,
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
    ':active': {
      backgroundColor: '#ccc',
    },
  }),
  arrowContainer: css({
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  header: css({
    marginBottom: theme.main.spacing.md,
    fontSize: theme.main.font.xl,
    fontWeight: 'bold',
    color: theme.color.accentColor,
    textShadow: theme.effects.textShadow,
  }),
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////

export const Snake = () => {
  const windowWidth = useRef(window.innerWidth)

  const [init, setInit] = useState(true)

  /////gridka - done /////
  const [grid, setGrid] = useState([])
  const [rows, setRows] = useState(7)
  const [columns, setColumns] = useState(7)

  ///head
  const [snakeHead, setSnakeHead] = useState('')
  ///body
  const [snakeBody, setSnakeBody] = useState([])

  const [endGame, setEndGame] = useState(false)
  const [gameWin, setGameWin] = useState(false)
  const [previousMove, setPreviousMove] = useState([])

  let newRow = [],
    newTile,
    tileIndex = 0

  if (init === true) {
    const CreateGrid = () => {
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
          newTile = (
            <button value={tileIndex} key={columnIndex} id={tileIndex} css={s.cell}>
              {tileIndex}
            </button>
          )

          newRow.push(newTile)

          tileIndex++
        }

        grid.push(newRow)

        newRow = []
      }
    }

    setInit(false)

    CreateGrid()
  }

  // end game
  const CheckSubmit = e => {
    e.key ? (e = e.key.toLowerCase()) : (e = e.toLowerCase())

    if (!endGame) {
      // left
      if (e === 'a' || e === 'arrowleft') {
        if (previousMove !== 'd' && previousMove !== 'arrowright') {
          setPreviousMove(e)

          if (GetColumnIndex(snakeHead - 1) > GetColumnIndex(snakeHead) || snakeHead - 1 < 0) {
            ChangeTileColor(snakeHead, 'red')
            setEndGame(true)
          } else {
            PossibleMove(-1)
          }
        }
      }
      // right
      if (e === 'd' || e === 'arrowright') {
        if (previousMove !== 'a' && previousMove !== 'arrowleft') {
          setPreviousMove(e)

          if (GetColumnIndex(snakeHead + 1) < GetColumnIndex(snakeHead)) {
            ChangeTileColor(snakeHead, 'red')
            setEndGame(true)
          } else {
            PossibleMove(1)
          }
        }
      }
      // up
      if (e === 'w' || e === 'arrowup') {
        if (previousMove !== 's' && previousMove !== 'arrowdown') {
          setPreviousMove(e)

          if (snakeHead - columns < 0) {
            ChangeTileColor(snakeHead, 'red')
            setEndGame(true)
          } else {
            PossibleMove(-columns)
          }
        }
      }
      // down
      if (e === 's' || e === 'arrowdown') {
        if (previousMove !== 'w' && previousMove !== 'arrowup') {
          setPreviousMove(e)

          if (snakeHead + columns > columns * rows - 1) {
            ChangeTileColor(snakeHead, 'red')
            setEndGame(true)
          } else {
            PossibleMove(columns)
          }
        }
      }
    }
  }

  const GetColumnIndex = id => {
    return id % columns
  }

  const PossibleMove = shift => {
    snakeBody.unshift(snakeHead + shift)

    if (document.getElementById(snakeHead + shift).style.backgroundColor !== 'orange') {
      ChangeTileColor(snakeBody[snakeBody.length - 1], 'transparent')
      snakeBody.pop()
    } else {
      CreateFood()
    }

    if (document.getElementById(snakeHead + shift).style.backgroundColor === 'green') {
      ChangeTileColor(snakeHead + shift, 'red')
      setEndGame(true)
    } else {
      ChangeTileColor(snakeHead + shift, 'green')
      setSnakeHead(snakeHead + shift)
    }
  }

  /////borders gridky/////
  /////snake/////

  const CreateSnake = () => {
    let snakeHeadInit

    if ((rows * columns) % 2 === 0) {
      snakeHeadInit = Math.floor((rows * columns) / 2 - columns / 2)
      ChangeTileColor(snakeHeadInit, 'green')
    } else {
      snakeHeadInit = Math.floor((rows * columns - 1) / 2)
      ChangeTileColor(snakeHeadInit, 'green')
    }

    setSnakeHead(snakeHeadInit)

    snakeBody.push(snakeHeadInit)

    CreateFood()
  }

  // change color
  const ChangeTileColor = (id, color) => {
    document.getElementById(id).style.backgroundColor = color
  }
  /////food/////
  const CreateFood = () => {
    let newFood = Math.floor(Math.random() * (columns * rows))

    if (snakeBody.includes(newFood)) {
      if (columns * rows === snakeBody.length) {
        setEndGame(true)
        setGameWin(true)
      } else {
        CreateFood()
      }
    } else {
      ChangeTileColor(newFood, 'orange')
    }
  }

  // movement

  useEffect(() => {
    CreateSnake()
  }, [])

  return (
    <div css={s.snakeContainer}>
      <Global styles={theme.globalStyles} />
      <h1 css={s.header}>Snake</h1>
      <table css={s.playground}>
        <tbody>
          {grid.map((row, index) => (
            <tr key={index}>
              {row.map((tile, index) => (
                <td key={index}>{tile}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onKeyDown={CheckSubmit} css={s.button}>
        START
      </button>

      {windowWidth.current < mq.tablet ? (
        <div css={s.arrowContainer}>
          <div>
            <button css={s.arrowButton} onClick={() => CheckSubmit('w')}>
              🡹
            </button>
          </div>
          <div>
            <button css={s.arrowButton} onClick={() => CheckSubmit('a')}>
              🡸
            </button>
            <button css={s.arrowButton} onClick={() => CheckSubmit('s')}>
              🡻
            </button>
            <button css={s.arrowButton} onClick={() => CheckSubmit('d')}>
              🡺
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
