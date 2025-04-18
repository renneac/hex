/** @jsxImportSource @emotion/react */
import * as theme from './theme'

import { Link } from 'react-router-dom'

import { RoutesList } from './Routes'
import ReactDOM from 'react-dom/client'

import { css, Global } from '@emotion/react'

////////////////////////////////////////////////////////////////////////////////////
//css
////////////////////////////////////////////////////////////////////////////////////

// @todo refactoring .theme

export const s = {
  mainBody: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${theme.color.primaryBackgroundStart}, ${theme.color.primaryBackgroundEnd})`,
    color: theme.color.primaryText,
    fontFamily: "'Arial', sans-serif",
  }),
  heading: css({
    color: theme.color.accentColor,
    textShadow: `
      0 0 20px ${theme.color.accentShadowLight},
      0 0 30px ${theme.color.accentShadowMedium},
      0 0 40px ${theme.color.accentShadowDark}
    `,
    fontSize: theme.main.font.xxxl,
  }),
  navList: css({
    listStyleType: 'none',
    textAlign: 'center',
  }),
  navLink: css({
    color: theme.color.linkColor,
    textDecoration: 'none',
    fontSize: theme.main.font.lg,
    transition: 'color 0.3s ease, transform 0.3s ease',
    display: 'block',
    marginBottom: theme.main.spacing.xs,
    '&:hover': {
      color: theme.color.linkHoverColor,
      transform: 'scale(1.1)',
    },
  }),
}

// @todo refactoring .theme - END

////////////////////////////////////////////////////////////////////////////////////
//MAIN
////////////////////////////////////////////////////////////////////////////////////

export const App = () => {
  return (
    <div css={s.mainBody}>
      <Global styles={theme.globalStyles} />
      <h1 css={s.heading}>Welcome!</h1>
      <nav>
        <ul css={s.navList}>
          <AppLink to='/home' title='Home' />
          <AppLink to='/rock-paper-scissors' title='Rock Paper Scissors' />
          <AppLink to='/seal-breaker' title='Seal Breaker' />
          <AppLink to='/tic-tac-toe' title='Tic Tac Toe' />
          <AppLink to='/todoapp' title='ToDoApp' />
          <AppLink to='/snake' title='Snake' />
          <AppLink to='/checkers' title='Checkers' />
        </ul>
      </nav>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RoutesList />)

////////////////////////////////////////////////////////////////////////////////////
//LOCAL COMPONENTS
////////////////////////////////////////////////////////////////////////////////////

const AppLink = ({ to, title }) => (
  <li>
    <Link to={to} css={s.navLink}>
      {title}
    </Link>
  </li>
)
