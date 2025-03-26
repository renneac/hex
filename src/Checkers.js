/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

import whitePawn from './images/pawnWhite.png'
import blackPawn from './images/pawnBlack.png'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////
export const s = {
  blackButton: css({
    backgroundColor: 'black',
    color: 'white',
  }),
  whiteButton: css({
    backgroundColor: 'white',
  }),
  cell: css({
    width: '40px',
    height: '40px',
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

    newUnit = rowIndex < 2 ? 'white' : '' || rowIndex > 5 ? 'black' : ''

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
          if (unitColor === 'white') {
            imgUrl = whitePawn
          } else if (unitColor === 'black') {
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
              .includes(activeFirstPlayer ? 'white' : 'black')
          ) {
            if (
              GetRowIndex(id) + 1 === GetRowIndex(id + moveShift) ||
              GetRowIndex(id) - 1 === GetRowIndex(id + moveShift)
            ) {
              document.getElementById(Number(id + moveShift)).style.backgroundColor = 'blue'
            }
          }
        }
      }
    }
  }

  const Deselect = (unitID, leftTileID, rightTileID) => {
    ChangeTileColor(unitID, 'white')

    if (GetColumnIndex(unitID) !== 0) {
      ChangeTileColor(leftTileID, 'white')
    }

    if (GetColumnIndex(unitID) !== 7) {
      ChangeTileColor(rightTileID, 'white')
    }

    let checkLeftJump = activeFirstPlayer ? columns * 2 - 2 : -(columns * 2 - 2)
    let checkRightJump = activeFirstPlayer ? columns * 2 + 2 : -(columns * 2 + 2)

    if (Number(unitID) + checkLeftJump >= 0 && Number(unitID) + checkLeftJump < columns * rows) {
      if (
        document.getElementById(Number(unitID) + checkLeftJump).style.backgroundColor === 'blue'
      ) {
        ChangeTileColor(Number(unitID) + checkLeftJump, 'white')
      }
    }
    if (Number(unitID) + checkRightJump >= 0 && Number(unitID) + checkRightJump < columns * rows) {
      if (
        document.getElementById(Number(unitID) + checkRightJump).style.backgroundColor === 'blue'
      ) {
        ChangeTileColor(Number(unitID) + checkRightJump, 'white')
      }
    }
  }

  const Move = e => {
    if (e.style.backgroundColor === 'orange' || e.style.backgroundColor === 'blue') {
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
      if (e.outerHTML.toLowerCase().includes(activeFirstPlayer ? 'white' : 'black')) {
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

          ChangeTileColor(e.id, 'green')

          if (GetColumnIndex(e.id) !== 0) {
            if (document.getElementById(isLefTile).innerHTML !== '') {
              ChangeTileColor(isLefTile, 'red')
              ChangeTileColor(isLefTile, 'blue', isPossibleLeftMove, 'left')
            } else {
              ChangeTileColor(isLefTile, 'orange')
            }
          }
          if (GetColumnIndex(e.id) !== 7) {
            if (document.getElementById(isRightTile).innerHTML !== '') {
              ChangeTileColor(isRightTile, 'red')
              ChangeTileColor(isRightTile, 'blue', isPossibleRightMove, 'right')
            } else {
              ChangeTileColor(isRightTile, 'orange')
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
    <div>
      <h1>Ahoj ♟️</h1>
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
