# vue-inner-image-zoom

[![GitHub Actions][build-badge]][build]

A lightweight Vue component for magnifying an image within its original container.

Demos | [Changelog](https://github.com/laurenashpole/inner-image-zoom/blob/main/packages/vue/CHANGELOG.md)

## Installation

**Note:** Version 2.0.0 upgrades the component to support Vue 3. To use this package with older versions of Vue, install using `npm install vue-inner-image-zoom@1.1.1` or `yarn add vue-inner-image-zoom@1.1.1` instead of the instructions below.

### NPM
```javascript
npm install vue-inner-image-zoom
```

### Yarn
```javascript
yarn add vue-inner-image-zoom
```

## Usage

Import the component and include in your template:
```jsx
import InnerImageZoom from 'vue-inner-image-zoom';

...

export default {
  components: {
    'inner-image-zoom': InnerImageZoom
  }
}

...

<inner-image-zoom src="/path/to/image.jpg" zoomSrc="/path/to/zoom-image.jpg" />
```

## Props

Prop | Type | Default | Description
--- | --- | --- | ---
src | String | | (Required) URL for the original image.
sources | Array | | A list of image sources for using the picture tag to serve the appropriate original image (see below for more details).
width | Number | | Width attribute for original image.
height | Number | | Height attribute for original image.
hasSpacer | Boolean | false | If true, gets the original image's aspect ratio based on the width and height props and creates a spacer to prevent cumulative layout shift.
imgAttributes | Object | | [Img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) and [global](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) attributes for the original image (excluding `src`, `width`, `height`, and `style` which are set elsewhere).
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
className | String | | Custom classname for styling the component.
afterZoomIn | Function | | Function to be called after zoom in.
afterZoomOut | Function | | Function to be called after zoom out.

### Sources

This prop accepts an array of objects which it uses to create a picture tag and source elements. The component looks for the following optional properties and you can find additional details on responsive images [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images):

Prop | Type | Default | Description
--- | --- | --- | ---
srcSet | String | | Srcset attribute for source tag.
sizes | String | | Sizes attribute for source tag.
media | String | | An attribute containing a media condition for use with the srcset.
type | String | | An image MIME type. This is useful for using newer formats like WebP.

## Issues

Please submit bugs or requests on the [GitHub issues page](https://github.com/laurenashpole/inner-image-zoom/issues) and make sure to use the `vue` label.

## License

[MIT](https://github.com/laurenashpole/inner-image-zoom/blob/main/LICENSE)

[npm-badge]: http://img.shields.io/npm/v/inner-image-zoom.svg?style=flat
[npm]: https://www.npmjs.com/package/inner-image-zoom

[build-badge]: https://github.com/laurenashpole/inner-image-zoom/actions/workflows/release.yml/badge.svg
[build]: https://github.com/laurenashpole/inner-image-zoom/actions