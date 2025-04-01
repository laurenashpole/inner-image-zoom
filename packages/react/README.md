# react-inner-image-zoom

[![GitHub Actions][build-badge]][build] [![NPM][npm-badge]][npm]

A lightweight React component for magnifying an image within its original container.

[Demos](https://innerimagezoom.com/) | [Changelog](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/react/CHANGELOG.md)

## Installation

**Note:** Version 2.0.0 introduces React hooks and requires React v16.8.0 or above. To use this package with older versions of React, install with `npm install react-inner-image-zoom@1.3.0` or `yarn add react-inner-image-zoom@1.3.0` instead of the instructions below.

### NPM
```
npm install react-inner-image-zoom
```

### Yarn
```
yarn add react-inner-image-zoom
```

### TypeScript

[Type declarations](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/react/src/index.d.ts) were added with version 4.0.0. For older installations, type definitions are available through [DefinitelyTyped](https://definitelytyped.org/) and can be installed with:

```
npm install --save-dev @types/react-inner-image-zoom
```

### Styling

You can download the raw [styles.css](https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/react/src/styles.css) file or, if your build supports it, import the stylesheet directly from node_modules using:


```javascript
import 'react-inner-image-zoom/lib/styles.min.css';
```

## Usage

Import and render the component:
```javascript
import InnerImageZoom from 'react-inner-image-zoom';

...

<InnerImageZoom src="/path/to/image.jpg" zoomSrc="/path/to/zoom-image.jpg" />
```

This is the simplest usage. For additional examples, visit the [demo page](https://innerimagezoom.com/).


## Props

Prop | Type | Default | Description
--- | --- | --- | ---
src | string | | **(Required)** URL for the original image.
sources | array | | A list of image sources for using the picture tag to serve the appropriate original image (see below for more details).
width | number | | Width attribute for original image.
height | number | | Height attribute for original image.
hasSpacer | boolean | false | If true, gets the original image's aspect ratio based on the width and height props and creates a spacer to prevent cumulative layout shift.
imgAttributes | object | | [Img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) and [global](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) attributes for the original image (excluding `src`, `width`, `height`, and `style` which are set elsewhere). The imgAttributes keys should follow the [React DOM element](https://reactjs.org/docs/dom-elements.html) naming conventions.
zoomSrc | string | | URL for the larger zoom image. Falls back to original image src if not defined.
zoomScale | number | 1 | Multiplied against the natural width and height of the zoomed image. This will generally be a decimal (example, 0.9 for 90%).
zoomPreload | boolean | false | If set to true, preloads the zoom image instead of waiting for mouseenter and (unless on a touch device) persists the image on mouseleave.
moveType | `pan` or `drag` | pan | The user behavior for moving zoomed images on non-touch devices.
zoomType | `click` or `hover` | click | The user behavior for triggering zoom. When using `hover`, combine with `zoomPreload` to avoid flickering on rapid mouse movements.
fadeDuration | number | 150 | Fade transition time in milliseconds. If zooming in on transparent images, set this to `0` for best results.
fullscreenOnMobile | boolean | false | Enables fullscreen zoomed image on touch devices below a specified breakpoint.
mobileBreakpoint | number | 640 | The maximum breakpoint for fullscreen zoom image when fullscreenOnMobile is true.
hideCloseButton | boolean | false | Hides the close button on touch devices. If set to true, zoom out is triggered by tap.
hideHint | boolean | false | Hides the magnifying glass hint.
className | string | | Custom classname for styling the component.
afterZoomIn | () => void | | Function to be called after zoom in.
afterZoomOut | () => void | | Function to be called after zoom out.

### Ref

The `ref` prop forwards an object with the `container` (the root `figure` element) and `portal` DOM nodes. `portal` grants access to the zoomed image on touch devices when `fullscreenOnMobile` is set and is only available while the image is zoomed. When using with TypeScript, `InnerImageZoomRef` can be imported to use as a type argument with `useRef`.

### Sources

This prop accepts an array of objects which it uses to create a picture tag and source elements. The component looks for the following optional properties and you can find additional details on responsive images [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images):

Prop | Type | Default | Description
--- | --- | --- | ---
srcSet | string | | Srcset attribute for source tag.
sizes | string | | Sizes attribute for source tag.
media | string | | An attribute containing a media condition for use with the srcset.
type | string | | An image MIME type. This is useful for using newer formats like WebP.

## Issues

Please submit bugs or requests on the [GitHub issues page](https://github.com/laurenashpole/inner-image-zoom/issues) and make sure to use the `react` label.

## License

[MIT](https://github.com/laurenashpole/inner-image-zoom/blob/main/LICENSE)

[npm-badge]: http://img.shields.io/npm/v/react-inner-image-zoom.svg?style=flat
[npm]: https://www.npmjs.com/package/react-inner-image-zoom

[build-badge]: https://github.com/laurenashpole/inner-image-zoom/actions/workflows/release.yml/badge.svg
[build]: https://github.com/laurenashpole/inner-image-zoom/actions
