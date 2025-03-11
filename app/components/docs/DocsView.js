'use client';

import { Fragment, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';

import Hero from '@/app/components/docs/Hero';
import Quickstart from '@/app/components/docs/Quickstart';
import Section from '@/app/components/layout/Section';
import { Box, Group, Stack } from '@mantine/core';

import NavLink from '../shared/NavLink';

import Blocks from './Blocks';

const DocsView = ({ docs }) => {
  const sectionRefs = useRef({});
  const [inViewSection, setInViewSection] = useState('');

  const handleInView = (inView, section) => {
    inView && setInViewSection(section);
  };

  return (
    <>
      <Hero hero={docs.hero} />

      <Section type="secondary" py="xxxxl">
        <Group wrap="nowrap" align="flex-start" gap="xxl">
          <Stack gap="xxxl" w="100%">
            {docs.quickstart && (
              <InView
                onChange={(inView) => handleInView(inView, 'quickstart')}
                rootMargin="-50%"
              >
                <Box
                  id="quickstart"
                  ref={(el) => (sectionRefs.current.quickstart = el)}
                  style={{
                    transform: 'translateY(-108px)',
                  }}
                />

                <Quickstart quickstart={docs.quickstart} />
              </InView>
            )}

            {docs.installation && (
              <InView
                onChange={(inView) => handleInView(inView, 'installation')}
                rootMargin="-50%"
              >
                <Box
                  id="installation"
                  ref={(el) => (sectionRefs.current.installation = el)}
                  style={{
                    transform: 'translateY(-108px)',
                  }}
                />

                <Blocks id="installation" blocks={docs.installation} />
              </InView>
            )}

            {docs.usage && (
              <InView
                onChange={(inView) => handleInView(inView, 'usage')}
                rootMargin="-50%"
              >
                <Box
                  id="usage"
                  ref={(el) => (sectionRefs.current.usage = el)}
                  style={{
                    transform: 'translateY(-108px)',
                  }}
                />

                <Blocks id="usage" blocks={docs.usage} />
              </InView>
            )}

            {docs.props && (
              <InView
                onChange={(inView) => handleInView(inView, 'props')}
                rootMargin="-50%"
              >
                <Box
                  id="props"
                  ref={(el) => (sectionRefs.current.props = el)}
                  style={{
                    transform: 'translateY(-108px)',
                  }}
                />

                <Blocks id="props" blocks={docs.props} />
              </InView>
            )}
          </Stack>

          <Stack
            miw={240}
            gap={0}
            display={{ base: 'none', md: 'block' }}
            pos="sticky"
            top={76 + 32}
          >
            {Object.keys(docs).map((key) => (
              <Fragment key={key}>
                {key !== 'hero' && (
                  <NavLink
                    label={docs[key].title}
                    active={inViewSection === key}
                    href={`#${key}`}
                  />
                )}
              </Fragment>
            ))}
          </Stack>
        </Group>
      </Section>
    </>
  );
};

export default DocsView;
