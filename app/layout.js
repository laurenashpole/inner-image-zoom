import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { GoogleAnalytics } from '@next/third-parties/google';

import { resolver } from './theme/createResolver';
import { theme } from './theme/createTheme';

import '@mantine/core/styles.css';
import './globals.css';

export const metadata = {
  title: 'Inner Image Zoom',
  description:
    'A lightweight package for magnifying an image within its original container.',
  metadataBase: new URL('https://www.innerimagezoom.com'),
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript />
      <link rel="stylesheet" href="https://use.typekit.net/thx0pbt.css" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      <link
        rel="apple-touch-icon"
        href="/favicon.svg"
        type="image/svg+xml"
        sizes="any"
      />
    </head>

    <body>
      <MantineProvider
        cssVariablesResolver={resolver}
        defaultColorScheme="auto"
        theme={theme}
      >
        {children}
      </MantineProvider>
    </body>

    <GoogleAnalytics gaId="G-EX4CT8KD61" />
  </html>
);

export default RootLayout;
