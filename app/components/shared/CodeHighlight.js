import { CodeHighlight as MantineCodeHighlight } from '@mantine/code-highlight';

import '@mantine/code-highlight/styles.css';
import styles from './CodeHighlight.module.css';

const CodeHighlight = ({ ...props }) => (
  <MantineCodeHighlight
    language="js"
    p="xxs"
    className={styles.root}
    {...props}
  />
);

export default CodeHighlight;
