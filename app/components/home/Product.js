'use client';

import { BsImageAlt } from 'react-icons/bs';
import { FiMove } from 'react-icons/fi';
import { HiCursorClick } from 'react-icons/hi';
import { LuLibrary } from 'react-icons/lu';
import { InnerImageZoom } from 'react-inner-image-zoom';

import {
  Box,
  Button,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';

import Section from '../layout/Section';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import styles from './Product.module.css';

const Product = () => {
  return (
    <Section
      className={styles.root}
      py={{
        base: 'xxxl',
        sm: 'xxxxl',
        md: 'xxxxxl',
      }}
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{
          base: 'xxl',
          md: 'xxxl',
        }}
        style={{
          alignItems: 'flex-start',
        }}
      >
        <Box
          style={{
            borderRadius: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <InnerImageZoom
            src="/home-pdp.jpg"
            zoomScale={0.5}
            width={1200}
            height={1200}
            imgAttributes={{
              alt: 'Example zoom photo of a sideboard and photo wall',
            }}
          />
        </Box>

        <Stack
          mr={{
            sm: 'calc(var(--mantine-spacing-xxl) - var(--mantine-spacing-lg))',
            md: 'calc(var(--mantine-spacing-xxxl) - var(--mantine-spacing-lg))',
          }}
        >
          <Title order={2} size="h1">
            Perfect for product pages
          </Title>

          <Title order={3} fs="italic">
            $0
          </Title>

          <Button
            size="xl"
            my="lg"
            color="green"
            component="a"
            href="https://github.com/laurenashpole/inner-image-zoom"
            fz="md"
          >
            View on GitHub
          </Button>

          <Title order={3} size="" tt="uppercase">
            Details
          </Title>

          <List spacing="md">
            <ListItem
              icon={
                <HiCursorClick
                  style={{
                    width: '1rem',
                    height: '1rem',
                    marginRight: '0.5rem',
                  }}
                />
              }
            >
              Zoom on click or hover
            </ListItem>

            <ListItem
              icon={
                <FiMove
                  style={{
                    width: '1rem',
                    height: '1rem',
                    marginRight: '0.5rem',
                  }}
                />
              }
            >
              Move by dragging on touch devices and dragging or panning on hover
              on non-touch devices
            </ListItem>

            <ListItem
              icon={
                <BsImageAlt
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    marginRight: '0.5rem',
                  }}
                />
              }
            >
              Supports responsive images
            </ListItem>

            <ListItem
              icon={
                <LuLibrary
                  style={{
                    width: '1rem',
                    height: '1rem',
                    marginRight: '0.5rem',
                  }}
                />
              }
            >
              Can be used with popular libraries like Swiper and React Lazy Load
            </ListItem>
          </List>
        </Stack>
      </SimpleGrid>
    </Section>
  );
};

export default Product;
