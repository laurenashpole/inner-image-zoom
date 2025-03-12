'use client';

import { useRef, useState } from 'react';

import Section from '@/app/components/layout/Section';
import { Group, Stack } from '@mantine/core';

import NavLink from './NavLink';

const SidebarSection = ({ children, navLinks, visibleFrom = 'md' }) => {
  const sectionRefs = useRef({});
  const [inViewSection, setInViewSection] = useState('');

  const handleInView = (inView, section) => {
    inView && setInViewSection(section);
  };

  return (
    <Section type="secondary" py="xxxxl">
      <Group wrap="nowrap" align="flex-start" gap="xxl">
        <Stack gap="xxxl" w="100%" miw="0">
          {children({
            sectionRefs,
            onInView: handleInView,
          })}
        </Stack>

        <Stack
          miw={240}
          gap={0}
          visibleFrom={visibleFrom}
          pos="sticky"
          top={76 + 32}
        >
          {navLinks &&
            navLinks.map((link) => (
              <NavLink
                key={link.key}
                label={link.title}
                active={inViewSection === link.key}
                href={`#${link.key}`}
              />
            ))}
        </Stack>
      </Group>
    </Section>
  );
};

export default SidebarSection;
