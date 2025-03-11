'use client';

export const resolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-body': theme.colors['light'][0],
    '--mantine-color-text': theme.colors['dark'][6],
    '--mantine-color-accent': 'var(--mantine-color-pink-4)',
    '--mantine-color-anchor': 'var(--mantine-color-text)',
    '--menu-item-hover': 'var(--mantine-color-body)',
  },
  dark: {
    '--mantine-color-text': theme.colors['light'][1],
    '--mantine-color-accent': 'var(--mantine-color-pink-2)',
    '--mantine-color-anchor': 'var(--mantine-color-text)',
  },
});
