'use client';

import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io';
import { IoLogoVue } from 'react-icons/io5';

import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';

import NextLink from '../shared/NextLink';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import styles from './Frameworks.module.css';

const Frameworks = () => {
  return (
    <Box className={styles.root}>
      <Container
        size="md"
        px="lg"
        py={{
          base: 'xxxl',
          sm: 'xxxxl',
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 3 }}
          spacing={{
            base: 'xl',
            sm: 'xl',
          }}
        >
          <Stack
            justify="space-between"
            p="24"
            style={{
              background: 'var(--mantine-color-accent)',
              borderRadius: '0.5rem',
            }}
            ta={{
              base: 'center',
              sm: 'left',
            }}
          >
            <Title order={3} size="" tt="uppercase" lts="0.02em">
              Available
              <br />
              frameworks
            </Title>

            <Box hiddenFrom="sm">
              <FaArrowDownLong />
            </Box>

            <Box visibleFrom="sm">
              <FaArrowRightLong />
            </Box>
          </Stack>

          <NextLink href="/docs/vanilla">
            <Center p="24" h="100%">
              <IoLogoJavascript size="4.5rem" aria-label="Vanilla Javascript" />
            </Center>
          </NextLink>

          <NextLink href="/docs/vue">
            <Center p="24" h="100%">
              <IoLogoVue size="4.5rem" aria-label="Vue" />
            </Center>
          </NextLink>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Frameworks;
