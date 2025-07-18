/** @jsxImportSource @emotion/react */
import * as theme from './theme'
import { css, Global } from '@emotion/react'
import ReactDOM from 'react-dom/client'

import { useState } from 'react'

import rock from './images/rock.png'
import paper from './images/paper.png'
import scissors from './images/scissors.png'

import { HamburgerMenu } from './HamburgerMenu'
import { ResetButton } from './Reusable'

////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////

export const s = {
  buttonContainer: css({
    height: theme.layout.fullScreenHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.background.primaryBackground,
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
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    transition: theme.effects.transition.backgroundTransform,
    '&:hover': {
      backgroundColor: theme.color.accentShadowLight,
      trensform: theme.effects.scale.sm,
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
      <HamburgerMenu />
      <Global styles={theme.globalStyles} />

      <PlayButton name='Kameň' option={0} onClick={ProceedTurn} />
      <PlayButton name='Nožnice' option={1} onClick={ProceedTurn} />
      <PlayButton name='Papier' option={2} onClick={ProceedTurn} />

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
      <ResetButton />
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////////
//LOCAL COMPONENTS
////////////////////////////////////////////////////////////////////////////////////

const PlayButton = ({ name, option, onClick }) => (
  <button css={s.button} onClick={() => onClick(option)}>
    {name}
  </button>
)
