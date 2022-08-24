import { expect } from 'chai';
import { DATA } from './constants';
import InnerImageZoom from '../src/vanilla';
import '../src/styles.css';

describe('InnerImageZoom', () => {
  let app;

  before(() => {
    app = document.createElement('div');
    document.body.appendChild(app);
  });

  after(() => {
    document.body.removeChild(app);
  });

  const createImg = (attrs) => {
    attrs = { src: DATA.src, ...(attrs || {}) };
    return `<img ${Object.keys(attrs).map((key) => `${key}="${attrs[key]}"`).join(' ')} />`;
  };

  const createSources = () => (
    DATA.sources.map((src) => `<source srcset="${src.srcSet}" media="${src.media}" />`).join('')
  );

  describe('mount', () => {
    describe('container', () => {
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
});
