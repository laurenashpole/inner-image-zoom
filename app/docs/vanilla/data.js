import { FaCode } from 'react-icons/fa6';
import { LuFileCog } from 'react-icons/lu';
import { SiNpm } from 'react-icons/si';

import Code from '@/app/components/shared/Code';
import { Anchor } from '@mantine/core';

export const DATA = {
  hero: {
    title: 'Inner Image Zoom',
    versions: [
      {
        label: '1.0.0',
        path: 'docs/vanilla',
      },
    ],
    links: [
      {
        title: 'Package',
        label: 'inner-image-zoom',
        icon: <SiNpm size="1rem" />,
        href: 'https://www.npmjs.com/package/inner-image-zoom',
      },
      {
        title: 'Source code',
        label: 'Open repo on GitHub',
        icon: <FaCode size="1rem" />,
        href: 'https://github.com/laurenashpole/inner-image-zoom/tree/main/packages/vanilla',
      },
      {
        title: 'Changelog',
        label: 'Open changelog on GitHub',
        icon: <LuFileCog size="1rem" />,
        href: 'https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/CHANGELOG.md',
      },
    ],
  },
  quickstart: {
    title: 'Quickstart',
    items: [
      {
        label: 'Install',
        code: 'npm install inner-image-zoom',
      },
      {
        label: 'Import',
        code: `import InnerImageZoom from 'inner-image-zoom';`,
      },
      {
        label: 'Style',
        code: `import 'inner-image-zoom/lib/styles.min.css'`,
      },
      {
        label: 'Initialize',
        code: 'new InnerImageZoom()',
      },
      {
        label: 'Template',
        code: '<img class="iiz" src="/path/to/image.jpg" />',
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
        content: 'npm install inner-image-zoom',
      },
      {
        type: 'heading',
        content: 'Yarn',
      },
      {
        type: 'code',
        content: 'yarn add inner-image-zoom',
      },
      {
        type: 'heading',
        content: 'TypeScript',
      },
      {
        type: 'text',
        content: (
          <>
            <Anchor
              href="https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/src/index.d.ts"
              underline="always"
            >
              Type declarations
            </Anchor>{' '}
            were added with version 1.0.0.
          </>
        ),
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
              href="https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/vanilla/src/styles.css"
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
        content: `import 'inner-image-zoom/lib/styles.min.css';`,
      },
    ],
  },
  usage: {
    title: 'Usage',
    items: [
      {
        type: 'heading',
        content: 'HTML',
      },
      {
        type: 'text',
        content: (
          <>
            Initializing Inner Image Zoom requires an <Code>img</Code> tag and
            selector (either custom or the default <Code>iiz</Code>). The{' '}
            <Code>img</Code> tag can be standalone:
          </>
        ),
      },
      {
        type: 'code',
        content: '<img class="iiz" src="/path/to/image-2x.jpg" />',
      },
      {
        type: 'text',
        content: 'Or in a container:',
      },
      {
        type: 'code',
        content:
          '<div class="iiz">\n  <img src="/path/to/image.jpg" />\n</div>',
      },
      {
        type: 'text',
        content:
          'Options may be applied to specific instances using data attributes:',
      },
      {
        type: 'code',
        content:
          '<div class="iiz" data-move-type="drag">\n  <img src="/path/to/image.jpg" />\n</div>',
      },
      {
        type: 'text',
        content:
          'Any content within the container will be preserved. This is useful for responsive images or adding custom image spacers or loading states:',
      },
      {
        type: 'code',
        content:
          '<picture class="iiz" data-zoom-src="/path/to/zoom-image.jpg">\n  <source\n    srcset="/path/to/large-image.jpg, /path/to/large-image-2x.jpg 2x"\n    media="(min-width: 500px)"\n  />\n  <img\n    srcset="/path/to/small-image.jpg, /path/to/small-image-2x.jpg 2x"\n    src="/path/to/image.jpg"\n  />\n</picture>',
      },
      {
        type: 'heading',
        content: 'JavaScript',
      },
      {
        type: 'text',
        content: 'Start by importing and initializing:',
      },
      {
        type: 'code',
        content: `import InnerImageZoom from 'inner-image-zoom';\n\n...\n\nnew InnerImageZoom();`,
      },
      {
        type: 'text',
        content:
          'You can also initialize with a custom selector or options object:',
      },
      {
        type: 'code',
        content: `new InnerImageZoom('.selector', {\n  zoomScale: 0.9,\n  moveType: 'drag',\n  hideCloseButton: true,\n  hideHint: true\n});`,
      },
    ],
  },
  props: {
    title: 'Options',
    items: [
      {
        type: 'table',
        content: [
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
            name: 'zoomPreload',
            type: 'boolean',
            default: 'false',
            desc: 'If set to true, preloads the zoom image instead of waiting for mouseenter and (unless on a touch device) persists the image on mouseleave.',
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
            name: 'hideCloseButton',
            type: 'boolean',
            default: 'false',
            desc: 'Hides the close button on touch devices. If set to true, zoom out is triggered by tap.',
          },
          {
            name: 'hideHint',
            type: 'boolean',
            default: 'false',
            desc: 'Hides the magnifying glass hint.',
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
        content: 'Methods',
      },
      {
        type: 'text',
        content: (
          <>
            <Code>reinit</Code> - Reinitialize an InnerImageZoom instance with
            new options.
            <br />
            <Code>uninit</Code> - Unitialize an InnerImageZoom instance.
          </>
        ),
      },
    ],
  },
};
