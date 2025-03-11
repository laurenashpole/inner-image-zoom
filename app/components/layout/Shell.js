'use client';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from './Header';
import Navbar from './Navbar';

import styles from './Shell.module.css';

const Shell = ({ children, activeLink }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 76 }}
      navbar={{
        width: '100%',
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      className={styles.root}
    >
      <AppShellHeader>
        <Header opened={opened} toggle={toggle} activeLink={activeLink} />
      </AppShellHeader>

      <AppShellNavbar p="lg" bd="none" aria-label="Main mobile">
        <Navbar activeLink={activeLink} />
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};

export default Shell;
