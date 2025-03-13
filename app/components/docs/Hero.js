import {
  Anchor,
  Box,
  Group,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import Section from '../layout/Section';

import Versions from './Versions';

const Hero = ({ hero }) => (
  <Section
    style={{
      borderBottom: '1px solid var(--app-shell-border-color)',
    }}
  >
    <Stack pb="md" gap="xxl">
      <Stack align="flex-start" gap="xs">
        <Title order={1}>{hero.title}</Title>

        <Versions versions={hero.versions} />
      </Stack>

      {!!hero.links.length && (
        <List size="sm" fw={600}>
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
