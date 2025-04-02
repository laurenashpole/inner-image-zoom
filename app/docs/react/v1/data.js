import { FaCode } from 'react-icons/fa6';
import { LuFileCog } from 'react-icons/lu';
import { SiNpm } from 'react-icons/si';

import Code from '@/app/components/shared/Code';
import { Anchor } from '@mantine/core';

export const DATA = {
  hero: {
    title: 'React Inner Image Zoom v1.3.0',
    versions: [
      {
        label: '4.0.1',
        path: '/docs/react',
      },
      {
        label: '3.0.2',
        path: '/docs/react/v3',
      },
      {
        label: '2.1.0',
        path: '/docs/react/v2',
      },
      {
        label: '1.3.0',
        path: '/docs/react/v1',
        current: true,
      },
    ],
    links: [
      {
        title: 'Package',
        label: 'react-inner-image-zoom',
        icon: <SiNpm size="1rem" />,
        href: 'https://www.npmjs.com/package/react-inner-image-zoom/v/1.3.0',
      },
      {
        title: 'Source code',
        label: 'Open repo on GitHub',
        icon: <FaCode size="1rem" />,
        href: 'https://github.com/laurenashpole/react-inner-image-zoom/',
      },
      {
        title: 'Changelog',
        label: 'Open changelog on GitHub',
        icon: <LuFileCog size="1rem" />,
        href: 'https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/react/CHANGELOG.md',
      },
    ],
  },
  installation: {
    title: 'Installation',
    items: [
      {
        type: 'heading',
        content: 'NPM',
      },
      {
        type: 'code',
        content: 'npm install react-inner-image-zoom@1.3.0',
      },
      {
        type: 'heading',
        content: 'Yarn',
      },
      {
        type: 'code',
        content: 'yarn add react-inner-image-zoom@1.3.0',
      },
      {
        type: 'heading',
        content: 'TypeScript',
      },
      {
        type: 'heading',
        content: 'Styling',
      },
      {
        type: 'text',
        content: (
          <>
            You can download the raw{' '}
            <Anchor
              href="https://raw.githubusercontent.com/laurenashpole/react-inner-image-zoom/master/src/InnerImageZoom/styles.css"
              underline="always"
            >
              styles.css
            </Anchor>{' '}
            file or, if your build supports it, import the stylesheet directly
            from <Code>node_modules</Code> using:
          </>
        ),
      },
      {
        type: 'code',
        content: `import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';`,
      },
    ],
  },
  usage: {
    title: 'Usage',
    items: [
      {
        type: 'text',
        content: 'Import and render the component:',
      },
      {
        type: 'code',
        content: `import InnerImageZoom from 'react-inner-image-zoom'\n\n...\n\n<InnerImageZoom src="/path/to/image.jpg" zoomSrc="/path/to/zoom-image.jpg" />`,
      },
    ],
  },
  props: {
    title: 'Props',
    items: [
      {
        type: 'table',
        content: [
          {
            name: 'src',
            type: 'string',
            default: '',
            desc: (
              <>
                <strong>Required.</strong> URL for the original image.
              </>
            ),
          },
          {
            name: 'srcSet',
            type: 'string',
            default: '',
            desc: 'Default srcset attribute for a responsive original image.',
          },
          {
            name: 'sizes',
            type: 'string',
            default: '',
            desc: 'Default sizes attribute for use with srcset.',
          },
          {
            name: 'sources',
            type: 'array',
            default: '',
            desc: 'A list of image sources for using the picture tag to serve the appropriate original image (see below for more details).',
          },
          {
            name: 'zoomSrc',
            type: 'string',
            default: '',
            desc: 'URL for the larger zoom image. Falls back to original image src if not defined.',
          },
          {
            name: 'zoomScale',
            type: 'number',
            default: '1',
            desc: 'Multiplied against the natural width and height of the zoomed image. This will generally be a decimal (example, 0.9 for 90%).',
          },
          {
            name: 'startsActive',
            type: 'boolean',
            default: 'false',
            desc: 'If set to true, preloads the zoom image instead of waiting for mouseenter and (unless on a touch device) persists the image on mouseleave.',
          },
          {
            name: 'alt',
            type: 'string',
            default: '',
            desc: 'Alternative text for the original image.',
          },
          {
            name: 'moveType',
            type: (
              <>
                &quot;pan&quot;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&quot;drag&quot;
              </>
            ),
            default: 'pan',
            desc: 'The user behavior for moving zoomed images on non-touch devices.',
          },
          {
            name: 'zoomType',
            type: (
              <>
                &quot;click&quot;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&quot;hover&quot;
              </>
            ),
            default: 'click',
            desc: (
              <>
                The user behavior for triggering zoom. When using{' '}
                <Code>hover</Code>, combine with <Code>zoomPreload</Code> to
                avoid flickering on rapid mouse movements.
              </>
            ),
          },
          {
            name: 'fadeDuration',
            type: 'number',
            default: '150',
            desc: (
              <>
                Fade transition time in milliseconds. If zooming in on
                transparent images, set this to <Code>0</Code> for best results.
              </>
            ),
          },
          {
            name: 'fullscreenOnMobile',
            type: 'boolean',
            default: 'false',
            desc: 'Enables fullscreen zoomed image on touch devices below a specified breakpoint.',
          },
          {
            name: 'mobileBreakpoint',
            type: 'number',
            default: '640',
            desc: 'The maximum breakpoint for fullscreen zoom image when fullscreenOnMobile is true.',
          },
          {
            name: 'className',
            type: 'string',
            default: '',
            desc: 'Custom classname for styling the component.',
          },
          {
            name: 'afterZoomIn',
            type: '() => void',
            default: '',
            desc: 'Function to be called after zoom in.',
          },
          {
            name: 'afterZoomOut',
            type: '() => void',
            default: '',
            desc: 'Function to be called after zoom out.',
          },
        ],
      },
      {
        type: 'heading',
        content: 'Sources',
      },
      {
        type: 'text',
        content: (
          <>
            This prop accepts an array of objects which it uses to create a
            picture tag and source elements. The component looks for the
            following optional properties and you can find additional details on
            responsive images{' '}
            <Anchor
              href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images"
              underline="always"
            >
              here
            </Anchor>
            :
          </>
        ),
      },
      {
        type: 'table',
        content: [
          {
            name: 'srcSet',
            type: 'string',
            default: '',
            desc: 'Srcset attribute for source tag.',
          },
          {
            name: 'sizes',
            type: 'string',
            default: '',
            desc: 'Sizes attribute for source tag.',
          },
          {
            name: 'media',
            type: 'string',
            default: '',
            desc: 'An attribute containing a media condition for use with the srcset.',
          },
          {
            name: 'type',
            type: 'string',
            default: '',
            desc: 'An image MIME type. This is useful for using newer formats like WebP.',
          },
        ],
      },
    ],
  },
};
