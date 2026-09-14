import InnerImageZoom from '../packages/vanilla/src';
import { expectType } from 'tsd';

const afterZoomIn = () => {};
const afterZoomOut = () => {};

const instance = new InnerImageZoom('.iiz', {
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
  afterZoomOut
});

expectType<InnerImageZoom | InnerImageZoom[]>(instance);

if (Array.isArray(instance)) {
  expectType<InnerImageZoom[]>(instance);

  instance.forEach((iiz) => {
    expectType<InnerImageZoom>(iiz);
    iiz.uninit();
  });
} else {
  expectType<InnerImageZoom>(instance);
  instance.uninit();
}
