import InnerImageZoom from '../../packages/vanilla/src';
import '../../packages/vanilla/src/styles.css';

new InnerImageZoom('.iiz');

new InnerImageZoom('#iizFigure', {
  zoomSrc: 'https://images.unsplash.com/photo-1609074405294-355851aead3e?fit=crop&w=1500&q=80'
});

new InnerImageZoom('.iiz-hover', {
  zoomType: 'hover',
  zoomPreload: true
});

new InnerImageZoom('.iiz-drag', {
  moveType: 'drag',
});

new InnerImageZoom('.iiz-fullscreen', {
  fullscreenOnMobile: true,
  mobileBreakpoint: 600
});

new InnerImageZoom('.iiz-hide', {
  hideCloseButton: true,
  hideHint: true
});

const callbackHeading = document.querySelector('.callbackHeading');

new InnerImageZoom('.iiz-callbacks', {
  afterZoomIn: function () {
    if (callbackHeading && callbackHeading['style']) {
      callbackHeading['style'].color = 'green';
    }
  },
  afterZoomOut: function () {
    if (callbackHeading && callbackHeading['style']) {
      callbackHeading['style'].color = 'black';
    }
  }
});

const iizInits = new InnerImageZoom('.iiz-inits');
const uninitBtn = document.getElementById('uninit');
const reinitBtn = document.getElementById('reinit');

if (uninitBtn) {
  uninitBtn.addEventListener('click', function () {
    iizInits.uninit();
  });
}

if (reinitBtn) {
  reinitBtn.addEventListener('click', function () {
    iizInits.reinit({
      moveType: 'drag',
      zoomSrc: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?fit=crop&w=1500&q=80'
    });
  });
}

