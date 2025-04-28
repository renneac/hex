/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState } from 'react'

import rock from './images/rock.png'
import paper from './images/paper.png'
import scissors from './images/scissors.png'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////

export const s = {
  buttonContainer: css({
    // @todo - refactoring "globální hodnota" viz. index.js
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // @todo - opět již opakující se stejná hodnota tedy .theme (formát bude tedy např.: myBg: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`)
    background: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`,
    color: theme.color.primaryText,
    fontFamily: "'Arial', sans-serif",
  }),
  button: css({
    backgroundColor: theme.color.accentColor,
    color: theme.color.primaryBackgroundStart,
    border: 'none',
    fontSize: theme.main.font.xl,
    margin: theme.main.spacing.sm,
    padding: `${theme.main.spacing.sm} ${theme.main.spacing.md}`,
    // @todo opět ideální hodnota pro .theme
    borderRadius: '10px',
    cursor: 'pointer',
    // @todo opět pravděpodobně .theme
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: theme.color.accentShadowLight,
      // @todo opět viz. index.js
      transform: 'scale(1.05)',
    },
  }),
  img: css({
    width: '100px',
    height: '100px',
    margin: theme.main.spacing.xs,
  }),
  imageP: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.main.spacing.md,
  }),
  scoreContainer: css({
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.main.spacing.md,
    fontSize: theme.main.font.lg,
    color: theme.color.primaryText,
  }),

  resultText: css({
    marginTop: theme.main.spacing.md,
    fontSize: theme.main.font.lg,
    color: theme.color.linkColor,
  }),
  roundCounter: css({
    marginTop: theme.main.spacing.sm,
    fontSize: theme.main.font.md,
    color: theme.color.primaryText,
  }),
  winnerMessage: css({
    marginTop: theme.main.spacing.md,
    fontSize: theme.main.font.xl,
    color: theme.color.accentColor,
    fontWeight: 'bold',
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

  return (
    <div css={s.buttonContainer}>
      <Global styles={theme.globalStyles} />

      {/* @todo butony se liší pouze v hodně pro ProceedTurn a title, tedy ideálně refactoring na lokální komponentu */}
      <button css={s.button} onClick={() => ProceedTurn(0)}>
        Kameň
      </button>
      <button css={s.button} onClick={() => ProceedTurn(1)}>
        Nožnice
      </button>
      <button css={s.button} onClick={() => ProceedTurn(2)}>
        Papier
      </button>

      <p css={s.roundCounter}>Aktualne kolo: {turns}</p>

      <div>
        {playerWins !== 3 && computerWins !== 3 ? (
          <div css={s.scoreContainer}>
            <span css={s.left}>Hráč</span>{' '}
            <span css={s.centerText}>
              {playerWins}:{computerWins}
            </span>
            <span css={s.right}>Počítač</span>
          </div>
        ) : playerWins !== 3 ? (
          <p css={s.winnerMessage}>Vyhral počítač.</p>
        ) : (
          <p css={s.winnerMessage}>Vyhral si.</p>
        )}
      </div>

      <p css={s.imageP}>
        <img css={s.img} src={optionsImages[userChoice]} /> <span> : </span>
        <img css={s.img} src={optionsImages[opponentChoice]} />
      </p>

      <p css={s.resultText}>{result}</p>
    </div>
  )
}
