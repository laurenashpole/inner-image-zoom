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
      this.$zoomImg = this.createZoomImg(this.$figure, this.options);
      this.$hint = this.createHint(this.$figure, this.options);
      this.$closeButton = this.createCloseButton(this.$figure, this.options);
      this.$portal = this.createPortal(this.options, this.$zoomImg, this.$closeButton);
    },
    setListeners: function () {
      this.$figure.addEventListener('touchstart', () => this.onTouchStart(), { passive: true });
      this.$figure.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
      this.$figure.addEventListener('click', (e) => this.onClick(e));
      this.$figure.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
      this.$figure.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
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
    createZoomImg: function ($figure, options) {
      const $zoomImg = document.createElement('img');
      $zoomImg.classList.add('iiz__zoom-img');
      $zoomImg.alt = '';
      $zoomImg.draggable = false;
      $zoomImg.style.left = '0px';
      $zoomImg.style.top = '0px';
      $zoomImg.style.transition = `opacity ${options.fadeDuration}ms linear, visibility ${options.fadeDuration}ms linear`;

      if (options.zoomPreload) {
        $zoomImg.setAttribute('src', options.zoomSrc);
        $figure.appendChild($zoomImg);
      }

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

      return $portal;
    },
    onTouchStart: function () {
      if (this.isZoomed) {
        return;
      }

      console.log('TOUCH START');

      this.isTouch = true;
      this.isFullscreen = getFullscreenStatus(this.options.fullscreenOnMobile, this.options.mobileBreakpoint);
      this.currentMoveType = 'drag';
    },
    onMouseEnter: function (e) {
      if (this.isTouch) {
        return;
      }

      console.log('MOUSE ENTER');

      this.isFading = false;
      this.$figure.appendChild(this.$zoomImg);
      this.$zoomImg.src !== this.options.zoomSrc && this.$zoomImg.setAttribute('src', this.options.zoomSrc);
      this.$closeButton && this.$figure.appendChild(this.$closeButton);
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

      console.log('CLICK');

      if (this.isTouch) {
        if (this.isFullscreen) {
          document.body.appendChild(this.$portal);
        } else {
          this.$figure.appendChild(this.$zoomImg).setAttribute('src', this.options.zoomSrc);
          this.$closeButton && this.$figure.appendChild(this.$closeButton);
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
      console.log('LOAD');

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

      console.log('MOUSE MOVE');

      const positions = getMouseMovePositions(e, this.imgProps);
      this.$zoomImg.style.left = `${positions.left}px`;
      this.$zoomImg.style.top = `${positions.top}px`;
    },
    onMouseLeave: function (e) {
      if (this.isTouch) {
        return;
      }

      console.log('MOUSE LEAVE');

      this.currentMoveType === 'drag' && this.isZoomed ? this.onDragEnd(e) : this.onClose(e);
    },
    onDragStart: function (e) {
      if (this.currentMoveType !== 'drag') {
        return;
      }

      console.log('DRAG START');

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

      console.log('DRAG MOVE');

      const positions = getDragMovePositions(e, this.imgProps);
      this.$zoomImg.style.left = `${positions.left}px`;
      this.$zoomImg.style.top = `${positions.top}px`;
    },
    onDragEnd: function (e) {
      if (this.currentMoveType !== 'drag') {
        return;
      }

      console.log('DRAG END');

      this.$zoomImg.removeEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.dragMove);

      if (!this.isTouch) {
        this.isValidDrag = getIsValidDrag(e, this.imgProps);
      }
    },
    onClose: function (e) {
      console.log('CLOSE');

      e.stopPropagation();

      if (!(e.target.classList.contains('iiz__close') && !this.isTouch)) {
        if (!this.isZoomed || this.isFullscreen || !this.options.fadeDuration) {
          this.onTransitionEnd({}, true);
        } else {
          this.isFading = true;
        }
      }

      this.zoomOut();
    },
    onTransitionEnd: function (e, noTransition) {
      if (!noTransition && !this.isFading) {
        return;
      }

      if (noTransition || (e.propertyName === 'opacity' && e.target === this.$zoomImg)) {
        console.log('TRANSITION END');

        if ((this.options.zoomPreload && this.isTouch) || !this.options.zoomPreload) {
          if (this.isFullscreen) {
            document.body.removeChild(this.$portal);
          } else {
            this.$figure.removeChild(this.$zoomImg);
            this.$closeButton && this.$figure.removeChild(this.$closeButton);
          }

          this.imgProps.current = getImgPropsDefaults();
        }

        this.isTouch = false;
        this.isFullscreen = false;
        this.currentMoveType = this.options.moveType;
        this.isFading = false;
      }
    },
    initialMove: function (e) {
      console.log('INITIAL MOVE');

      this.imgProps.offsets = getOffsets(
        window.pageXOffset,
        window.pageYOffset,
        -this.imgProps.bounds.left,
        -this.imgProps.bounds.top
      );

      this.onMouseMove(e);
    },
    initialDrag: function (e) {
      console.log('INITIAL DRAG');

      const initialDragCoords = getInitialDragCoords(e, this.imgProps, this.isFullscreen);
      this.imgProps.bounds = getBounds(this.$img, this.isFullscreen);
      this.imgProps.offsets = getOffsets(0, 0, 0, 0);

      this.onDragMove({
        ...initialDragCoords,
        stopPropagation: () => {}
      });
    },
    zoomIn: function (e) {
      console.log('ZOOM IN');

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
      console.log('ZOOM OUT');

      this.isZoomed = false;
      this.$zoomImg.classList.remove('iiz__zoom-img--visible');
      this.$img.classList.remove('iiz__img--hidden');
      this.$img.style.transitionDelay = '0ms';
      this.$closeButton && this.$closeButton.classList.remove('iiz__close--visible');
      this.options.afterZoomOut && this.options.afterZoomOut();
    }
  };

  return innerImageZoom;
})();

export default InnerImageZoom;
