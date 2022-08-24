const SRC = 'https://images.unsplash.com/photo-1609074405294-355851aead3e?fit=crop&q=80';

export const DATA = {
  src: `${SRC}&w=640`,
  src2x: `${SRC}&w=1280`,
  sources: [
    {
      srcSet: `${SRC}&w=750, ${SRC}&w=1500 2x`,
      media: '(min-width: 768px)'
    },
    {
      srcSet: `${SRC}&w=1000, ${SRC}&w=2000 2x`,
      media: '(min-width: 1024px)'
    }
  ]
};
