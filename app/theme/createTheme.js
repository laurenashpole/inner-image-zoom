'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'omnes-pro, sans-serif',
  fontFamilyMonospace: 'Menlo, Monaco, Courier, monospace',
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(19),
    lg: rem(21),
    xl: rem(23),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.7',
  },
  headings: {
    fontFamily: 'omnes-pro, sans-serif',
    sizes: {
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 800,
      },
    },
  },
  colors: {
    dark: [
      '#6a6f8b',
      '#5e6482',
      '#53597a',
      '#474e71',
      '#3c4368',
      '#30385f',
      '#252d56',
      '#171f45',
      '#141b3e',
      '#121836',
    ],
    light: [
      '#f2f9ff',
      '#e6f2fe',
      '#d9ecfe',
      '#cde5fd',
      '#c0dffd',
      '#b3d8fc',
      '#a7d2fc',
      '#9acbfb',
      '#8ec5fb',
      '#81befa',
    ],
    green: [
      '#e7fcf1',
      '#d9f2e5',
      '#b7e2cb',
      '#91d1b0',
      '#72c398',
      '#5dba89',
      '#51b681',
      '#40a06e',
      '#348e61',
      '#237b51',
    ],
    pink: [
      '#ffe9ed',
      '#ffd3d8',
      '#f7a5ae',
      '#ef7582',
      '#e94b5c',
      '#e63144',
      '#e52237',
      '#cc132a',
      '#b70a24',
      '#a0001d',
    ],
  },
  spacing: {
    xxs: rem(4),
    xxl: rem(48),
    xxxl: rem(64),
    xxxxl: rem(80),
    xxxxxl: rem(96),
  },
  components: {
    Button: {
      defaultProps: {
        size: 'xl',
        tt: 'uppercase',
        fz: 'lg',
        lts: '0.02em',
        pb: 2,
      },
    },
    Menu: {
      defaultProps: {
        width: 200,
        trigger: 'click-hover',
      },
    },
    Table: {
      defaultProps: {
        verticalSpacing: 'sm',
        style: {
          fontSize: '1.0625rem',
        },
      },
    },
    Text: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});
