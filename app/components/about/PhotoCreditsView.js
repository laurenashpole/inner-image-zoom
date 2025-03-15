import Image from 'next/image';

import {
  Anchor,
  Box,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
  Title,
} from '@mantine/core';

import Section from '../layout/Section';

const PhotoCreditsView = ({ credits }) => (
  <Section type="secondary" py="xxxxl">
    <Stack gap="xxl" maw="50rem">
      <Title order={1}>Photo Credits</Title>

      <Table variant="vertical" layout="fixed" withTableBorder>
        <TableTbody>
          {credits.map((credit) => (
            <TableTr key={credit.src}>
              <TableTh width={100}>
                <Box
                  pos="relative"
                  h={54}
                  w="100%"
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={credit.src}
                    width={credit.width}
                    height={credit.height}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate3d(-50%, -50%, 0)',
                    }}
                    alt=""
                  />
                </Box>
              </TableTh>

              <TableTd>
                Photo by{' '}
                <Anchor
                  fz="inherit"
                  fw={600}
                  href={`https://unsplash.com/@${credit.username}?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash`}
                >
                  {credit.name}
                </Anchor>{' '}
                on{' '}
                <Anchor
                  fz="inherit"
                  fw={600}
                  href={`${credit.url}?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash`}
                >
                  Unsplash
                </Anchor>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </Stack>
  </Section>
);

export default PhotoCreditsView;
