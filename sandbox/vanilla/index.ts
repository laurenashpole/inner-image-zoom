import InnerImageZoom from '../../packages/vanilla/src';
import '../../packages/vanilla/src/styles.css';

new InnerImageZoom('.iiz', { fullscreenOnMobile: true });

new InnerImageZoom('#iizFigure', {
  moveType: 'drag',
  zoomSrc: 'https://images.unsplash.com/photo-1609074405294-355851aead3e?fit=crop&w=1500&q=80'
});

new InnerImageZoom('.iiz-multi');

const iizInits = new InnerImageZoom('.iiz-inits');

document.getElementById('uninit')?.addEventListener('click', () => {
  iizInits.uninit();
});

document.getElementById('reinit')?.addEventListener('click', () => {
  iizInits.reinit({
    moveType: 'pan',
    zoomSrc: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?fit=crop&w=1500&q=80'
  });
});
