import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import "./globals.css";
import { theme } from './theme/createTheme';
import { resolver } from './theme/createResolver';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="stylesheet" href="https://use.typekit.net/thx0pbt.css" />
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
    </html>
  );
};

export default RootLayout;
