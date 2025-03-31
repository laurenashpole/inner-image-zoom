import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoVue } from 'react-icons/io5';
import { PiMoonStarsFill, PiSunFill } from 'react-icons/pi';
import { RiReactjsLine } from 'react-icons/ri';

import {
  ActionIcon,
  Container,
  Group,
  Menu,
  MenuItem,
  MenuTarget,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

import MenuDivider from '../shared/MenuDivider';
import MenuDropdown from '../shared/MenuDropdown';
import NextLink from '../shared/NextLink';

import Burger from './Burger';
import NavAnchor from './NavAnchor';

import styles from './Header.module.css';

const Header = ({ activeLink, ...burgerProps }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Container
      size="lg"
      px={{ base: 'lg', sm: 'xl' }}
      py="md"
      className={styles.root}
    >
      <Group>
        {activeLink !== 'home' && (
          <Link href="/">
            <Text size="xl" fw="800" fs="italic">
              Inner Image Zoom
            </Text>
          </Link>
        )}

        <Group
          gap="xxs"
          ml="auto"
          mr={{
            base: -4,
            sm: 0,
          }}
        >
          <Group
            gap={40}
            pr="lg"
            visibleFrom="sm"
            component="nav"
            aria-label="Main desktop"
          >
            <Menu>
              <MenuTarget>
                <NavAnchor
                  label="Docs"
                  activeLink={activeLink}
                  component="button"
                />
              </MenuTarget>

              <MenuDropdown>
                <MenuItem
                  component={NextLink}
                  href="/docs/react"
                  leftSection={<RiReactjsLine size="1.5rem" />}
                >
                  <Stack gap={0} pl="xxs">
                    <Text size="sm" lh="normal">
                      React
                    </Text>

                    <Text size="xs" fw={700} lh="normal">
                      3.1.0
                    </Text>
                  </Stack>
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  component={NextLink}
                  href="/docs/vanilla"
                  leftSection={<IoLogoJavascript size="1.5rem" />}
                >
                  <Stack gap={0} pl="xxs">
                    <Text size="sm" lh="normal">
                      Vanilla
                    </Text>

                    <Text size="xs" fw={700} lh="normal">
                      1.0.1
                    </Text>
                  </Stack>
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  component={NextLink}
                  href="/docs/vue"
                  leftSection={<IoLogoVue size="1.5rem" />}
                >
                  <Stack gap={0} pl="xxs">
                    <Text size="sm" lh="normal">
                      Vue
                    </Text>

                    <Text size="xs" fw={700} lh="normal">
                      3.0.1
                    </Text>
                  </Stack>
                </MenuItem>
              </MenuDropdown>
            </Menu>

            <NavAnchor label="Demos" href="/demos" activeLink={activeLink} />

            {/* TODO: Create support page */}
            <NavAnchor
              label="Support"
              href="https://github.com/laurenashpole/inner-image-zoom/issues"
            />
          </Group>

          <ActionIcon
            variant="transparent"
            size="xl"
            component="a"
            href="https://github.com/laurenashpole/inner-image-zoom"
            aria-label="Open GitHub"
          >
            <FaGithub size="1.5rem" />
          </ActionIcon>

          {colorScheme && (
            <ActionIcon
              variant="transparent"
              size="xl"
              onClick={() => toggleColorScheme()}
              aria-label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {colorScheme === 'light' ? (
                <PiMoonStarsFill size="1.5rem" />
              ) : (
                <PiSunFill size="1.5rem" />
              )}
            </ActionIcon>
          )}

          <Burger {...burgerProps} />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
