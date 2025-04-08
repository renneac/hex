/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom'

import { RoutesList } from './Routes'
import ReactDOM from 'react-dom/client'

import { css, Global } from '@emotion/react'

//////////////////////////////////////////
//css
//////////////////////////////////////////

// @todo refactoring .theme

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
`

export const s = {
  mainBody: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #2e2e2e, #1a1a1a)',
    color: '#ffffff',
    fontFamily: "'Arial', sans-serif",
  }),
  heading: css({
    color: '#00ffcc',
    textShadow: `
        0 0 20px rgba(0, 255, 204, 0.8),
        0 0 30px rgba(0, 255, 204, 0.6),
        0 0 40px rgba(0, 255, 204, 0.4)
    `,
    fontSize: '4.5em',
  }),
  navList: css({
    listStyleType: 'none',
    textAlign: 'center',
  }),
  navLink: css({
    color: '#ffcc00',
    textDecoration: 'none',
    fontSize: '2em',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#ffff00',
      transform: 'scale(1.1)',
    },
  }),
}

// @todo refactoring .theme - END

// @todo refactoring .local (li + link)

export const App = () => {
  return (
    <div css={s.mainBody}>
      <Global styles={globalStyles} />
      <h1 css={s.heading}>Welcome!</h1>
      <nav>
        <ul css={s.navList}>
          <li>
            <Link to='/' css={s.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/rock-paper-scissors' css={s.navLink}>
              Rock Paper Scissors
            </Link>
          </li>
          <li>
            <Link to='/seal-breaker' css={s.navLink}>
              Seal Breaker
            </Link>
          </li>
          <li>
            <Link to='/tic-tac-toe' css={s.navLink}>
              Tic Tac Toe
            </Link>
          </li>
          <li>
            <Link to='/todoapp' css={s.navLink}>
              ToDoApp
            </Link>
          </li>
          <li>
            <Link to='/snake' css={s.navLink}>
              Snake
            </Link>
          </li>
          <li>
            <Link to='/checkers' css={s.navLink}>
              Checkers
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

// @todo refactoring .local (li + link) - END

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RoutesList />)
