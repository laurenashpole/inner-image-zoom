import { getImgPropsDefaults } from './utils';

const InnerImageZoom = (() => {
  function innerImageZoom(selector = '.iiz', options = {}) {
    if (options.$el) {
      return this.init(options.$el, options);
    }

    const $els = document.querySelectorAll(selector);

    if (!$els.length) {
      return;
    }

    if ($els.length > 1) {
      return Array.from($els).map(($el) => {
        return new InnerImageZoom(selector, { ...options, $el });
      });
    }

    return this.init($els[0], options);
  }

  innerImageZoom.prototype = {
    init: function ($el, options) {
      if ($el.tagName !== 'IMG' && !$el.querySelector('img')) {
        return;
      }

      this.setData($el, options);
      this.setSelectors($el);
    },
    setData: function ($el, options) {
      this.options = {
        moveType: 'pan',
        zoomType: 'click',
        zoomScale: 1,
        fadeDuration: 150,
        mobileBreakpoint: 640,
        ...options,
        ...$el.dataset
      };

      if (!this.options.zoomSrc) {
        this.options.zoomSrc = $el.src || $el.querySelector('img').src;
      }

      this.isTouch = false;
      this.isZoomed = false;
      this.isValidDrag = false;
      this.isFading = false;
      this.currentMoveType = this.options.moveType;
      this.imgProps = getImgPropsDefaults();
    },
    setSelectors: function ($el) {
      this.$figure = this.createFigure($el, this.options);
      this.$img = this.createImg(this.$figure);
      this.$zoomImg = this.createZoomImg(this.options);
      this.$hint = this.createHint(this.$figure, this.options);
      this.$closeButton = this.createCloseButton(this.$figure, this.options);
    },
    createFigure: function ($el, options) {
      let $figure = $el;

      if ($el.tagName === 'IMG' || $el.tagName === 'PICTURE') {
        $figure = document.createElement('figure');
        $el.parentNode.insertBefore($figure, $el);
        $el.classList.remove('iiz');
        $figure.appendChild($el);
      }

      $figure.classList.add(...['iiz', ...(options.moveType === 'drag' ? ['iiz--drag'] : [])]);

      return $figure;
    },
    createImg: function ($figure) {
      const $img = $figure.querySelector('img');

      $img.classList.add('iiz__img');
      $img.style.transition = 'opacity 0ms linear, visibility 0ms linear';

      return $img;
    },
    createZoomImg: function (options) {
      const $zoomImg = document.createElement('img');

      $zoomImg.classList.add('iiz__zoom-img');
      $zoomImg.alt = '';
      $zoomImg.draggable = false;
      $zoomImg.style.left = '0px';
      $zoomImg.style.top = '0px';
      $zoomImg.style.transition = `opacity ${options.fadeDuration}ms linear, visibility ${options.fadeDuration}ms linear`;
      options.zoomPreload && $zoomImg.setAttribute('src', options.zoomSrc);

      return $zoomImg;
    },
    createHint: function ($figure, options) {
      if (options.hideHint) {
        return null;
      }

      const $hint = document.createElement('span');

      $hint.classList.add('iiz__btn', 'iiz__hint');
      $figure.appendChild($hint);

      return $hint;
    },
    createCloseButton: function ($figure, options) {
      if (options.hideCloseButton) {
        return null;
      }

      const $closeButton = document.createElement('button');

      $closeButton.classList.add('iiz__btn', 'iiz__close');
      $closeButton['aria-label'] = 'Zoom Out';
      $closeButton.style.transition = `opacity ${options.fadeDuration}ms linear, visibility ${options.fadeDuration}ms linear`;
      $figure.appendChild($closeButton);

      return $closeButton;
    }
  };

  return innerImageZoom;
})();

export default InnerImageZoom;
