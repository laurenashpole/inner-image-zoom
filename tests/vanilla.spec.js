import { expect } from 'chai';
import { fireEvent, getByLabelText, getByText, waitFor } from '@testing-library/dom';
import { DATA } from './constants';
import InnerImageZoom from '../packages/vanilla/src';
import '../packages/styles.css';

describe('InnerImageZoom', () => {
  let app;

  beforeEach(() => {
    app = document.createElement('div');
    document.body.appendChild(app);
  });

  afterEach(() => {
    const portal = document.querySelector('.iiz__zoom-portal');
    document.body.removeChild(app);

    if (portal) {
      document.body.removeChild(portal);
    }
  });

  const createImg = (attrs) => {
    attrs = { src: DATA.src, ...(attrs || {}) };

    return `<img ${Object.keys(attrs)
      .map((key) => `${key}="${attrs[key]}"`)
      .join(' ')} />`;
  };

  const createSources = () => {
    return DATA.sources.map((src) => `<source srcset="${src.srcSet}" media="${src.media}" />`).join('');
  };

  describe('mount', () => {
    describe('initialize', () => {
      it('initializes with a container and default selector', () => {
        app.innerHTML = `<div class="iiz">${createImg()}</div>`;
        new InnerImageZoom();
        expect(app.querySelector('.iiz__img')).to.exist;
      });

      it('initializes with a container and custom selector', () => {
        app.innerHTML = `<div class="custom">${createImg()}</div>`;
        new InnerImageZoom('.custom');
        expect(app.querySelector('.iiz__img')).to.exist;
      });

      it('initializes with img and no container', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom();
        expect(app.getElementsByTagName('figure').length).to.equal(1) &&
          expect(app.getElementsByTagName('img')[0].classList.contains('iiz')).to.be.false;
      });

      it('initializes with picture and no container', () => {
        app.innerHTML = `<picture class="iiz">${createImg()}</picture>`;
        new InnerImageZoom();
        expect(app.getElementsByTagName('figure').length).to.equal(1) &&
          expect(app.getElementsByTagName('picture')[0].classList.contains('iiz')).to.be.false;
      });

      it('initializes multiple instances', () => {
        app.innerHTML = `${createImg({ class: 'iiz' })}${createImg({ class: 'iiz' })}`;
        new InnerImageZoom();
        expect(app.getElementsByTagName('figure').length).to.equal(2);
      });

      it('does not initialize with no img present', () => {
        app.innerHTML = `<div class="iiz"></div>`;
        new InnerImageZoom();
        expect(app.getElementsByTagName('figure').length).to.equal(0);
      });
    });

    describe('original image', () => {
      it('preserves img attributes', () => {
        app.innerHTML = createImg({ class: 'iiz', alt: 'Kittens!' });
        new InnerImageZoom();
        expect(app.querySelector('.iiz__img').getAttribute('alt')).to.equal('Kittens!');
      });

      it('preserves source tags', () => {
        app.innerHTML = `
          <picture>
            ${createSources()}
            ${createImg({ class: 'iiz' })}
          </picture>
        `;

        new InnerImageZoom();
        expect(app.getElementsByTagName('source').length).to.equal(2);
      });

      it('hides the hint if hideHint is true', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { hideHint: true });
        expect(app.querySelector('.iiz__hint')).to.not.exist;
      });
    });
  });

  describe('zoom in', () => {
    describe('render', () => {
      it('renders the zoomed image on mouse enter', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom();
        fireEvent.mouseEnter(app.querySelector('.iiz'));
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });

      it('renders the zoomed image with unique src from options', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { zoomSrc: DATA.src2x });
        fireEvent.mouseEnter(app.querySelector('.iiz'));
        expect(app.querySelector('.iiz__zoom-img').getAttribute('src')).to.equal(DATA.src2x);
      });

      it('renders the zoomed image with unique src from data attributes', () => {
        app.innerHTML = createImg({ class: 'iiz', 'data-zoom-src': DATA.src2x });
        new InnerImageZoom();
        fireEvent.mouseEnter(app.querySelector('.iiz'));
        expect(app.querySelector('.iiz__zoom-img').getAttribute('src')).to.equal(DATA.src2x);
      });

      it('renders the zoomed image on mount if zoomPreload is true', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { zoomPreload: true });
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });

      it('renders a scaled zoomed image if zoomScale is set', async () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { zoomScale: 0.5 });
        const figure = app.querySelector('.iiz');
        fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        const zoomImg = app.querySelector('.iiz__zoom-img');

        await waitFor(() => {
          expect(zoomImg.width).to.equal(375);
        });
      });
    });

    describe('show', () => {
      it('shows the zoomed image on click', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom();
        const figure = app.querySelector('.iiz');
        fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        const zoomImg = app.querySelector('.iiz__zoom-img');
        expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      });

      it('shows the zoomed image on mouse enter if zoomType hover is set', () => {
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { zoomType: 'hover' });
        fireEvent.mouseEnter(app.querySelector('.iiz'));
        const zoomImg = app.querySelector('.iiz__zoom-img');
        expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      });

      it('shows the zoomed image in a fullscreen portal if fullscreenOnMobile is set', () => {
        global.window.matchMedia = () => ({ matches: true });
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { fullscreenOnMobile: true });
        const figure = app.querySelector('.iiz');
        fireEvent.touchStart(figure);
        fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        expect(document.querySelector('.iiz__zoom-portal')).to.exist;
      });

      it('fires afterZoomIn callback on zoom in', () => {
        const afterZoomIn = () => app.append('Callback fired!');
        app.innerHTML = createImg({ class: 'iiz' });
        new InnerImageZoom('.iiz', { afterZoomIn });
        const figure = app.querySelector('.iiz');
        fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        expect(getByText(app, 'Callback fired!')).to.exist;
      });
    });
  });

  describe('move', () => {
    it('pans the zoomed image on mouse move', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { zoomSrc: DATA.src2x });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure, { clientY: 100 });
      const zoomImg = app.querySelector('.iiz__zoom-img');
      const topPosition = zoomImg.style.top;

      await waitFor(() => {
        fireEvent.mouseMove(figure, { clientY: 150 });
        expect(parseInt(topPosition, 10)).to.be.above(parseInt(zoomImg.style.top, 10));
      });
    });

    it('drags the zoomed image if moveType drag is set', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { zoomSrc: DATA.src2x, moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure, { clientY: 100 });
      const zoomImg = app.querySelector('.iiz__zoom-img');
      const topPosition = zoomImg.style.top;
      fireEvent.mouseDown(zoomImg, { clientY: 100 });

      await waitFor(() => {
        fireEvent.mouseMove(zoomImg, { clientY: 150 });
        expect(parseInt(topPosition, 10)).to.be.below(parseInt(zoomImg.style.top, 10));
      });
    });
  });

  describe('zoom out', () => {
    it('hides the zoomed image on toggle click', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      fireEvent.click(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on mouse leave', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      fireEvent.mouseLeave(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on button click on touch devices', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on click on touch devices if hideCloseButton is true', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { hideCloseButton: true });
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      fireEvent.click(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on button click on desktop if moveType is drag', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('removes the zoomed image after fade transition', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.mouseLeave(figure);
      fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.not.exist;
      });
    });

    it('removes the zoomed image after fade transition on touch devices', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.not.exist;
      });
    });

    it('removes the zoomed image immediately if fade duration is zero', () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { fadeDuration: 0 });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.mouseLeave(figure);
      expect(app.querySelector('.iiz__zoom-img')).to.not.exist;
    });

    it('removes the fullscreen portal immediately if fullscreenOnMobile is true', () => {
      global.window.matchMedia = () => ({ matches: true });
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { fullscreenOnMobile: true });
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(document, 'Zoom Out'));
      expect(document.querySelector('.iiz__zoom-portal')).to.not.exist;
    });

    it('persists the zoomed image after fade transition if zoomPreload is true', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { zoomPreload: true });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.mouseLeave(figure);
      fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });
    });

    it('persists the zoomed image after clicking the close button if moveType is drag', async () => {
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });
    });

    it('fires afterZoomOut callback on zoom out', () => {
      const afterZoomOut = () => app.append('Callback fired!');
      app.innerHTML = createImg({ class: 'iiz' });
      new InnerImageZoom('.iiz', { afterZoomOut });
      const figure = app.querySelector('.iiz');
      fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.mouseLeave(figure);
      expect(getByText(app, 'Callback fired!')).to.exist;
    });
  });
});
