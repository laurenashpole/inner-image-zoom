import { Fragment } from 'react';

import { Stack, Text, Title } from '@mantine/core';

import CodeHighlight from '../shared/CodeHighlight';

import PropsTable from './PropsTable';

const Blocks = ({ id, blocks }) => {
  return (
    <Stack gap="xl">
      <Title order={2} fw={700}>
        <a href={`#${id}`}>{blocks.title}</a>
      </Title>

      <Stack gap="lg">
        {blocks.items &&
          blocks.items.map((item, i) => (
            <Fragment key={i}>
              {item.type === 'heading' && (
                <Title order={3}>{item.content}</Title>
              )}

              {item.type === 'text' && <Text>{item.content}</Text>}

              {item.type === 'code' && (
                <CodeHighlight code={item.content} language="js" />
              )}

              {item.type === 'table' && <PropsTable props={item.content} />}
            </Fragment>
          ))}
      </Stack>
    </Stack>
  );
};

export default Blocks;
