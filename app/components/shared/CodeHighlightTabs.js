import { CodeHighlightTabs as MantineCodeHighlightTabs } from '@mantine/code-highlight';

import '@mantine/code-highlight/styles.css';
import styles from './CodeHighlight.module.css';

const CodeHighlightTabs = ({ ...props }) => (
  <MantineCodeHighlightTabs
    language="js"
    pb="xs"
    className={styles.root}
    {...props}
  />
);

export default CodeHighlightTabs;
