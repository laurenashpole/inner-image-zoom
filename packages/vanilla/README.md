# inner-image-zoom

[![GitHub Actions][build-badge]][build]

A lightweight Vanilla JavaScript package for magnifying an image within its original container.

Demos | [Changelog](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/CHANGELOG.md)

## Installation

### NPM
```javascript
npm install inner-image-zoom
```

### Yarn
```javascript
yarn add inner-image-zoom
```

### TypeScript
[Type declarations](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/src/index.d.ts) were added with version 1.0.0.

### Styling

You can download the raw [styles.css](https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/vanilla/src/styles.css) file or, if your setup supports it, import the stylesheet directly from `node_modules` using:

```javascript
import 'inner-image-zoom/lib/styles.min.css';
```

## Usage

### HTML

To initialize properly, Inner Image Zoom requires an `img` tag. This can be the image itself:

```html
<img class="iiz" src="/path/to/image-2x.jpg" />
```

Or a container:

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
zoomSrc | String | | URL for the larger zoom image. Falls back to original image src if not defined.
zoomScale | Number | 1 | Multiplied against the natural width and height of the zoomed image. This will generally be a decimal (example, 0.9 for 90%).
zoomPreload | Boolean | false | If set to true, preloads the zoom image instead of waiting for mouseenter and (unless on a touch device) persists the image on mouseleave.
moveType | String | pan | `pan` or `drag`. The user behavior for moving zoomed images on non-touch devices.
zoomType | String | click | `click` or `hover`. The user behavior for triggering zoom. When using `hover`, combine with `zoomPreload` to avoid flickering on rapid mouse movements.
fadeDuration | Number | 150 | Fade transition time in milliseconds. If zooming in on transparent images, set this to `0` for best results.
fullscreenOnMobile | Boolean | false | Enables fullscreen zoomed image on touch devices below a specified breakpoint.
mobileBreakpoint | Number | 640 | The maximum breakpoint for fullscreen zoom image when fullscreenOnMobile is true.
hideCloseButton | Boolean | false | Hides the close button on touch devices. If set to true, zoom out is triggered by tap.
hideHint | Boolean | false | Hides the magnifying glass hint.
afterZoomIn | Function | | Function to be called after zoom in.
afterZoomOut | Function | | Function to be called after zoom out.

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
