import { forwardRef } from 'react';

import { Anchor } from '@mantine/core';

import NextLink from '../shared/NextLink';

import styles from './NavAnchor.module.css';

const NavAnchor = forwardRef(
  ({ label, activeLink, iconPosition, component, ...props }, ref) => (
    <span className={styles.root}>
      <Anchor
        fw={700}
        size="sm"
        lh="normal"
        tt="uppercase"
        lts="0.02em"
        underline="never"
        pos="relative"
        component={component || NextLink}
        data-active={
          typeof label === 'string' && activeLink === label.toLowerCase()
            ? true
            : undefined
        }
        data-icon-position={iconPosition || 'before'}
        ref={ref}
        {...props}
      >
        {label}
      </Anchor>
    </span>
  ),
);

NavAnchor.displayName = 'NavAnchor';

export default NavAnchor;
