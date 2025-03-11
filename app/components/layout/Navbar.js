import { List, ListItem } from '@mantine/core';

import NavAnchor from './NavAnchor';

const Navbar = ({ activeLink }) => (
  <List listStyleType="none" tt="uppercase" spacing="xs">
    <ListItem>
      <NavAnchor
        label="Docs"
        activeLink={activeLink}
        iconPosition="after"
        component="span"
      />
    </ListItem>

    <ListItem>
      <NavAnchor
        label={<>&ndash;&nbsp;&nbsp;&nbsp;Vanilla</>}
        href="/docs/vanilla"
        activeLink={activeLink}
        iconPosition="after"
      />
    </ListItem>

    <ListItem>
      <NavAnchor
        label={<>&ndash;&nbsp;&nbsp;&nbsp;Vue</>}
        href="/docs/vue"
        activeLink={activeLink}
        iconPosition="after"
      />
    </ListItem>

    {/* Create demos page
    <ListItem>
      <NavAnchor
        label="Demos"
        href="/demos"
        activeLink={activeLink}
        iconPosition="after"
      />
    </ListItem> */}

    {/* TODO: Create support page */}
    <ListItem>
      <NavAnchor
        label="Support"
        href="https://github.com/laurenashpole/inner-image-zoom/issues"
        iconPosition="after"
      />
    </ListItem>
  </List>
);

export default Navbar;
