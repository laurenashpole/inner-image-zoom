'use client';

import { useEffect, useState } from 'react';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import InnerImageZoom from 'react-inner-image-zoom';
import { InView } from 'react-intersection-observer';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyLoad from 'vanilla-lazyload';

import {
  Anchor,
  Box,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';

import CodeHighlightTabs from '../shared/CodeHighlightTabs';
import SidebarSection from '../shared/SidebarSection';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import 'swiper/css';
import 'swiper/css/navigation';

const TABS = ['vanilla', 'vue'];

const DemosView = ({ demos }) => {
  const [activeTab, setActiveTab] = useState(0);

  const [activeTabName, setActiveTabName] = useSessionStorage({
    key: 'preferred-framework',
    defaultValue: 'vanilla',
  });

  useEffect(() => {
    setActiveTab(TABS.indexOf(activeTabName));
  }, [activeTabName]);

  useEffect(() => {
    new LazyLoad({
      elements_selector: '.iiz__img',
    });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTabName(TABS[tab]);
  };

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

              <Stack
                gap="xxl"
                pr={{
                  md: 'md',
                }}
              >
                <Stack gap="xs">
                  <Title order={2} fw={700}>
                    <a href={`#${demo.key}`}>{demo.title}</a>
                  </Title>

                  <Text maw={560}>{demo.desc}</Text>

                  {demo.links && (
                    <List
                      size="sm"
                      fw={600}
                      pt="0.125rem"
                      style={{ display: 'flex' }}
                    >
                      <ListItem fw={700}>
                        <Flex gap="xxs" align="center">
                          <AiOutlineCodeSandbox fontSize="1.25rem" />
                          CodeSandbox:
                        </Flex>
                      </ListItem>

                      {Object.keys(demo.links).map((key) => (
                        <ListItem key={key}>
                          <Anchor
                            href={demo.links[key]}
                            display="inline-flex"
                            opacity={0.6}
                            style={{
                              alignItems: 'center',
                            }}
                            target="_blank"
                          >
                            <Text size="sm" fw={600} ml="xs" tt="capitalize">
                              {key}
                            </Text>
                          </Anchor>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Stack>

                <Box
                  style={{
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  {demo.props && <InnerImageZoom {...demo.props} />}

                  {demo.swiperProps && (
                    <Swiper modules={[A11y, Navigation]} navigation loop>
                      {demo.swiperProps.map((prop, i) => (
                        <SwiperSlide key={i}>
                          <InnerImageZoom {...prop} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </Box>

                {demo.code && (
                  <CodeHighlightTabs
                    code={demo.code}
                    onTabChange={
                      demo.code.length === 1 ? undefined : handleTabChange
                    }
                    activeTab={demo.code.length === 1 ? 0 : activeTab}
                  />
                )}
              </Stack>
            </InView>
          ))}
        </>
      )}
    </SidebarSection>
  );
};

export default DemosView;
