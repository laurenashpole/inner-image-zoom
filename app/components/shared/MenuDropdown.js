import { MenuDropdown as MantineMenuDropdown } from '@mantine/core';

import styles from './MenuDropdown.module.css';

const MenuDropdown = ({ children, ...props }) => (
  <MantineMenuDropdown
    style={{ borderRadius: 8 }}
    className={styles.root}
    {...props}
  >
    {children}
  </MantineMenuDropdown>
);

export default MenuDropdown;
