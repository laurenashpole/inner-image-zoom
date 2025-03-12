import { IoMdHeartEmpty } from 'react-icons/io';

import { Button, Stack, Text, Title } from '@mantine/core';

import Section from './Section';

import styles from './Subfooter.module.css';

const Subfooter = () => {
  return (
    <Section
      style={{
        borderTop: '1px solid var(--app-shell-border-color)',
      }}
      py={{
        base: 'xxxl',
        sm: 'xxxxxl',
      }}
      className={styles.root}
    >
      <Stack gap="xxl" ta="center" align="center">
        <Stack gap="xs">
          <Title order={2} size="h1">
            Be the first to sponsor this project
          </Title>

          <Text size="lg">And have your logo featured here</Text>
        </Stack>

        <Button
          size="xl"
          px="xl"
          color="dark"
          component="a"
          href="https://github.com/sponsors/laurenashpole"
          fz="md"
          tt="capitalize"
          leftSection={<IoMdHeartEmpty size="1.5rem" />}
          variant="outline"
        >
          Sponsor
        </Button>
      </Stack>
    </Section>
  );
};

export default Subfooter;
