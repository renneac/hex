/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState } from 'react'

import rock from './images/rock.png'
import paper from './images/paper.png'
import scissors from './images/scissors.png'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////

// @todo refactoring .theme

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
  body {
    background-color: #e3f2fd;
  }
  p {
    color: rgb(30, 229, 129);
  }
  button {
    background-color: #1976d2;
    color: #ffffff;
    border: none;
    font-size: 50px;
    margin: 10px;
    padding: 15px;
    border-radius: 10px;
  }
  button:hover {
    background-color: #0d47a1;
  }
`
export const s = {
  img: css({
    width: '100px',
    height: '100px',
  }),
  buttonContainer: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
  }),
  imageP: css({
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  scoreContainer: css({
    width: '500px',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  left: css({
    textAlign: 'left',
    flex: '1',
  }),
  right: css({
    textAlign: 'right',
    flex: '1',
  }),
  centerText: css({
    textAlign: 'center',
  }),
}

// @todo refactoring .theme - END

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export const RockPaperScissors = () => {
  const options = ['kameň', 'nožnice', 'papier']
  const optionsImages = [rock, scissors, paper]

  const [userChoice, setUserChoice] = useState()
  const [opponentChoice, setOpponentChoice] = useState()
  const [result, setResult] = useState()
  const [turns, setTurns] = useState(1)
  const [playerWins, setPlayerWins] = useState(0)
  const [computerWins, setComputerWins] = useState(0)

  const GetRandomInt = max => Math.floor(Math.random() * max)

  const ProceedTurn = option => {
    if (playerWins !== 3 && computerWins !== 3) {
      setUserChoice(option)
      const opponent = GetRandomInt(options.length)
      setOpponentChoice(opponent)

      if (option === opponent) {
        setResult('Remíza')
      } else if (option === opponent - 1 || (option === 2 && opponent === 0)) {
        setResult('Výhra')
        setPlayerWins(playerWins + 1)
      } else {
        setResult('Prehra')
        setComputerWins(computerWins + 1)
      }
      setTurns(turns + 1)
    }
  }

  //@todo - remove console.log
  console.log(rock)

  return (
    <div css={s.buttonContainer}>
      <Global styles={globalStyles} />
      <button onClick={() => ProceedTurn(0)}>Kameň</button>
      <button onClick={() => ProceedTurn(1)}>Nožnice</button>
      <button onClick={() => ProceedTurn(2)}>Papier</button>

      <p>Aktualne kolo: {turns}</p>

      <p>
        {playerWins !== 3 && computerWins !== 3 ? (
          // ? `Hráč ${playerWins} : ${computerWins} Počítač`
          <div css={s.scoreContainer}>
            <span css={s.left}>Hráč</span>{' '}
            <span css={s.centerText}>
              {playerWins}:{computerWins}
            </span>
            <span css={s.right}>Počítač</span>
          </div>
        ) : playerWins !== 3 ? (
          `Vyhral počítač.`
        ) : (
          `Vyhral si.`
        )}
      </p>

      <p css={s.imageP}>
        <img css={s.img} src={optionsImages[userChoice]} /> <span> : </span>
        <img css={s.img} src={optionsImages[opponentChoice]} />
      </p>

      {/* <p>
        Hráč zvolil: {options[userChoice]} {userChoice}
      </p>
      <p>
        Počítač zvolil: {options[opponentChoice]} {opponentChoice}
      </p> */}
      <p>{result}</p>
    </div>
  )
}
