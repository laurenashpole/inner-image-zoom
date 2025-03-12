import {
  ActionIcon,
  Anchor,
  Flex,
  List,
  ListItem,
  SimpleGrid,
} from '@mantine/core';

import NextLink from '../shared/NextLink';

import Section from './Section';

const Footer = () => {
  return (
    <Section
      bg="dark.9"
      style={{
        borderTop: '1px solid var(--app-shell-border-color)',
      }}
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{
          base: 'xxl',
          md: 'xxxl',
        }}
      >
        <List size="md">
          <ListItem>
            <Anchor
              component={NextLink}
              href="/docs/vanilla"
              c="light.1"
              size="sm"
              fw={600}
            >
              Vanilla Docs
            </Anchor>
          </ListItem>

          <ListItem>
            <Anchor
              component={NextLink}
              href="/docs/vue"
              c="light.1"
              size="sm"
              fw={600}
            >
              Vue Docs
            </Anchor>
          </ListItem>

          <ListItem>
            <Anchor
              component={NextLink}
              href="/demos"
              c="light.1"
              size="sm"
              fw={600}
            >
              Demos
            </Anchor>
          </ListItem>

          <ListItem>
            <Anchor
              href="https://github.com/laurenashpole/inner-image-zoom/issues"
              c="light.1"
              size="sm"
              fw={600}
            >
              Support
            </Anchor>
          </ListItem>

          <ListItem>
            <Anchor
              component={NextLink}
              href="/about/photo-credits"
              c="light.1"
              size="sm"
              fw={600}
            >
              Photo Credits
            </Anchor>
          </ListItem>
        </List>

        <Flex
          justify={{
            base: 'flex-start',
            sm: 'flex-end',
          }}
          align="flex-end"
        >
          <ActionIcon
            color="green"
            size="4rem"
            radius="xl"
            p="sm"
            component="a"
            href="https://laurenashpole.com"
          >
            <svg aria-hidden="true" viewBox="0 0 106 49">
              <path
                d="M56.35 1.5c-1.7.7-4.6 3.15-6.4 5.4-4.15 5.15-9 6.75-15.8 5.1-10.6-2.6-10.8-2.6-9 .1 1.85 2.85 6.8 4.75 12.3 4.85l4 .05-5.95 6-5.95 6h-6.3C12.55 29 1 36.25 1 42.95c0 7.95 9.7 6.95 21.9-2.35 2.95-2.25 5.95-4.55 6.7-5.05 2.1-1.55 22.65 4.9 28.6 9 7.3 5 17.7 4.45 24-1.25 1.65-1.5 1.95-1.45 3.9.3 3.25 2.95 15 2.75 18.1-.35 3-3 1.2-5.2-2.7-3.4-6.3 2.85-14.5.35-14.5-4.4 0-3.85-2.7-3-7.85 2.55-5.85 6.3-9.4 7.45-15.05 4.95-5.4-2.45-5.25-2.85 2.65-6.95C73.95 32.3 85 22.45 85 19.75c0-1.75-4.15-5.05-7.8-6.2-5.2-1.6-21.1 9.45-24.7 17.2-1 2.05-1.9 3.9-2.05 4.1C50 35.35 36 30.7 36 30.05c0-.7 12.35-12.9 19.75-19.6 7.1-6.35 7.45-11.85.6-8.95zm21.5 16.8c2.8 3.4-9.05 13.9-19 16.75-4.25 1.2-3.65-.9 1.9-7.1 7.5-8.35 14.75-12.45 17.1-9.65zm-53.9 15.45c0 .9-7.05 6.25-12.2 9.25-6.25 3.65-6.5-.1-.35-5.7 4.5-4 12.7-6.35 12.55-3.55z"
                fill="currentColor"
              ></path>
            </svg>
          </ActionIcon>
        </Flex>
      </SimpleGrid>
    </Section>
  );
};

export default Footer;
