import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { DATA } from './constants';
import InnerImageZoom from '../packages/vue/src';

describe('vue-inner-image-zoom', () => {
  const innerImageZoom = (props = {}) => {
    return mount(InnerImageZoom, { propsData: { src: DATA.src, ...props } });
  };

  describe('mount', () => {
    describe('container', () => {
      it('renders a figure', () => {
        const app = innerImageZoom();
        expect(app.find('figure')).to.exist;
      });

      it('renders a figure with a custom classname', () => {
        const app = innerImageZoom({ className: DATA.className });
        expect(app.find(`.${DATA.className}`)).to.exist;
      });
    });

    describe('original image', () => {
      it('renders the original image', () => {
        const app = innerImageZoom();
        expect(app.find('.iiz__img')).to.exist;
      });

      it('renders the original image with custom attributes if imgAttributes is set', () => {});

      it('combines image classes if imgAttributes contains className', () => {});

      it('ignores style properties in imgAttributes prop', () => {});

      it('renders the original image with source tags', () => {
        const app = innerImageZoom({ sources: DATA.sources });
        expect(app.findAll('source').length).to.equal(2);
      });

      it('only renders source tags that have srcSet set', () => {
        const app = innerImageZoom({ sources: DATA.invalidSources });
        expect(app.findAll('source').length).to.equal(1);
      });

      it('renders a spacer if width, height, and hasSpacer are set', () => {
        const app = innerImageZoom({ width: 750, height: 500, hasSpacer: true });
        expect(parseInt(app.find('div').element.style['padding-top'])).to.equal(66);
      });

      it('ignores hasSpacer if width or height are not set', () => {
        const app = innerImageZoom({ height: 500, hasSpacer: true });
        expect(app.find('div').element.style['padding-top']).to.equal('');
      });

      it('hides the hint if hideHint is true', () => {
        const app = innerImageZoom({ hideHint: true });
        expect(app.find('.iiz__hint').exists()).to.be.false;
      });
    });
  });
});
