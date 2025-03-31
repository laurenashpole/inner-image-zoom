import { FaArrowDownLong, FaArrowRightLong, FaReact } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io';
import { IoLogoVue } from 'react-icons/io5';

import {
  Box,
  Center,
  Container,
  Grid,
  GridCol,
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
        px={{ base: 'lg', sm: 'xl' }}
        py={{
          base: 'xxxl',
          sm: 'xxxxl',
        }}
      >
        <Grid
          gutter={{
            base: 'xl',
            sm: 'lg',
          }}
          columns={14}
        >
          <GridCol span="auto">
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
          </GridCol>

          <GridCol span={3}>
            <NextLink href="/docs/react">
              <Center p="24" h="100%">
                <FaReact size="4.5rem" aria-label="React" />
              </Center>
            </NextLink>
          </GridCol>

          <GridCol span={3}>
            <NextLink href="/docs/vanilla">
              <Center p="24" h="100%">
                <IoLogoJavascript
                  size="4.5rem"
                  aria-label="Vanilla JavaScript"
                />
              </Center>
            </NextLink>
          </GridCol>

          <GridCol span={3}>
            <NextLink href="/docs/vue">
              <Center p="24" h="100%">
                <IoLogoVue size="4.5rem" aria-label="Vue" />
              </Center>
            </NextLink>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
};

export default Frameworks;
