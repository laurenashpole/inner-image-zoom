'use client';

import { useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import LazyLoad from 'vanilla-lazyload';

import { Box, Title } from '@mantine/core';

import SidebarSection from '../shared/SidebarSection';

import DemosDemo from './DemosDemo';

import 'react-inner-image-zoom/lib/styles.min.css';

import 'swiper/css';
import 'swiper/css/navigation';

const DemosView = ({ demos }) => {
  useEffect(() => {
    new LazyLoad({
      elements_selector: '.iiz__img',
    });
  }, []);

  return (
    <SidebarSection navLinks={demos.demos} visibleFrom="sm">
      {({ sectionRefs, onInView }) => (
        <>
          <Title order={1} mb="-1.5rem">
            Demos
          </Title>

          {demos.demos.map((demo) => (
            <InView
              key={demo.key}
              onChange={(inView) => onInView(inView, demo.key)}
              rootMargin="-50%"
            >
              <Box
                id={demo.key}
                ref={(el) => (sectionRefs.current.usage = el)}
                style={{
                  transform: 'translateY(-108px)',
                }}
              />

              <DemosDemo demo={demo} />
            </InView>
          ))}
        </>
      )}
    </SidebarSection>
  );
};

export default DemosView;
