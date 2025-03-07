import { SRC } from './src';
import { SRC2X } from './src2x';

export const DATA = {
  className: 'custom',
  invalidSources: [
    {
      srcSet: `${SRC}, ${SRC2X} 2x`,
      media: '(min-width: 768px)'
    },
    {
      media: '(min-width: 1024px)'
    }
  ],
  sources: [
    {
      srcSet: `${SRC}, ${SRC2X} 2x`,
      media: '(min-width: 768px)'
    },
    {
      srcSet: `${SRC}, ${SRC2X} 2x`,
      media: '(min-width: 1024px)'
    }
  ],
  src: SRC,
  src2x: SRC2X
};
