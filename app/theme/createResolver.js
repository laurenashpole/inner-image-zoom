'use client';

export const resolver = (theme) => ({
    variables: {
    },
    light: {
      '--mantine-color-anchor': theme.colors['dark'][6],
      '--mantine-color-body': theme.colors['light'][0],
      '--mantine-color-text': theme.colors['dark'][6],
      '--menu-item-hover': theme.colors['light'][0],
    },
    dark: {
      '--mantine-color-anchor': theme.colors['light'][1],
      '--mantine-color-text': theme.colors['light'][1],
    },
});
