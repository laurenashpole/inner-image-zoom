import { MenuDivider as MantineMenuDivider } from '@mantine/core';

import styles from './MenuDivider.module.css';

const MenuDivider = ({ ...props }) => (
  <MantineMenuDivider className={styles.root} {...props} />
);

export default MenuDivider;
