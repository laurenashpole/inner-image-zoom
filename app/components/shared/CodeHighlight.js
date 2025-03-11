import { CodeHighlight as MantineCodeHighlight } from '@mantine/code-highlight';

import '@mantine/code-highlight/styles.css';
import styles from './CodeHighlight.module.css';

const CodeHighlight = ({ code, ...props }) => (
  <MantineCodeHighlight
    code={code}
    language="js"
    p="xxs"
    className={styles.root}
    {...props}
  />
);

export default CodeHighlight;
