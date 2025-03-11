import { Burger as MantineBurger } from '@mantine/core';

import styles from './Burger.module.css';

const Burger = ({ opened, toggle }) => (
  <MantineBurger
    opened={opened}
    onClick={toggle}
    hiddenFrom="sm"
    size="md"
    ml={5}
    aria-label={`${opened ? 'Close' : 'Open'} menu`}
    className={styles.root}
  />
);

export default Burger;
