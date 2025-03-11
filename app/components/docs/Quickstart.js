import { BsFillLightningFill } from 'react-icons/bs';

import { Blockquote, Text, Timeline, TimelineItem, Title } from '@mantine/core';

import Code from '../shared/Code';

import styles from './Quickstart.module.css';

const Quickstart = ({ quickstart }) => (
  <Blockquote
    icon={<BsFillLightningFill />}
    radius="md"
    className={styles.blockquote}
  >
    <Title order={2} fw={700} mb="xl">
      <a href="#quickstart">{quickstart.title}</a>
    </Title>

    <Timeline active={4} bulletSize={24} lineWidth={1} color="green" pb="xs">
      {quickstart.items &&
        quickstart.items.map((item, i) => (
          <TimelineItem
            key={item.label}
            title={
              <Text fw={700} size="sm" tt="uppercase" lh="1" lts="0.02em">
                {item.label}
              </Text>
            }
            bullet={
              <Text size="xs" fw={700}>
                {i + 1}
              </Text>
            }
            className={styles.item}
          >
            <Code>{item.code}</Code>
          </TimelineItem>
        ))}
    </Timeline>
  </Blockquote>
);

Quickstart.displayName = 'Quickstart';

export default Quickstart;
