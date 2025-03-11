import { Box, Container } from '@mantine/core';

import styles from './Section.module.css';

const Section = ({ children, type, ...props }) => {
  return (
    <Box
      py="xxxl"
      className={type === 'secondary' ? styles.root : undefined}
      {...props}
    >
      <Container size="lg" px={{ base: 'lg', sm: 'xl' }}>
        {children}
      </Container>
    </Box>
  );
};

export default Section;
