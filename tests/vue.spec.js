import { createApp } from 'vue';
import { expect } from 'chai';
import { fireEvent, getByLabelText, getByText, waitFor } from '@testing-library/dom';
import { DATA } from './constants';

import InnerImageZoom from '../packages/vue/src';

describe('vue-inner-image-zoom', () => {
  let app;

  beforeEach(() => {
    app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);
  });

  afterEach(() => {
    const portal = document.querySelector('.iiz__zoom-portal');
    document.body.removeChild(app);

    if (portal) {
      document.body.removeChild(portal);
    }
  });

  const innerImageZoom = (props = {}) => {
    return createApp(InnerImageZoom, { src: DATA.src, ...props }).mount('#app');
  };

  describe('mount', () => {
    describe('container', () => {
      it('renders a figure', () => {
        innerImageZoom();
        expect(app.querySelector('figure')).to.exist;
      });

      it('renders a figure with a custom classname', () => {
        innerImageZoom({ className: DATA.className });
        expect(app.querySelector(`.${DATA.className}`)).to.exist;
      });
    });

    describe('original image', () => {
      it('renders the original image', () => {
        innerImageZoom();
        expect(app.querySelector('.iiz__img')).to.exist;
      });

      it('renders the original image with custom attributes if imgAttributes is set', () => {
        innerImageZoom({ imgAttributes: { 'data-key': 'value' } });
        expect(app.querySelector('.iiz__img').getAttribute('data-key')).to.equal('value');
      });

      it('combines image classes if imgAttributes contains className', () => {
        innerImageZoom({ imgAttributes: { className: 'class' } });
        expect(app.querySelector('.iiz__img').classList.contains('class')).to.be.true;
      });

      it('ignores style transition properties in imgAttributes prop', () => {
        innerImageZoom({ imgAttributes: { style: { transition: 'none' } } });
        expect(app.querySelector('.iiz__img').style.transition).to.not.equal('none');
      });

      it('renders the original image with source tags', () => {
        innerImageZoom({ sources: DATA.sources });
        expect(app.querySelectorAll('source').length).to.equal(2);
      });

      it('only renders source tags that have srcSet set', () => {
        innerImageZoom({ sources: DATA.invalidSources });
        expect(app.querySelectorAll('source').length).to.equal(1);
      });

      it('renders a spacer if width, height, and hasSpacer are set', () => {
        innerImageZoom({ width: 750, height: 500, hasSpacer: true });
        expect(parseInt(app.querySelector('div').style['padding-top'])).to.equal(66);
      });

      it('ignores hasSpacer if width or height are not set', () => {
        innerImageZoom({ height: 500, hasSpacer: true });
        expect(app.querySelector('div').style['padding-top']).to.equal('');
      });

      it('hides the hint if hideHint is true', () => {
        innerImageZoom({ hideHint: true });
        expect(app.querySelector('.iiz__hint')).to.not.exist;
      });
    });
  });

  describe('zoom in', () => {
    describe('render', () => {
      it('renders the zoomed image on mouse enter', async () => {
        innerImageZoom();
        await fireEvent.mouseEnter(app.querySelector('.iiz'));
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });

      it('renders the zoomed image with unique src if set', async () => {
        innerImageZoom({ zoomSrc: DATA.src2x });
        await fireEvent.mouseEnter(app.querySelector('.iiz'));
        expect(app.querySelector('.iiz__zoom-img').getAttribute('src')).to.equal(DATA.src2x);
      });

      it('renders the zoomed image on render if zoomPreload is true', () => {
        innerImageZoom({ zoomPreload: true });
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });

      it('renders a scaled zoomed image if zoomScale is set', async () => {
        innerImageZoom({ zoomScale: 0.5 });
        const figure = app.querySelector('.iiz');
        await fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        const zoomImg = app.querySelector('.iiz__zoom-img');
        await fireEvent.load(zoomImg);
        expect(zoomImg.width).to.equal(375);
      });
    });

    describe('show', () => {
      it('show the zoomed image on click', async () => {
        innerImageZoom();
        const figure = app.querySelector('.iiz');
        await fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        const zoomImg = app.querySelector('.iiz__zoom-img');
        await fireEvent.load(zoomImg);
        expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      });

      it('shows the zoomed image on mouse enter if zoomType hover is set', async () => {
        innerImageZoom({ zoomType: 'hover' });
        await fireEvent.mouseEnter(app.querySelector('.iiz'));
        const zoomImg = app.querySelector('.iiz__zoom-img');
        await fireEvent.load(zoomImg);
        expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      });

      it('shows the zoomed image in a fullscreen portal if fullscreenOnMobile is set', async () => {
        global.window.matchMedia = () => ({ matches: true });
        innerImageZoom({ fullscreenOnMobile: true });
        const figure = app.querySelector('.iiz');
        fireEvent.touchStart(figure);
        await fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        expect(document.querySelector('.iiz__zoom-portal')).to.exist;
      });

      it('fires afterZoomIn callback on zoom in', async () => {
        const afterZoomIn = () => app.append('Callback fired!');
        innerImageZoom({ afterZoomIn: afterZoomIn });
        const figure = app.querySelector('.iiz');
        await fireEvent.mouseEnter(figure);
        fireEvent.click(figure);
        await fireEvent.load(app.querySelector('.iiz__zoom-img'));
        expect(getByText(app, 'Callback fired!')).to.exist;
      });
    });
  });

  describe('move', () => {
    it('pans the zoomed image on mouse move', async () => {
      innerImageZoom({ zoomSrc: DATA.src2x });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      await fireEvent.click(figure, { clientY: 100 });
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      const topPosition = zoomImg.style.top;

      await waitFor(() => {
        fireEvent.mouseMove(figure, { clientY: 150 });
        expect(parseInt(topPosition, 10)).to.be.above(parseInt(zoomImg.style.top, 10));
      });
    });

    it('drags the zoomed image if moveType drag is set', async () => {
      innerImageZoom({ zoomSrc: DATA.src2x, moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure, { clientY: 100 });
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      const topPosition = zoomImg.style.top;
      fireEvent.mouseDown(zoomImg, { clientY: 100 });

      await waitFor(() => {
        fireEvent.mouseMove(zoomImg, { clientY: 150 });
        expect(parseInt(topPosition, 10)).to.be.below(parseInt(zoomImg.style.top, 10));
      });
    });
  });

  describe('zoom out', () => {
    it('hides the zoomed image on toggle click', async () => {
      innerImageZoom();
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      await fireEvent.click(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on mouse leave', async () => {
      innerImageZoom();
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      await fireEvent.mouseLeave(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on button click on touch devices', async () => {
      innerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      await fireEvent.click(getByLabelText(app, 'Zoom Out'));
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on click on touch devices if hideCloseButton is true', async () => {
      innerImageZoom({ hideCloseButton: true });
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      await fireEvent.click(figure);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('hides the zoomed image on button click on desktop if moveType is drag', async () => {
      innerImageZoom({ moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.load(zoomImg);
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.true;
      await fireEvent.click(getByLabelText(app, 'Zoom Out'));
      expect(zoomImg.classList.contains('iiz__zoom-img--visible')).to.be.false;
    });

    it('removes the zoomed image after fade transition', async () => {
      innerImageZoom();
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      await fireEvent.mouseLeave(figure);
      const zoomImg = app.querySelector('.iiz__zoom-img');
      await fireEvent.transitionEnd(zoomImg, { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.not.exist;
      });
    });

    it('removes the zoomed image after fade transition on touch devices', async () => {
      innerImageZoom();
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      await fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.not.exist;
      });
    });

    it('removes the fullscreen portal if fullscreenOnMobile is true', async () => {
      global.window.matchMedia = () => ({ matches: true });
      innerImageZoom({ fullscreenOnMobile: true });
      const figure = app.querySelector('.iiz');
      fireEvent.touchStart(figure);
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(document, 'Zoom Out'));

      await waitFor(() => {
        expect(document.querySelector('.iiz__zoom-portal')).to.not.exist;
      });
    });

    it('persists the zoomed image after fade transition if zoomPreload is true', async () => {
      innerImageZoom({ zoomPreload: true });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      await fireEvent.mouseLeave(figure);
      await fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });
    });

    it('persists the zoomed image after clicking the close button if moveType is drag', async () => {
      innerImageZoom({ moveType: 'drag' });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      fireEvent.click(getByLabelText(app, 'Zoom Out'));
      await fireEvent.transitionEnd(app.querySelector('.iiz__zoom-img'), { propertyName: 'opacity' });

      await waitFor(() => {
        expect(app.querySelector('.iiz__zoom-img')).to.exist;
      });
    });

    it('fires afterZoomOut callback on zoom out', async () => {
      const afterZoomOut = () => app.append('Callback fired!');
      innerImageZoom({ afterZoomOut: afterZoomOut });
      const figure = app.querySelector('.iiz');
      await fireEvent.mouseEnter(figure);
      fireEvent.click(figure);
      await fireEvent.mouseLeave(figure);
      expect(getByText(app, 'Callback fired!')).to.exist;
    });
  });
});
