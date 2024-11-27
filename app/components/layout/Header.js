import Link from 'next/link';
import {
  ActionIcon,
  Container,
  Group,
  Menu,
  MenuItem,
  MenuTarget,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core';
import { PiMoonStarsFill, PiSunFill } from "react-icons/pi";
import { IoLogoJavascript, IoLogoVue } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import NextLink from '../shared/NextLink';
import NavAnchor from './NavAnchor';
import MenuDivider from '../shared/MenuDivider';
import MenuDropdown from '../shared/MenuDropdown';
import Burger from './Burger';

const Header = ({ activeLink, ...burgerProps }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true
  });

  return (
    <Container py="md">
      <Group>
        {activeLink !== 'home' && (
          <Title order={1} size="xl" fs="italic">
            <Link href="/">
              Inner Image Zoom
            </Link>
          </Title>
        )}

        <Group gap={4} ml="auto">
          <Group
            gap="40"
            pr="lg"
            visibleFrom="sm" 
            component="nav"
            aria-label="Main desktop"
          >
            <Menu width={200} trigger="click-hover" openDelay={100} closeDelay={100}>
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
                  href="/docs/vanilla"
                  leftSection={<IoLogoJavascript size="1.5rem" />}
                >
                  <Stack gap={0} pl={4}>
                    <Text size="md" lh="normal">Vanilla</Text>
                    <Text size="sm" fw={700} lh="normal">1.0.0</Text>
                  </Stack>
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  component={NextLink}
                  href="/docs/vue"
                  leftSection={<IoLogoVue size="1.5rem" />}
                >
                  <Stack gap={0} pl={4}>
                    <Text size="md" lh="normal">Vue</Text>
                    <Text size="sm" fw={700} lh="normal">3.0.0</Text>
                  </Stack>
                </MenuItem>
              </MenuDropdown>
            </Menu>

            <NavAnchor label="Demos" href="/demos" activeLink={activeLink} />
            <NavAnchor label="Support" href="/support" activeLink={activeLink} />
          </Group>

          <ActionIcon
            variant="transparent"
            size="xl"
            c="inherit"
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
              c="inherit"
              onClick={() => toggleColorScheme()}
              aria-label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {colorScheme === 'light' ? <PiMoonStarsFill size="1.5rem" /> : <PiSunFill size="1.5rem" />}
            </ActionIcon>
          )}

          <Burger {...burgerProps} />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
