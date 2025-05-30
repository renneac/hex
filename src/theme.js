import { css, Global } from '@emotion/react'

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
  }
`

export const responsiveSize = {
  font: {
    xs: 0.65, //rem
    sm: 0.85, //rem
    md: 1, //rem
    lg: 2, //rem
    xl: 2.5, //rem
    xxl: 4, //rem
    xxxl: 4.5, //rem
  },
  spacing: {
    xxs: 0.3, //rem
    xs: 0.5, //rem
    sm: 1, //rem
    md: 2, //rem
    ml: 2.5, // rem
    lg: 4, //rem
    xl: 6, //rem
    xxl: 8, //rem
  },
}

export const main = {
  font: {
    xs: `${responsiveSize.font.xs}rem`,
    sm: `${responsiveSize.font.sm}rem`,
    md: `${responsiveSize.font.md}rem`,
    lg: `${responsiveSize.font.lg}rem`,
    xl: `${responsiveSize.font.xl}rem`,
    xxl: `${responsiveSize.font.xxl}rem`,
    xxxl: `${responsiveSize.font.xxxl}rem`,
  },
  spacing: {
    xxs: `${responsiveSize.spacing.xxs}rem`,
    xs: `${responsiveSize.spacing.xs}rem`,
    sm: `${responsiveSize.spacing.sm}rem`,
    md: `${responsiveSize.spacing.md}rem`,
    ml: `${responsiveSize.spacing.ml}rem`,
    lg: `${responsiveSize.spacing.lg}rem`,
    xl: `${responsiveSize.spacing.xl}rem`,
    xxl: `${responsiveSize.spacing.xxl}rem`,
  },
}

export const color = {
  // Pozadie hlavného obsahu
  primaryBackgroundStart: '#2e2e2e',
  primaryBackgroundEnd: '#1a1a1a',
  primaryText: '#ffffff',

  // Výrazná farba pre nadpisy alebo dôležité prvky
  accentColor: '#00ffcc',
  accentShadowLight: 'rgba(0, 255, 204, 0.8)',
  accentShadowMedium: 'rgba(0, 255, 204, 0.6)',
  accentShadowDark: 'rgba(0, 255, 204, 0.4)',

  // Farba pre odkazy
  linkColor: '#ffcc00',
  linkHoverColor: '#ffff00',
}

export const background = {
  primaryBackground: `linear-gradient(135deg, ${color.primaryBackgroundStart}, ${color.primaryBackgroundEnd})`,
}

export const layout = {
  fullScreenHeight: '100vh',
}

export const effects = {
  textShadow: `
      0 0 20px ${color.accentShadowLight},
      0 0 30px ${color.accentShadowMedium},
      0 0 40px ${color.accentShadowDark}
    `,
  scale: {
    sm: 'scale(1.05)',
    md: 'scale(1.1)',
    lg: 'scale(1.15)',
  },
  transition: {
    colorTransform: 'color 0.3s ease, transform 0.3s ease',
    backgroundTransform: 'background-color 0.3s ease, transform 0.3s ease',
    backgroundAndColor: 'background-color 0.3s, color 0.3s',
    default: '0.3s',
  },
}

export const borderRadius = {
  xs: '3px',
  sm: '5px',
  md: '10px',
  lg: '20px',
}
