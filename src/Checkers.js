/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

import whitePawn from './images/pawnWhite.png'
import blackPawn from './images/pawnBlack.png'

const firstPlayer = 'white'
const secondPlayer = 'black'
const possibleMove = 'orange'
const activeTile = 'green'
const killMove = 'blue'
const wrongMoveKill = 'red'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////
export const s = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.layout.fullScreenHeight,
    background: theme.background.primaryBackground,
    color: theme.color.primaryText,
  }),
  heading: css({
    color: theme.color.accentColor,
    textShadow: theme.effects.textShadow,
    fontSize: theme.main.font.xl,
    marginBottom: theme.main.spacing.md,
    letterSpacing: theme.main.spacing.xxs,
  }),
  blackButton: css({
    background: theme.color.primaryBackgroundStart,
    color: theme.color.primaryText,
    borderRadius: theme.borderRadius.sm,
  }),
  whiteButton: css({
    background: theme.color.primaryText,
    color: theme.color.primaryBackgroundStart,
    borderRadius: theme.borderRadius.sm,
  }),
  cell: css({
    width: '40px',
    height: '40px',
    display: 'inline-block',
  }),
  img: css({
    width: '90%',
    height: '90%',
    paddingTop: '5%',
  }),
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export const Checkers = () => {
  const [init, setInit] = useState(true)

  /////gridka
  const [grid, setGrid] = useState([])
  const [rows, setRows] = useState(8)
  const [columns, setColumns] = useState(8)

  const [activeFirstPlayer, setActiveFirstPlayer] = useState(true)

  const [activeSelect, setActiveSelect] = useState(false)

  const [activeMove, setActiveMove] = useState(false)

  const [endGame, setEndGame] = useState(false)

  const [previousSelect, setPreviousSelect] = useState()

  const [selectedLeftTile, setSelectedLeftTile] = useState('')

  const [selectedRightTile, setSelectedRightTile] = useState('')

  const SetUnitColor = rowIndex => {
    let newUnit

    newUnit = rowIndex < 2 ? firstPlayer : '' || rowIndex > 5 ? secondPlayer : ''

    return newUnit
  }

  let newRow = [],
    newTile,
    tileIndex = 0

  if (init === true) {
    const CreateGrid = () => {
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
          const isEven = (rowIndex + columnIndex) % 2 === 0
          const buttonColor = isEven ? s.whiteButton : s.blackButton

          const unitColor = SetUnitColor(rowIndex)
          let imgUrl
          if (unitColor === firstPlayer) {
            imgUrl = whitePawn
          } else if (unitColor === secondPlayer) {
            imgUrl = blackPawn
          }

          newTile = (
            <button value={tileIndex} key={columnIndex} id={tileIndex} css={[s.cell, buttonColor]}>
              {isEven && imgUrl !== undefined ? (
                <img src={imgUrl} id={tileIndex} css={s.img}></img>
              ) : (
                ''
              )}
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

  const GetRowIndex = id => {
    return Math.floor(id / rows)
  }

  const GetColumnIndex = id => {
    return id % columns
  }

  const CheckTile = (id, shift) => {
    let direction = activeFirstPlayer ? 1 : -1

    let isTile = GetColumnIndex(id) + shift + (GetRowIndex(id) + direction) * columns

    return isTile
  }

  const ChangeTileColor = (id, color, isPossibleMove = true, moveDirection = '') => {
    if (isPossibleMove) {
      document.getElementById(Number(id)).style.backgroundColor = color
    } else {
      moveDirection = moveDirection === 'left' ? -1 : moveDirection === 'right' ? 1 : ''

      let moveShift = (activeFirstPlayer ? columns : -columns) + moveDirection

      if (id + moveShift >= 0 && id + moveShift < columns * rows) {
        if (document.getElementById(Number(id + moveShift)).innerHTML === '') {
          if (
            !document
              .getElementById(Number(id))
              .outerHTML.toLowerCase()
              .includes(activeFirstPlayer ? firstPlayer : secondPlayer)
          ) {
            if (
              GetRowIndex(id) + 1 === GetRowIndex(id + moveShift) ||
              GetRowIndex(id) - 1 === GetRowIndex(id + moveShift)
            ) {
              document.getElementById(Number(id + moveShift)).style.backgroundColor = killMove
            }
          }
        }
      }
    }
  }

  const Deselect = (unitID, leftTileID, rightTileID) => {
    ChangeTileColor(unitID, firstPlayer)

    if (GetColumnIndex(unitID) !== 0) {
      ChangeTileColor(leftTileID, firstPlayer)
    }

    if (GetColumnIndex(unitID) !== 7) {
      ChangeTileColor(rightTileID, firstPlayer)
    }

    let checkLeftJump = activeFirstPlayer ? columns * 2 - 2 : -(columns * 2 - 2)
    let checkRightJump = activeFirstPlayer ? columns * 2 + 2 : -(columns * 2 + 2)

    if (Number(unitID) + checkLeftJump >= 0 && Number(unitID) + checkLeftJump < columns * rows) {
      if (
        document.getElementById(Number(unitID) + checkLeftJump).style.backgroundColor === killMove
      ) {
        ChangeTileColor(Number(unitID) + checkLeftJump, firstPlayer)
      }
    }
    if (Number(unitID) + checkRightJump >= 0 && Number(unitID) + checkRightJump < columns * rows) {
      if (
        document.getElementById(Number(unitID) + checkRightJump).style.backgroundColor === killMove
      ) {
        ChangeTileColor(Number(unitID) + checkRightJump, firstPlayer)
      }
    }
  }

  const Move = e => {
    if (e.style.backgroundColor === possibleMove || e.style.backgroundColor === killMove) {
      document.getElementById(previousSelect).innerHTML = ''
      if (GetColumnIndex(e.id) < GetColumnIndex(selectedLeftTile)) {
        document.getElementById(selectedLeftTile).innerHTML = ''
      } else {
        document.getElementById(selectedRightTile).innerHTML = ''
      }

      e.innerHTML = `<img src=${activeFirstPlayer ? whitePawn : blackPawn} id=${
        e.id
      } style="width:90%;
      height:90%;
      paddingTop:5%"></img>`

      setActiveMove(false)
      setActiveSelect(false)

      setActiveFirstPlayer(!activeFirstPlayer)

      Deselect(previousSelect, selectedLeftTile, selectedRightTile)
    }
  }

  const Select = e => {
    if (!endGame) {
      if (e.outerHTML.toLowerCase().includes(activeFirstPlayer ? firstPlayer : secondPlayer)) {
        let isLefTile = CheckTile(e.id, -1)
        let isRightTile = CheckTile(e.id, 1)

        if (!activeSelect) {
          setSelectedLeftTile(isLefTile)
          setSelectedRightTile(isRightTile)
        }

        let isPossibleLeftMove = document.getElementById(isLefTile).innerHTML === ''
        let isPossibleRightMove = document.getElementById(isRightTile).innerHTM === ''

        if (!activeSelect) {
          setPreviousSelect(e.id)

          setActiveSelect(true)

          setActiveMove(true)

          ChangeTileColor(e.id, activeTile)

          if (GetColumnIndex(e.id) !== 0) {
            if (document.getElementById(isLefTile).innerHTML !== '') {
              ChangeTileColor(isLefTile, wrongMoveKill)
              ChangeTileColor(isLefTile, killMove, isPossibleLeftMove, 'left')
            } else {
              ChangeTileColor(isLefTile, possibleMove)
            }
          }
          if (GetColumnIndex(e.id) !== 7) {
            if (document.getElementById(isRightTile).innerHTML !== '') {
              ChangeTileColor(isRightTile, wrongMoveKill)
              ChangeTileColor(isRightTile, killMove, isPossibleRightMove, 'right')
            } else {
              ChangeTileColor(isRightTile, possibleMove)
            }
          }
        }
        if (previousSelect === e.id) {
          Deselect(previousSelect, isLefTile, isRightTile)

          setPreviousSelect('')

          setActiveSelect(false)

          setActiveMove(false)
        }
      }

      if (activeMove) {
        Move(e)
      }
    }
  }

  return (
    <div css={s.container}>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <h1 css={s.heading}>
        CHECKERS
        <span css={s.cell}>
          <img src={activeFirstPlayer ? whitePawn : blackPawn} alt='pawn' css={s.img} />
        </span>
      </h1>
      <table>
        <tbody>
          {grid.map((row, index) => (
            <tr key={index}>
              {row.map((tile, index) => (
                <td key={index} onClick={e => Select(e.target)}>
                  {tile}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
