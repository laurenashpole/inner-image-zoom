'use client';

import { InView } from 'react-intersection-observer';

import Hero from '@/app/components/docs/Hero';
import Quickstart from '@/app/components/docs/Quickstart';
import { Box } from '@mantine/core';

import SidebarSection from '../shared/SidebarSection';

import Blocks from './Blocks';

const DocsView = ({ docs }) => (
  <>
    <Hero hero={docs.hero} />

    <SidebarSection
      navLinks={Object.keys(docs)
        .filter((key) => key !== 'hero')
        .map((key) => ({
          key: key,
          title: docs[key].title,
        }))}
    >
      {({ sectionRefs, onInView }) => (
        <>
          {docs.quickstart && (
            <InView
              onChange={(inView) => onInView(inView, 'quickstart')}
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
              onChange={(inView) => onInView(inView, 'installation')}
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
              onChange={(inView) => onInView(inView, 'usage')}
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
              onChange={(inView) => onInView(inView, 'props')}
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
        </>
      )}
    </SidebarSection>
  </>
);

export default DocsView;
