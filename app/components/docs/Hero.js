'use client';

import { FaCaretDown } from 'react-icons/fa';

import {
  Anchor,
  Box,
  Button,
  Group,
  List,
  ListItem,
  Menu,
  MenuItem,
  MenuTarget,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import Section from '../layout/Section';
import MenuDropdown from '../shared/MenuDropdown';
import NextLink from '../shared/NextLink';

const Hero = ({ hero }) => (
  <Section
    style={{
      borderBottom: '1px solid var(--app-shell-border-color)',
    }}
  >
    <Stack pb="md" gap="xxl">
      <Stack align="flex-start" gap="xs">
        <Title order={1}>{hero.title}</Title>

        <Menu position="bottom-start">
          <MenuTarget>
            <Button
              size="compact-sm"
              w="auto"
              px="sm"
              radius="xl"
              rightSection={
                hero.versions.length > 1 ? <FaCaretDown size={14} /> : undefined
              }
              style={{
                background: 'var(--mantine-color-accent)',
                color: 'var(--mantine-color-body)',
                ...(hero.versions.length === 1 && {
                  pointerEvents: 'none',
                }),
              }}
            >
              <Text size="xs" fw={700}>
                {hero.versions[0].label}
              </Text>
            </Button>
          </MenuTarget>

          {hero.versions.length > 1 && (
            <MenuDropdown>
              {hero.versions.slice(1).map((version) => (
                <MenuItem
                  key={version.path}
                  component={NextLink}
                  href={version.path}
                >
                  <Text size="xs" fw={700}>
                    {version.label}
                  </Text>
                </MenuItem>
              ))}
            </MenuDropdown>
          )}
        </Menu>
      </Stack>

      {!!hero.links.length && (
        <List size="sm" listStyleType="none" fw={600}>
          {hero.links.map((link) => (
            <ListItem key={link.title} lh="xl">
              <Group>
                <Box
                  opacity={0.6}
                  miw={{
                    base: 90,
                    sm: 110,
                  }}
                >
                  {link.title}
                </Box>

                <Anchor
                  href={link.href}
                  display="inline-flex"
                  style={{
                    alignItems: 'center',
                  }}
                >
                  {link.icon}

                  <Text size="sm" fw={600} ml="xs">
                    {link.label}
                  </Text>
                </Anchor>
              </Group>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  </Section>
);

export default Hero;
