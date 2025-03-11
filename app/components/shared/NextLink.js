import { forwardRef } from 'react';
import Link from 'next/link';

const NextLink = forwardRef(({ href, ...props }, ref) => (
  <Link href={href} ref={ref} {...props} />
));

NextLink.displayName = 'NextLink';

export default NextLink;
