/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect, useRef } from 'react'

import body from './images/body.png'
import food from './images/food.png'
import head from './images/head.png'
import redHead from './images/headRed.png'

import { HamburgerMenu } from './HamburgerMenu'
import { ResetButton } from './Reusable'

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
export const snakeStyles = {
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
    width: '100%',
    height: '100%',
    minWidth: '100%',
    minHeight: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }),
  playground: css({
    border: `2px solid ${theme.color.accentShadowDark}`,
    margin: theme.main.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    '& td': {
      width: theme.main.spacing.ml,
      height: theme.main.spacing.ml,
      padding: 0,
      verticalAlign: 'middle',
    },
  }),
  mainButton: css({
    width: theme.main.spacing.xl,
    height: theme.main.spacing.md,
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
    width: theme.main.spacing.ml,
    height: theme.main.spacing.ml,
    margin: theme.main.spacing.xs,
    cursor: 'pointer',
    borderRadius: theme.borderRadius.sm,
    transition: theme.effects.transition.backgroundTransform,
    backgroundColor: theme.color.primaryBackgroundEnd,
    color: theme.color.accentColor,
    ':hover': {
      backgroundColor: theme.color.accentShadowLight,
      transform: theme.effects.scale.sm,
    },
    ':active': {
      backgroundColor: theme.color.accentShadowMedium,
      transform: theme.effects.scale.md,
    },
  }),
  arrowContainer: css({
    marginTop: theme.main.spacing.xs,
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tabletBreakpoint = 850

  let newRow = [],
    newTile,
    tileIndex = 0

  if (init === true) {
    const CreateGrid = () => {
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
          newTile = (
            <button value={tileIndex} key={columnIndex} id={tileIndex} css={snakeStyles.cell}>
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

  const getHeadRotation = direction => {
    if (!direction) return 0

    switch (direction) {
      case 'right':
        return 90
      case 'down':
        return 180
      case 'left':
        return 270
      case 'up':
        return 0
      default:
        return 0
    }
  }

  // end game
  const CheckSubmit = e => {
    let key = e.key ? e.key.toLowerCase() : e.toLowerCase()

    if (!endGame) {
      let shift = 0
      let direction = null

      if (key === 'a' || key === 'arrowleft') {
        shift = -1
        direction = 'left'
      } else if (key === 'd' || key === 'arrowright') {
        shift = 1
        direction = 'right'
      } else if (key === 'w' || key === 'arrowup') {
        shift = -columns
        direction = 'up'
      } else if (key === 's' || key === 'arrowdown') {
        shift = columns
        direction = 'down'
      }

      if (shift !== 0) {
        const collision = CheckCollision(shift)
        if (collision) {
          SetTileImage(snakeHead, 'redHead', direction) // PRIDAJ direction!
          setEndGame(true)
        } else {
          PossibleMove(shift, direction) // PRIDAJ direction!
        }
      }
    }
  }

  const CheckCollision = shift => {
    const newHead = snakeHead + shift

    if (snakeBody.slice(1).includes(newHead)) return true

    if (
      newHead < 0 ||
      newHead >= columns * rows ||
      (shift === 1 && GetColumnIndex(newHead) === 0) ||
      (shift === -1 && GetColumnIndex(newHead) === columns - 1)
    )
      return true

    return false
  }

  const GetColumnIndex = id => {
    return id % columns
  }

  const PossibleMove = (shift, direction) => {
    const newHead = snakeHead + shift
    snakeBody.unshift(newHead)

    const tile = document.getElementById(newHead)
    const hasFood = tile && tile.querySelector('img[src*="food"]')

    if (!hasFood) {
      SetTileImage(snakeBody[snakeBody.length - 1], null)
      snakeBody.pop()
    } else {
      CreateFood()
    }

    SetTileImage(newHead, 'head', direction) // Tu už máš správne

    for (let i = 1; i < snakeBody.length; i++) {
      SetTileImage(snakeBody[i], 'body')
    }

    setSnakeHead(newHead)
  }

  /////snake/////

  const CreateSnake = () => {
    let snakeHeadInit

    if ((rows * columns) % 2 === 0) {
      snakeHeadInit = Math.floor((rows * columns) / 2 - columns / 2)
      SetTileImage(snakeHeadInit, 'head', 'up')
    } else {
      snakeHeadInit = Math.floor((rows * columns - 1) / 2)
      SetTileImage(snakeHeadInit, 'head', 'up')
    }

    setSnakeHead(snakeHeadInit)
    snakeBody.push(snakeHeadInit)
    CreateFood()
  }

  //images
  const SetTileImage = (id, type, direction = null) => {
    const tile = document.getElementById(id)
    if (!tile) return
    tile.style.backgroundColor = 'transparent'

    if (type === 'head') {
      const rotation = getHeadRotation(direction)
      tile.innerHTML = getImageHTML(head, 'head', `transform: rotate(${rotation}deg);`)
    } else if (type === 'body') {
      if (id === snakeBody[snakeBody.length - 1]) {
        tile.innerHTML = getImageHTML(body, 'body', 'width:75%;height:75%;margin:auto;')
      } else {
        tile.innerHTML = getImageHTML(body, 'body')
      }
    } else if (type === 'food') {
      tile.innerHTML = getImageHTML(food, 'food')
    } else if (type === 'redHead') {
      const rotation = getHeadRotation(direction)
      tile.innerHTML = getImageHTML(redHead, 'redHead', `transform: rotate(${rotation}deg);`)
    } else {
      tile.innerHTML = id
    }
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
      SetTileImage(newFood, 'food')
    }
  }

  // movement

  useEffect(() => {
    CreateSnake()
  }, [])

  return (
    <div css={snakeStyles.snakeContainer}>
      <HamburgerMenu />
      <Global styles={theme.globalStyles} />
      <h1 css={snakeStyles.header}>Snake</h1>
      <table css={snakeStyles.playground}>
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
      <button onKeyDown={CheckSubmit} css={snakeStyles.mainButton}>
        START
      </button>

      {windowWidth < tabletBreakpoint && (
        <div css={snakeStyles.arrowContainer}>
          <div>
            <button css={snakeStyles.arrowButton} onClick={() => CheckSubmit('w')}>
              🡹
            </button>
          </div>
          <div>
            <button css={snakeStyles.arrowButton} onClick={() => CheckSubmit('a')}>
              🡸
            </button>
            <button css={snakeStyles.arrowButton} onClick={() => CheckSubmit('s')}>
              🡻
            </button>
            <button css={snakeStyles.arrowButton} onClick={() => CheckSubmit('d')}>
              🡺
            </button>
          </div>
        </div>
      )}
      <ResetButton css={snakeStyles.mainButton} />
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////////
//LOCAL COMPONENTS
////////////////////////////////////////////////////////////////////////////////////
const getImageHTML = (src, alt, style = '') =>
  `<img src="${src}" alt="${alt}" style="width:100%;height:100%;object-fit:contain;display:block;${style}" />`
