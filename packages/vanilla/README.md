# inner-image-zoom

[![GitHub Actions][build-badge]][build] [![NPM][npm-badge]][npm]

A lightweight Vanilla JavaScript package for magnifying an image within its original container.

[Demos](https://innerimagezoom.com/) | [Changelog](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/CHANGELOG.md)

## Installation

### NPM
```javascript
npm install inner-image-zoom
```

### Yarn
```javascript
yarn add inner-image-zoom
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/inner-image-zoom@1.0.1/umd/index.min.js"></script>
```

### TypeScript
[Type declarations](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/src/index.d.ts) were added with version 1.0.0.

### Styling

You can download the raw [styles.css](https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/vanilla/src/styles.css) file or, if your build supports it, import the stylesheet directly from `node_modules` using:

```javascript
import 'inner-image-zoom/lib/styles.min.css';
```

## Usage

### HTML

Initializing Inner Image Zoom requires an `img` tag and selector (either custom or the default `iiz`). The `img` tag can be standalone:

```html
<img class="iiz" src="/path/to/image-2x.jpg" />
```

Or in a container:

```html
<div class="iiz">
  <img src="/path/to/image.jpg" />
</div>
```

Options may be applied to specific instances using data attributes:

```html
<div class="iiz" data-move-type="drag">
  <img src="/path/to/image.jpg" />
</div>
```

Any content within the container will be preserved. This is useful for responsive images or adding custom image spacers or loading states:

```html
<picture class="iiz" data-zoom-src="/path/to/zoom-image.jpg">
  <source
    srcset="/path/to/large-image.jpg, /path/to/large-image-2x.jpg 2x"
    media="(min-width: 500px)"
  />
  <img
    srcset="/path/to/small-image.jpg, /path/to/small-image-2x.jpg 2x"
    src="/path/to/image.jpg"
  />
</picture>
```

### JS

Start by importing and initializing:

```javascript
import InnerImageZoom from 'inner-image-zoom';

...

new InnerImageZoom();
```

You can also initialize with a custom selector or options object:

```javascript
new InnerImageZoom('.selector', {
  zoomScale: 0.9,
  moveType: 'drag',
  hideCloseButton: true,
  hideHint: true
});
```

## Options

Option | Type | Default | Description
--- | --- | --- | ---
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
afterZoomIn | () => void | | Function to be called after zoom in.
afterZoomOut | () => void | | Function to be called after zoom out.

## Methods

- `reinit` - Reinitialize an InnerImageZoom instance with new options.
- `uninit` - Unitialize an InnerImageZoom instance.

## Issues

Please submit bugs or requests on the [GitHub issues page](https://github.com/laurenashpole/inner-image-zoom/issues) and make sure to use the `vanilla` label.

## License

[MIT](https://github.com/laurenashpole/inner-image-zoom/blob/main/LICENSE)

[npm-badge]: http://img.shields.io/npm/v/inner-image-zoom.svg?style=flat
[npm]: https://www.npmjs.com/package/inner-image-zoom

[build-badge]: https://github.com/laurenashpole/inner-image-zoom/actions/workflows/release.yml/badge.svg
[build]: https://github.com/laurenashpole/inner-image-zoom/actions

[types-badge]: https://badgen.net/npm/types/inner-image-zoom
