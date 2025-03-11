import { Code as MantineCode } from '@mantine/core';

import styles from './Code.module.css';

const Code = ({ children, ...props }) => (
  <MantineCode className={styles.root} {...props}>
    {children}
  </MantineCode>
);

export default Code;
