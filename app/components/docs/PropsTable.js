import {
  Box,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';

import styles from './PropsTable.module.css';

const PropsTable = ({ props }) => {
  return (
    <Box
      style={{
        overflowX: 'auto',
      }}
      className={styles.root}
    >
      <Table layout="fixed" mb="sm">
        <TableThead>
          <TableTr>
            <TableTh
              w={{
                base: 175,
                sm: 200,
              }}
            >
              Name
            </TableTh>
            <TableTh w={150}>Type</TableTh>
            <TableTh w={125}>Default</TableTh>
            <TableTh
              w={{
                base: 300,
                sm: 'auto',
              }}
            >
              Description
            </TableTh>
          </TableTr>
        </TableThead>

        <TableTbody>
          {props &&
            props.map((prop) => (
              <TableTr key={prop.name}>
                <TableTd>{prop.name}</TableTd>
                <TableTd>{prop.type}</TableTd>
                <TableTd>{prop.default}</TableTd>
                <TableTd>{prop.desc}</TableTd>
              </TableTr>
            ))}
        </TableTbody>
      </Table>
    </Box>
  );
};

export default PropsTable;
