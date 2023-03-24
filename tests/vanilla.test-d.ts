import InnerImageZoom from '../packages/vanilla/src';

const afterZoomIn = () => {};
const afterZoomOut = () => {};

new InnerImageZoom('.iiz', {
  zoomSrc: 'path/to/zoom-image.jpg',
  zoomScale: 1,
  zoomPreload: false,
  moveType: 'pan',
  zoomType: 'click',
  fadeDuration: 150,
  fullscreenOnMobile: true,
  mobileBreakpoint: 500,
  hideCloseButton: false,
  hideHint: false,
  afterZoomIn,
  afterZoomOut,
});
