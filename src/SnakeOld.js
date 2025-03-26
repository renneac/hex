/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState, useEffect } from 'react'

//////////////////////////////////////////////////////////////////////////////
//// CSS
//////////////////////////////////////////////////////////////////////////////
const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
`

export const s = {
  cell: css({
    width: '50px',
    height: '50px',
    border: '1px solid black',
    backgroundColor: 'gray',
  }),
  empty: css({
    backgroundColor: 'gray',
  }),
  head: css({
    backgroundColor: '#0f0',
  }),
  body: css({
    backgroundColor: '#0a0',
  }),
  food: css({
    backgroundColor: 'orange',
  }),
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const Snake = () => {
  const rows = 2
  const columns = 2
  let grid = []
  let row = []
  let square
  let cellIndex = 1

  const CreateGrid = () => {
    let newGrid = []

    for (let i = 0; i < rows; i++) {
      for (let x = 0; x < columns; x++) {
        square = (
          <div id={cellIndex} css={[s.cell, s.empty]}>
            {cellIndex}
          </div>
        )
        row.push(square)
        cellIndex++
      }
      grid.push(row)
      row = []
    }

    return grid
  }

  //grid name
  //snake = head, body
  let getCenterId
  if ((rows * columns) % 2 !== 0) {
    getCenterId = Math.ceil((rows * columns) / 2)
  } else {
    getCenterId = Math.ceil((rows * columns) / 2) - rows / 2
  }
  const [gridCenter, setGridCenter] = useState(getCenterId)
  const [previousMove, setPreviousMove] = useState()
  const [foodPosition, setFoodPosition] = useState()
  const [isFoodEaten, setIsFoodEaten] = useState(false)

  const [snakeHead, setSnakeHead] = useState(
    JSON.parse(localStorage.getItem('headPosition'))
      ? JSON.parse(localStorage.getItem('headPosition'))
      : gridCenter
  )

  const CreateSnake = () => {
    setSnakeHead(gridCenter)
    localStorage.setItem('headPosition', JSON.stringify(gridCenter))
    const getCenterLocation = document.getElementById(gridCenter)
    getCenterLocation.style.backgroundColor = 'green'
  }

  //food

  const CreateFood = () => {
    if (!isFoodEaten) {
      let position = Math.floor(Math.random() * (rows * columns)) + 1

      if (position === snakeHead) {
        // CreateFood()
      } else {
        document.getElementById(position).style.backgroundColor = 'purple'
        console.log(`${snakeHead} ${position} ${isFoodEaten}`)
        setFoodPosition(position)
        setIsFoodEaten(true)
      }
    }
  }

  //movement
  const MoveUp = () => {
    console.log(isFoodEaten)
    if (snakeHead - columns < 1) {
      document.getElementById(snakeHead).style.backgroundColor = 'red'
    } else {
      setSnakeHead(snakeHead - columns)
      document.getElementById(snakeHead - columns).style.backgroundColor = 'orange'
      localStorage.setItem('headPosition', JSON.stringify(snakeHead - columns))
      document.getElementById(snakeHead).style.backgroundColor = 'gray'
      if (snakeHead - columns === foodPosition) {
        setIsFoodEaten(false)
      }
    }
  }

  const MoveDown = () => {
    console.log(isFoodEaten)
    if (snakeHead + columns > 64) {
      document.getElementById(snakeHead).style.backgroundColor = 'red'
    } else {
      setSnakeHead(snakeHead + columns)
      document.getElementById(snakeHead + columns).style.backgroundColor = 'orange'
      localStorage.setItem('headPosition', JSON.stringify(snakeHead + columns))
      document.getElementById(snakeHead).style.backgroundColor = 'gray'
      if (snakeHead + columns === foodPosition) {
        setIsFoodEaten(false)
      }
    }
  }

  const MoveRight = () => {
    console.log(isFoodEaten)
    if (snakeHead % columns === 0) {
      document.getElementById(snakeHead).style.backgroundColor = 'red'
    } else {
      setSnakeHead(snakeHead + 1)
      document.getElementById(snakeHead + 1).style.backgroundColor = 'orange'
      localStorage.setItem('headPosition', JSON.stringify(snakeHead + 1))
      document.getElementById(snakeHead).style.backgroundColor = 'gray'
      if (snakeHead + 1 === foodPosition) {
        setIsFoodEaten(false)
      }
    }
  }

  const MoveLeft = () => {
    console.log(isFoodEaten)
    if (snakeHead % columns === 1) {
      document.getElementById(snakeHead).style.backgroundColor = 'red'
    } else {
      setSnakeHead(snakeHead - 1)
      document.getElementById(snakeHead - 1).style.backgroundColor = 'orange'
      localStorage.setItem('headPosition', JSON.stringify(snakeHead - 1))
      document.getElementById(snakeHead).style.backgroundColor = 'gray'
      if (snakeHead - 1 === foodPosition) {
        setIsFoodEaten(false)
      }
    }
  }

  const CheckSubmit = e => {
    const input = e.key.toLowerCase()

    if (
      (input === 'w' || input === 'arrowup') &&
      previousMove !== 'arrowdown' &&
      previousMove !== 's'
    ) {
      MoveUp()
      setPreviousMove(input)
    } else if (
      (input === 's' || input === 'arrowdown') &&
      previousMove !== 'arrowup' &&
      previousMove !== 'w'
    ) {
      MoveDown()
      setPreviousMove(input)
    } else if (
      (input === 'd' || input === 'arrowright') &&
      previousMove !== 'arrowleft' &&
      previousMove !== 'a'
    ) {
      MoveRight()
      setPreviousMove(input)
    } else if (
      (input === 'a' || input === 'arrowleft') &&
      previousMove !== 'arrowright' &&
      previousMove !== 'd'
    ) {
      MoveLeft()
      setPreviousMove(input)
    }
  }

  //score

  CreateGrid()

  //4 tahy
  //   const [currentGrid, setCurrentGrid] = useState([''])
  //   const [endGame, setEndGame] = useState(false)

  //   const ProceedTurn = index => {

  //       let newGridState = []
  //       for (let x = 0; x < 9; x++) {
  //         newGridState.push(document.getElementById(x + 1).innerHTML)
  //         setCurrentGrid(newGridState)
  //       }
  //     }

  useEffect(() => {
    CreateSnake()
    CreateFood()
  }, [])
  useEffect(() => {
    CreateFood()
  }, [isFoodEaten])

  return (
    <div>
      <button onKeyDown={CheckSubmit}>xXx</button>
      <table>
        <Global styles={globalStyles} />
        <tbody>
          {grid.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index} css={s.cell} onClick={event => ProceedTurn(event.target.value)}>
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
