import { NavLink as MantineNavLink } from '@mantine/core';

import styles from './NavLink.module.css';

const NavLink = ({ active, ...props }) => (
  <MantineNavLink
    px="xl"
    className={styles.root}
    fw={600}
    active={active}
    {...props}
  />
);

export default NavLink;
