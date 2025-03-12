import { IoLogoJavascript, IoLogoVue } from 'react-icons/io5';

import Code from '@/app/components/shared/Code';
import { Anchor } from '@mantine/core';

export const DATA = {
  demos: [
    {
      title: 'Basic',
      key: 'basic',
      desc: 'Simplest use case with only the src set.',
      props: {
        src: 'demo-1.jpg',
        imgAttributes: {
          alt: 'Demo photo of stacked, patterned bowls',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom();\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom src="/path/to/image.jpg" />`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'With Loading Spacer',
      key: 'withLoadingSpacer',
      desc: 'Creates a loading spacer, based on an aspect ratio generated by the width and height, to prevent cumulative layout shift.',
      props: {
        src: 'demo-2.jpg',
        zoomSrc: 'demo-2-large.jpg',
        width: 780,
        height: 520,
        hasSpacer: true,
        imgAttributes: {
          alt: 'Demo photo of a clothing store interior',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  width: 750,\n  height: 500,\n  hasSpacer: true\n});\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" data-zoom-src="/path/to/zoom-image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  :width="750"\n  :height="500"\n  :hasSpacer="true"\n/>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'Drag to Move',
      key: 'dragToMove',
      desc: 'Drag to explore the zoomed image on both touch and non-touch devices.',
      props: {
        src: 'demo-3.jpg',
        zoomSrc: 'demo-3-large.jpg',
        moveType: 'drag',
        imgAttributes: {
          alt: 'Demo photo of a jigsaw puzzle',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  moveType: 'drag'\n});\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" data-zoom-src="/path/to/zoom-image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  moveType="drag"\n/>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'Zoom on Hover',
      key: 'zoomOnHover',
      desc: 'Trigger the image zoom on hover on non-touch devices.',
      props: {
        src: 'demo-4.jpg',
        zoomSrc: 'demo-4-large.jpg',
        zoomType: 'hover',
        imgAttributes: {
          alt: 'Demo photo of breakfast foods',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  zoomType: 'hover'\n});\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" data-zoom-src="/path/to/zoom-image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  zoomType="hover"\n/>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'Fullscreen on Mobile',
      key: 'fullscreenOnMobile',
      desc: 'The zoomed image appears in a fullscreen modal on touch devices below a specified breakpoint.',
      props: {
        src: 'demo-5.jpg',
        zoomSrc: 'demo-5-large.jpg',
        fullScreenOnMobile: true,
        imgAttributes: {
          alt: 'Demo photo of shower products',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  fullscreenOnMobile: true\n});\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" data-zoom-src="/path/to/zoom-image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  :fullscreenOnMobile="true"\n/>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'No Mobile Close Button',
      key: 'noMobileCloseButton',
      desc: 'Hide the close button on touch devices.',
      props: {
        src: 'demo-6.jpg',
        zoomSrc: 'demo-6-large.jpg',
        hideCloseButton: true,
        imgAttributes: {
          alt: 'Demo photo of a Le Creuset pot and carrots',
        },
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  hideCloseButton: true\n});\n\n...\n\n<img class="iiz" src="/path/to/image.jpg" data-zoom-src="/path/to/zoom-image.jpg" />`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  :hideCloseButton="true"\n/>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    {
      title: 'Responsive Images',
      key: 'responsiveImages',
      desc: 'Loads responsive images based on screen size. Accepts default srcset and sources (with srcset, media, type).',
      props: {
        src: 'demo-7.jpg',
        zoomSrc: 'demo-7-large.jpg',
        imgAttributes: {
          alt: 'Demo photo of incense and essential oils on a table',
          srcSet: 'demo-7-400.jpg, demo-7-800.jpg 2x',
        },
        sources: [
          {
            srcSet: 'demo-7-800.jpg, demo-7-1600.jpg 2x',
            media: '(min-width: 440px)',
          },
        ],
      },
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom();\n\n...\n\n<picture class="iiz" data-zoom-src="/path/to/zoom-image.jpg">\n  <source\n    srcset="/path/to/large-image.jpg, /path/to/large-image-2x.jpg 2x"\n    media="(min-width: 500px)"\n  />\n  <img\n    srcset="/path/to/small-image.jpg, /path/to/small-image-2x.jpg 2x"\n    src="/path/to/image.jpg"\n  />\n</picture>`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<inner-image-zoom\n  src="/path/to/image.jpg"\n  zoomSrc="/path/to/zoom-image.jpg"\n  :imgAttributes="{\n    srcSet: '/path/to/small-image.jpg, /path/to/small-image-2x.jpg 2x'\n  }"\n  :sources="[{\n    srcSet='/path/to/large-image.jpg, /path/to/large-image-2x.jpg 2x',\n    media: '(min-width: 768px)'\n  }]"\n>`,
          language: 'js',
          icon: <IoLogoVue size="1rem" />,
        },
      ],
    },
    // {
    //   title: 'With Lazy Load',
    //   key: 'withLazyLoad',
    //   desc: (
    //     <>
    //       Lazy loads the image to improve page speed. This example uses{' '}
    //       <Anchor
    //         href="https://www.npmjs.com/package/vanilla-lazyload"
    //         underline="always"
    //       >
    //         vanilla-lazyload
    //       </Anchor>{' '}
    //       but{' '}
    //       <Anchor
    //         href="https://www.npmjs.com/package/vue3-lazyload"
    //         underline="always"
    //       >
    //         vue3-lazyload
    //       </Anchor>{' '}
    //       should work as well.
    //     </>
    //   ),
    //   props: {
    //     src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    //     zoomSrc: 'demo-8-large.jpg',
    //     imgAttributes: {
    //       alt: 'Demo photo of three cocktails',
    //       'data-src': 'demo-8.jpg',
    //     },
    //   },
    //   code: [
    //     {
    //       fileName: 'Vanilla',
    //       code: `new InnerImageZoom();\nnew LazyLoad();\n\n...\n\n<img class="iiz lazy" src="/path/to/image.jpg" />`,
    //       language: 'js',
    //       icon: <IoLogoJavascript size="1rem" />,
    //     },
    //     {
    //       fileName: 'Vue',
    //       code: `TKTK`,
    //       language: 'js',
    //       icon: <IoLogoJavascript size="1rem" />,
    //     },
    //   ],
    // },
    {
      title: 'With Swiper',
      key: 'withSwiper',
      desc: (
        <>
          Zoom in on photos in a{' '}
          <Anchor href="https://swiperjs.com/" underline="always">
            Swiper
          </Anchor>{' '}
          carousel. To avoid any conlicting touch events, recommended with{' '}
          <Code>fullscreenOnMobile</Code>.
        </>
      ),
      swiperProps: [
        {
          src: 'demo-9-slide-1.jpg',
          zoomSrc: 'demo-9-slide-1-large.jpg',
          imgAttributes: {
            alt: 'Demo photo of a vintage camera sitting on a desk',
          },
        },
        {
          src: 'demo-9-slide-2.jpg',
          zoomSrc: 'demo-9-slide-2-large.jpg',
          imgAttributes: {
            alt: 'Demo photo of film canisters',
          },
        },
        {
          src: 'demo-9-slide-3.jpg',
          zoomSrc: 'demo-9-slide-3-large.jpg',
          imgAttributes: {
            alt: 'Demo photo of a backpacker in the water',
          },
        },
      ],
      code: [
        {
          fileName: 'Vanilla',
          code: `new InnerImageZoom({\n  fullscreenOnMobile: true\n});\n\n...\n\n<div class="swiper">\n  <div class="swiper-wrapper">\n    <div class="swiper-slide">\n      <img class="iiz" src="/path/to/image-1.jpg" data-zoom-src="/path/to/zoom-image-1.jpg" />\n    </div>\n    <div class="swiper-slide">\n      <img class="iiz" src="/path/to/image-2.jpg" data-zoom-src="/path/to/zoom-image-2.jpg" />\n    </div>\n    <div class="swiper-slide">\n      <img class="iiz" src="/path/to/image-3.jpg" data-zoom-src="/path/to/zoom-image-3.jpg" />\n    </div>\n  </div>\n</div>`,
          language: 'js',
          icon: <IoLogoJavascript size="1rem" />,
        },
        {
          fileName: 'Vue',
          code: `<swiper>\n  <swiper-slide>\n    <inner-image-zoom\n      src="/path/to/image-1.jpg"\n      zoomSrc="/path/to/zoom-image-1.jpg"\n      :fullscreenOnMobile="true"\n    >\n  </swiper-slide>\n  <swiper-slide>\n    <inner-image-zoom\n      src="/path/to/image-2.jpg"\n      zoomSrc="/path/to/zoom-image-2.jpg"\n      :fullscreenOnMobile="true"\n    >\n  </swiper-slide>\n  <swiper-slide>\n    <inner-image-zoom\n      src="/path/to/image-3.jpg"\n      zoomSrc="/path/to/zoom-image-3.jpg"\n      :fullscreenOnMobile="true"\n    >\n  </swiper-slide>\n</swiper>`,
          language: 'tsx',
          icon: <IoLogoJavascript size="1rem" />,
        },
      ],
    },
  ],
};
