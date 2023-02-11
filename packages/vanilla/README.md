# inner-image-zoom

[![GitHub Actions][build-badge]][build]

Demos | [Changelog](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vanilla/CHANGELOG.md)

A lightweight Vanilla JavaScript package for magnifying an image within its original container. Features include click or hover to zoom, drag or pan on hover to move, fullscreen zoom on mobile devices, and optional hint icon, close button, and transitions.

## Installation

### NPM
```
npm install inner-image-zoom
```

### Yarn
```
yarn add inner-image-zoom
```

### Styling

If your setup supports it, you can import the stylesheet directly from your `node_modules` using:

```javascript
import 'inner-image-zoom/lib/styles.css';
```

or:

```javascript
import 'inner-image-zoom/lib/styles.min.css';
```

You can also download the raw [styles.css](https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/vanilla/src/styles.css) file or [styles.min.css](https://raw.githubusercontent.com/laurenashpole/inner-image-zoom/main/packages/vanilla/src/styles.min.css).

## Usage

### HTML

```html
<img class="iiz" src="/path/to/image-2x.jpg" />
```

```html
<div class="iiz">
  <img src="/path/to/image.jpg" />
</div>
```

When InnerImageZoom is initialized, any content within the container will be preserved.

```html
<picture class="iiz" data-zoom-src="/path/to/zoom-image.jpg">
  <source srcset="/path/to/large-image.jpg, /path/to/large-image-2x.jpg 2x" media="(min-width: 500px)" />
  <img srcset="/path/to/small-image.jpg, /path/to/small-image-2x.jpg 2x" src="/path/to/image.jpg">
</picture>
```

### JS

```js
import InnerImageZoom from 'inner-image-zoom';

...

new InnerImageZoom();
```

```js
new InnerImageZoom('.selector', {
  moveType: 'drag'
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

`reinit` - Reinitialize an InnerImageZoom instance with new options.
`uninit` - Unitialize an InnerImageZoom instance.

## Issues

Please submit issues or requests [here](https://github.com/laurenashpole/inner-image-zoom/issues) and make sure to use the `vanilla` label.

## License

[MIT](https://github.com/laurenashpole/inner-image-zoom/blob/main/LICENSE)

[npm-badge]: http://img.shields.io/npm/v/inner-image-zoom.svg?style=flat
[npm]: https://www.npmjs.com/package/inner-image-zoom

[build-badge]: https://github.com/laurenashpole/inner-image-zoom/actions/workflows/release.yml/badge.svg
[build]: https://github.com/laurenashpole/inner-image-zoom/actions

[types-badge]: https://badgen.net/npm/types/inner-image-zoom