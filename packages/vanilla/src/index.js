import {
  getBounds,
  getFullscreenStatus,
  getImgPropsDefaults,
  getOffsets,
  getRatios,
  getScaledDimensions
} from './utils/images';

import {
  getDragMovePositions,
  getEventCoords,
  getInitialDragCoords,
  getIsValidDrag,
  getMouseMovePositions
} from './utils/events';

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
      this.setListeners();
    },
    reinit: function (options) {
      this.uninit();
      this.init(this.$el, options);
    },
    uninit: function () {
      this.$container.parentNode && this.$container.parentNode.replaceChild(this.$el, this.$container);
      this.$portal && document.body.removeChild(this.$portal);
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
      this.isClosing = false;
      this.currentMoveType = this.options.moveType;
      this.imgProps = getImgPropsDefaults();
    },
    setSelectors: function ($el) {
      this.$el = $el.cloneNode(true);
      this.$container = this.createFigure($el, this.options);
      this.$img = this.createImg(this.$container);
      this.$zoomImg = this.createZoomImg(this.$container, this.options);
      this.$hint = this.createHint(this.$container, this.options);
      this.$closeButton = this.createCloseButton(this.$container, this.options);
      this.$portal = this.createPortal(this.options, this.$zoomImg, this.$closeButton);
    },
    setListeners: function () {
      this.$container.addEventListener('touchstart', () => this.onTouchStart(), { passive: true });
      this.$container.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
      this.$container.addEventListener('click', (e) => this.onClick(e));
      this.$container.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
      this.$container.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
      this.$zoomImg.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
      this.$zoomImg.addEventListener('touchend', (e) => this.onDragEnd(e), { passive: true });
      this.$zoomImg.addEventListener('mousedown', (e) => this.onDragStart(e));
      this.$zoomImg.addEventListener('mouseup', (e) => this.onDragEnd(e));
      this.$zoomImg.onload = () => this.onLoad();
      this.$zoomImg.addEventListener('transitionend', (e) => this.onTransitionEnd(e));
      this.$closeButton && this.$closeButton.addEventListener('click', (e) => this.onClose(e));
      this.dragMove = (e) => this.onDragMove(e);
    },
    createFigure: function ($el, options) {
      let $container = $el;

      if ($el.tagName === 'IMG' || $el.tagName === 'PICTURE') {
        $container = document.createElement('figure');
        $el.parentNode.insertBefore($container, $el);
        $el.classList.remove('iiz');
        $container.appendChild($el);
      }

      $container.classList.add(...['iiz', ...(options.moveType === 'drag' ? ['iiz--drag'] : [])]);

      return $container;
    },
    createImg: function ($container) {
      const $img = $container.querySelector('img');
      $img.classList.add('iiz__img');
      $img.style.transition = 'opacity 0ms linear, visibility 0ms linear';

      return $img;
    },
    createZoomImg: function ($container, options) {
      const $zoomImg = document.createElement('img');
      $zoomImg.classList.add('iiz__zoom-img');
      $zoomImg.alt = '';
      $zoomImg.draggable = false;
      $zoomImg.style.left = '0px';
      $zoomImg.style.top = '0px';
      $zoomImg.style.transition = `opacity ${options.fadeDuration}ms linear, visibility ${options.fadeDuration}ms linear`;

      if (options.zoomPreload) {
        $zoomImg.setAttribute('src', options.zoomSrc);
        $container.appendChild($zoomImg);
      }

      return $zoomImg;
    },
    createHint: function ($container, options) {
      if (options.hideHint) {
        return null;
      }

      const $hint = document.createElement('span');
      $hint.classList.add('iiz__btn', 'iiz__hint');
      $container.appendChild($hint);

      return $hint;
    },
    createCloseButton: function ($container, options) {
      if (options.hideCloseButton) {
        return null;
      }

      const $closeButton = document.createElement('button');
      $closeButton.classList.add('iiz__btn', 'iiz__close');
      $closeButton.setAttribute('aria-label', 'Zoom Out');
      $closeButton.style.transition = `opacity ${options.fadeDuration}ms linear, visibility ${options.fadeDuration}ms linear`;

      return $closeButton;
    },
    createPortal: function (options, $zoomImg, $closeButton) {
      if (!options.fullscreenOnMobile) {
        return null;
      }

      const $portal = document.createElement('div');
      $portal.classList.add('iiz__zoom-portal');
      $portal.appendChild($zoomImg).setAttribute('src', this.options.zoomSrc);
      $closeButton && $portal.appendChild($closeButton);

      if ($closeButton) {
        $portal.appendChild($closeButton);
      } else {
        $zoomImg.addEventListener('click', (e) => this.onClick(e));
      }

      return $portal;
    },
    onTouchStart: function () {
      if (this.isZoomed) {
        return;
      }

      this.isTouch = true;
      this.isFullscreen = getFullscreenStatus(this.options.fullscreenOnMobile, this.options.mobileBreakpoint);
      this.currentMoveType = 'drag';
    },
    onMouseEnter: function (e) {
      if (this.isTouch) {
        return;
      }

      this.isClosing = false;
      this.$container.appendChild(this.$zoomImg);
      this.$zoomImg.src !== this.options.zoomSrc && this.$zoomImg.setAttribute('src', this.options.zoomSrc);
      this.$closeButton && this.$container.appendChild(this.$closeButton);
      this.options.zoomType === 'hover' && !this.isZoomed && this.onClick(e);
    },
    onClick: function (e) {
      if (this.isZoomed) {
        if (this.isTouch) {
          !this.$closeButton && this.onClose(e);
        } else {
          !this.isValidDrag && this.zoomOut();
        }

        return;
      }

      if (this.isTouch) {
        if (this.isFullscreen) {
          document.body.appendChild(this.$portal);
        } else {
          this.$container.appendChild(this.$zoomImg).setAttribute('src', this.options.zoomSrc);
          this.$closeButton && this.$container.appendChild(this.$closeButton);
        }
      }

      if (this.$zoomImg.complete) {
        this.onLoad();
        this.zoomIn(e);
      } else {
        this.imgProps.onLoadCallback = this.zoomIn.bind(this, e);
      }
    },
    onLoad: function () {
      const scaledDimensions = getScaledDimensions(this.$zoomImg, this.options.zoomScale);
      this.$zoomImg.setAttribute('width', scaledDimensions.width);
      this.$zoomImg.setAttribute('height', scaledDimensions.height);
      this.imgProps.scaledDimensions = scaledDimensions;
      this.imgProps.bounds = getBounds(this.$img, false);
      this.imgProps.ratios = getRatios(this.imgProps.bounds, scaledDimensions);

      if (this.imgProps.onLoadCallback) {
        this.imgProps.onLoadCallback();
        this.imgProps.onLoadCallback = null;
      }
    },
    onMouseMove: function (e) {
      if (this.currentMoveType === 'drag' || !this.isZoomed) {
        return;
      }

      const positions = getMouseMovePositions(e, this.imgProps);
      this.$zoomImg.style.left = `${positions.left}px`;
      this.$zoomImg.style.top = `${positions.top}px`;
    },
    onMouseLeave: function (e) {
      if (this.isTouch) {
        return;
      }

      this.currentMoveType === 'drag' && this.isZoomed ? this.onDragEnd(e) : this.onClose(e);
    },
    onDragStart: function (e) {
      if (this.currentMoveType !== 'drag') {
        return;
      }

      const coords = getEventCoords(e);
      this.imgProps.offsets = getOffsets(coords.x, coords.y, this.$zoomImg.offsetLeft, this.$zoomImg.offsetTop);
      this.$zoomImg.addEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.dragMove, { passive: true });

      if (!this.isTouch) {
        this.imgProps.eventPosition = coords;
      }
    },
    onDragMove: function (e) {
      e.stopPropagation();

      if (this.currentMoveType !== 'drag' || !this.isZoomed) {
        return;
      }

      const positions = getDragMovePositions(e, this.imgProps);
      this.$zoomImg.style.left = `${positions.left}px`;
      this.$zoomImg.style.top = `${positions.top}px`;
    },
    onDragEnd: function (e) {
      if (this.currentMoveType !== 'drag') {
        return;
      }

      this.$zoomImg.removeEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.dragMove);

      if (!this.isTouch) {
        this.isValidDrag = getIsValidDrag(e, this.imgProps);
      }
    },
    onClose: function (e) {
      e.stopPropagation();

      if (!(e.target.classList.contains('iiz__close') && !this.isTouch)) {
        if (!this.isZoomed || this.isFullscreen || !this.options.fadeDuration) {
          this.cleanup();
        } else {
          this.isClosing = true;
        }
      }

      this.isZoomed && this.zoomOut();
    },
    onTransitionEnd: function (e) {
      this.isClosing && e.propertyName === 'opacity' && e.target === this.$zoomImg && this.cleanup();
    },
    initialMove: function (e) {
      this.imgProps.offsets = getOffsets(
        window.pageXOffset,
        window.pageYOffset,
        -this.imgProps.bounds.left,
        -this.imgProps.bounds.top
      );

      this.onMouseMove(e);
    },
    initialDrag: function (e) {
      const initialDragCoords = getInitialDragCoords(e, this.imgProps, this.isFullscreen);
      this.imgProps.bounds = getBounds(this.$img, this.isFullscreen);
      this.imgProps.offsets = getOffsets(0, 0, 0, 0);

      this.onDragMove({
        ...initialDragCoords,
        stopPropagation: () => {}
      });
    },
    zoomIn: function (e) {
      this.isZoomed = true;
      this.$zoomImg.classList.add('iiz__zoom-img--visible');
      this.$zoomImg.style.transitionDuration = `${this.isFullscreen ? 0 : this.options.fadeDuration}ms`;
      this.$img.classList.add('iiz__img--hidden');
      this.$img.style.transitionDelay = `${this.isFullscreen ? 0 : this.options.fadeDuration}ms`;

      if (this.$closeButton && this.currentMoveType === 'drag') {
        this.$closeButton.classList.add('iiz__close--visible');
        this.$closeButton.style.transitionDuration = `${this.isFullscreen ? 0 : this.options.fadeDuration}ms`;
      }

      this.currentMoveType === 'drag' ? this.initialDrag(e) : this.initialMove(e);
      this.options.afterZoomIn && this.options.afterZoomIn();
    },
    zoomOut: function () {
      this.isZoomed = false;
      this.$zoomImg.classList.remove('iiz__zoom-img--visible');
      this.$img.classList.remove('iiz__img--hidden');
      this.$img.style.transitionDelay = '0ms';
      this.$closeButton && this.$closeButton.classList.remove('iiz__close--visible');
      this.options.afterZoomOut && this.options.afterZoomOut();
    },
    cleanup: function () {
      if ((this.options.zoomPreload && this.isTouch) || !this.options.zoomPreload) {
        if (this.isFullscreen) {
          document.body.removeChild(this.$portal);
        } else {
          this.$container.removeChild(this.$zoomImg);
          this.$closeButton && this.$container.removeChild(this.$closeButton);
        }

        this.imgProps.current = getImgPropsDefaults();
      }

      this.isTouch = false;
      this.isFullscreen = false;
      this.currentMoveType = this.options.moveType;
      this.isClosing = false;
    }
  };

  return innerImageZoom;
})();

export default InnerImageZoom;
