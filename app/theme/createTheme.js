'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'omnes-pro, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'omnes-pro, sans-serif',
    fontWeight: 800,
    fontStyle: 'italic',
  },
  colors: {
    'dark': [
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
    'light': [
      '#f2f9ff',
      "#e6f2fe",
      "#d9ecfe",
      "#cde5fd",
      "#c0dffd",
      "#b3d8fc",
      "#a7d2fc",
      "#9acbfb",
      "#8ec5fb",
      "#81befa",
    ],
  },
  components: {
    Text: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});
