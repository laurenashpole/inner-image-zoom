import { FaCaretDown } from 'react-icons/fa';

import { Button, Menu, MenuItem, MenuTarget, Text } from '@mantine/core';

import MenuDropdown from '../shared/MenuDropdown';
import NextLink from '../shared/NextLink';

const Versions = ({ versions }) => {
  const currentVersion = versions.filter((version) => version.current)[0];
  const previousVersions = versions.filter((version) => !version.current) || [];

  return (
    <Menu position="bottom-start">
      <MenuTarget>
        <Button
          size="compact-sm"
          w="auto"
          px="sm"
          radius="xl"
          rightSection={
            previousVersions.length ? <FaCaretDown size={14} /> : undefined
          }
          style={{
            background: 'var(--mantine-color-accent)',
            color: 'var(--mantine-color-body)',
            ...(!previousVersions.length && {
              pointerEvents: 'none',
            }),
          }}
          styles={{
            label: {
              transform: 'translateY(-1px)',
            },
          }}
        >
          <Text size="xs" fw={700}>
            {currentVersion && currentVersion.label}
          </Text>
        </Button>
      </MenuTarget>

      {!!previousVersions.length && (
        <MenuDropdown>
          {previousVersions.map((version) => (
            <MenuItem
              key={version.path}
              component={NextLink}
              href={version.path}
            >
              <Text size="xs" fw={700}>
                {version.label}
              </Text>
            </MenuItem>
          ))}
        </MenuDropdown>
      )}
    </Menu>
  );
};

export default Versions;
