'use client';

import { InnerImageZoom } from 'react-inner-image-zoom';

import { Box, Center, Container, Stack, Title } from '@mantine/core';

import PlusIcon from '../shared/PlusIcon';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const Hero = () => {
  return (
    <Container
      size="lg"
      px="lg"
      pt="calc(20rem - 76px)"
      pb="20rem"
      pos="relative"
      my="4rem"
    >
      <Center>
        <Stack pos="relative" style={{ zIndex: 1 }}>
          <Title
            order={1}
            fs="italic"
            fz={{
              base: '3rem',
              sm: '4.5rem',
              md: '6rem',
            }}
            ta="center"
          >
            Inner Image Zoom
          </Title>

          <Title order={2} ta="center" maw="600" mx="auto" fw={800}>
            A lightweight package for magnifying an image within its original
            container.
          </Title>

          {[...Array(4).keys()].map((i) => (
            <Box
              key={i}
              fz={{
                base: '2.5rem',
                md: '3.5rem',
                ...(i === 0 && {
                  base: '3.25rem',
                  md: '4.25rem',
                }),
                ...(i === 3 && {
                  base: '1.75rem',
                  md: '2.75rem',
                }),
              }}
              style={{
                position: 'absolute',
                ...(i === 0 && {
                  top: 'calc(100% - 0.5rem)',
                  left: '5%',
                  color: 'var(--mantine-color-pink-2)',
                }),
                ...(i === 1 && {
                  top: 'calc(100% + 3rem)',
                  left: '17.5%',
                  color: '#FF9A66',
                }),
                ...(i === 2 && {
                  bottom: '100%',
                  right: '10%',
                  color: 'var(--mantine-color-pink-4)',
                }),
                ...(i === 3 && {
                  bottom: 'calc(100% + 3rem)',
                  right: '25%',
                  color: 'var(--mantine-color-green-4)',
                }),
              }}
            >
              <PlusIcon size="1em" />
            </Box>
          ))}
        </Stack>

        <Box
          style={{
            position: 'absolute',
            top: '0.25rem',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transform: 'rotate(-10deg)',
          }}
          w={{
            base: 277,
            sm: 332,
          }}
          right={{
            base: 'calc(50% - 3rem)',
            sm: 'auto',
          }}
          left={{
            base: 'auto',
            sm: '2.5rem',
          }}
        >
          <InnerImageZoom
            src="/home-hero-1.jpg"
            zoomScale={0.5}
            width={332}
            height={249}
            imgAttributes={{
              alt: 'Example zoom photo of floral arrangement',
            }}
          />
        </Box>

        <Box
          style={{
            position: 'absolute',
            top: '0.5rem',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transform: 'rotate(10deg)',
          }}
          w={{
            base: 167,
            sm: 200,
          }}
          left={{
            base: 'calc(50% + 3rem)',
            sm: '23.25rem',
          }}
        >
          <InnerImageZoom
            src="/home-hero-2.jpg"
            zoomScale={0.5}
            width={200}
            height={200}
            imgAttributes={{
              alt: 'Example zoom photo of a restaurant table',
            }}
          />
        </Box>

        <Box
          style={{
            position: 'absolute',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transform: 'rotate(10deg) translateY(-50%)',
          }}
          w={{
            base: 200,
            sm: 240,
          }}
          bottom={{
            base: '-3rem',
            sm: '-4rem',
          }}
          right={{
            base: 'auto',
            sm: '4.25rem',
          }}
          left={{
            base: 'calc(50% - 1rem)',
            sm: 'auto',
          }}
        >
          <InnerImageZoom
            src="/home-hero-4.jpg"
            zoomScale={0.5}
            width={240}
            height={240}
            imgAttributes={{
              alt: 'Example zoom photo of a mens folded shirt',
            }}
          />
        </Box>

        <Box
          style={{
            position: 'absolute',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transform: 'rotate(-10deg) translateY(-50%)',
          }}
          w={{
            base: 200,
            sm: 240,
          }}
          bottom={{
            base: '-5rem',
            sm: '-6rem',
          }}
          right={{
            base: 'calc(50% - 2rem)',
            sm: '18rem',
          }}
        >
          <InnerImageZoom
            src="/home-hero-3.jpg"
            zoomScale={0.5}
            width={240}
            height={240}
            imgAttributes={{
              alt: 'Example zoom photo of three bikes',
            }}
          />
        </Box>
      </Center>
    </Container>
  );
};

export default Hero;
