/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import * as theme from './theme'

const hamburgerStyle = css({
  position: 'fixed',
  top: 20,
  left: 20,
  width: 40,
  height: 40,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1001,
})

const barStyle = css({
  width: 30,
  height: 3,
  background: theme.color.primaryText,
  margin: '4px 0',
  borderRadius: 2,
  transition: '0.3s',
})

const dropdownStyle = css({
  position: 'fixed',
  top: 65,
  left: 20,
  background: theme.background.primaryBackground,
  border: `1px solid ${theme.color.linkColor}`,
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  zIndex: 1002,
  padding: 0,
  minWidth: 180,
})

const linkStyle = css({
  display: 'block',
  padding: '12px 24px',
  color: theme.color.linkColor,
  textDecoration: 'none',
  fontSize: theme.main.font.lg,
  '&:hover': {
    background: theme.color.linkHoverColor,
    color: theme.color.primaryBackground,
  },
})

const routes = [
  { path: '/', title: 'Home' },
  { path: '/rock-paper-scissors', title: 'Rock Paper Scissors' },
  { path: '/seal-breaker', title: 'Seal Breaker' },
  { path: '/tic-tac-toe', title: 'Tic Tac Toe' },
  { path: '/todoapp', title: 'ToDoApp' },
  { path: '/snake', title: 'Snake' },
  { path: '/checkers', title: 'Checkers' },
]

export function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={menuRef}>
      <button css={hamburgerStyle} onClick={() => setOpen(o => !o)} aria-label='menu'>
        <div css={barStyle}></div>
        <div css={barStyle}></div>
        <div css={barStyle}></div>
      </button>
      {open && (
        <nav css={dropdownStyle}>
          {routes.map(route => (
            <Link key={route.path} to={route.path} css={linkStyle} onClick={() => setOpen(false)}>
              {route.title}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
