<template>
  <figure
    class="iiz"
    ref="img"
    v-bind:class="{
      [className]: className,
      'iiz--drag': currentMoveType === 'drag'
    }"
    v-bind:style="{
      width: `${width}px`
    }"
    v-on="{
      touchstart: isZoomed ? () => {} : handleTouchStart,
      click: handleClick,
      mouseenter: isTouch ? () => {} : handleMouseEnter,
      mousemove: currentMoveType === 'drag' || !isZoomed ? () => {} : handleMouseMove,
      mouseleave: isTouch ? () => {} : handleMouseLeave
    }"
  >
    <div
      v-bind:style="{
        paddingTop: createSpacer ? `${(height / width) * 100}%` : null
      }"
    >
      <template v-if="validSources">
        <picture>
          <source
            v-for="(source, i) in validSources"
            v-bind:key="i"
            v-bind="source"
          />
          <img
            class="iiz__img"
            v-bind:class="{ 'iiz__img--hidden': isZoomed, 'iiz__img--abs': createSpacer }"
            v-bind:style="{
              transition: `linear 0ms opacity ${isZoomed ? fadeDuration : 0}ms, linear 0ms visibility ${
                isZoomed ? fadeDuration : 0
              }ms`
            }"
            v-bind:src="src"
            v-bind:srcSet="srcSet"
            v-bind:sizes="sizes"
            v-bind:alt="alt"
          />
        </picture>
      </template>

      <template v-else>
        <img
          class="iiz__img"
          v-bind:class="{ 'iiz__img--hidden': isZoomed, 'iiz__img--abs': createSpacer }"
          v-bind:style="{
            transition: `linear 0ms opacity ${isZoomed ? fadeDuration : 0}ms, linear 0ms visibility ${
              isZoomed ? fadeDuration : 0
            }ms`
          }"
          v-bind:src="src"
          v-bind:srcSet="srcSet"
          v-bind:sizes="sizes"
          v-bind:alt="alt"
        />
      </template>
    </div>

    <template v-if="isActive">
      <template v-if="isFullscreen">
        <teleport to="body">
          <div class="iiz__zoom-portal">
            <img
              class="iiz__zoom-img"
              alt=""
              :draggable="false"
              v-bind:class="{ 'iiz__zoom-img--visible': isZoomed }"
              v-bind:style="{
                top: `${top}px`,
                left: `${left}px`,
                transition: `linear ${isFullscreen ? 0 : fadeDuration}ms opacity, linear ${
                  isFullscreen ? 0 : fadeDuration
                }ms visibility`
              }"
              v-bind:src="zoomSrc || src"
              v-on="{
                load: handleLoad,
                touchstart: handleDragStart,
                touchend: handleDragEnd,
                mousedown: handleDragStart,
                mouseup: handleDragEnd,
                click: handleClick
              }"
            />

            <button
              v-if="isTouch && !hideCloseButton"
              type="button"
              class="iiz__btn iiz__close"
              aria-label="Zoom Out"
              v-bind:class="{ 'iiz__close--visible': isZoomed }"
              v-bind:style="{
                transition: `linear ${isFullscreen ? 0 : fadeDuration}ms opacity, linear ${
                  isFullscreen ? 0 : fadeDuration
                }ms visibility`
              }"
              v-on:click.stop="handleClose"
            />
          </div>
        </teleport>
      </template>

      <template v-else>
        <img
          class="iiz__zoom-img"
          alt=""
          :draggable="false"
          v-bind:class="{ 'iiz__zoom-img--visible': isZoomed }"
          v-bind:style="{
            top: `${top}px`,
            left: `${left}px`,
            transition: `linear ${isFullscreen ? 0 : fadeDuration}ms opacity, linear ${
              isFullscreen ? 0 : fadeDuration
            }ms visibility`
          }"
          v-bind:src="zoomSrc || src"
          v-on="{
            load: handleLoad,
            touchstart: handleDragStart,
            touchend: handleDragEnd,
            mousedown: handleDragStart,
            mouseup: handleDragEnd
          }"
        />

        <button
          v-if="isTouch && !hideCloseButton"
          class="iiz__btn iiz__close"
          type="button"
          aria-label="Zoom Out"
          v-bind:class="{ 'iiz__close--visible': isZoomed }"
          v-bind:style="{
            transition: `linear ${isFullscreen ? 0 : fadeDuration}ms opacity, linear ${
              isFullscreen ? 0 : fadeDuration
            }ms visibility`
          }"
          v-on:click.stop="handleClose"
        />
      </template>
    </template>

    <span v-if="!isZoomed && !hideHint" class="iiz__btn iiz__hint"></span>
  </figure>
</template>

<script>
import {
  getBounds,
  getFullscreenStatus,
  getImgPropsDefaults,
  getOffsets,
  getRatios,
  getScaledDimensions
} from 'inner-image-zoom/src/utils/images';

import {
  getDragMovePositions,
  getEventCoords,
  getInitialDragCoords,
  getIsValidDrag,
  getMouseMovePositions
} from 'inner-image-zoom/src/utils/events';

export default {
  name: 'InnerImageZoom',
  props: {
    moveType: {
      type: String,
      default: 'pan'
    },
    zoomType: {
      type: String,
      default: 'click'
    },
    src: {
      type: String,
      required: true
    },
    srcSet: String,
    sizes: String,
    sources: Array,
    width: Number,
    height: Number,
    hasSpacer: Boolean,
    zoomSrc: String,
    zoomScale: {
      type: Number,
      default: 1
    },
    zoomPreload: Boolean,
    alt: String,
    fadeDuration: {
      type: Number,
      default: 150
    },
    fullscreenOnMobile: Boolean,
    mobileBreakpoint: {
      type: Number,
      default: 640
    },
    hideHint: Boolean,
    hideCloseButton: Boolean,
    className: String,
    afterZoomIn: Function,
    afterZoomOut: Function
  },
  data() {
    return {
      isActive: this.zoomPreload || false,
      isTouch: false,
      isZoomed: false,
      isFullscreen: false,
      isDragging: false,
      currentMoveType: this.moveType,
      left: 0,
      top: 0,
      imgProps: {}
    };
  },
  created() {
    this.imgProps = getImgPropsDefaults();

    if (getFullscreenStatus(this.fullscreenOnMobile, this.mobileBreakpoint)) {
      this.isActive = false;
    }
  },
  computed: {
    validSources: function () {
      return this.sources ? this.sources.filter((source) => source.srcSet) : [];
    },
    createSpacer: function () {
      return this.width && this.height && this.hasSpacer;
    }
  },
  methods: {
    handleMouseEnter(e) {
      this.isActive = true;
      this.zoomType === 'hover' && !this.isZoomed && this.handleClick(e);
    },
    handleTouchStart() {
      this.isTouch = true;
      this.isFullscreen = getFullscreenStatus(this.fullscreenOnMobile, this.mobileBreakpoint);
      this.currentMoveType = 'drag';
    },
    handleClick(e) {
      if (this.isZoomed) {
        if (this.isTouch) {
          this.hideCloseButton && this.handleClose();
        } else {
          !this.isDragging && this.zoomOut();
        }

        return;
      }

      if (this.isTouch) {
        this.isActive = true;
      }

      if (this.imgProps.zoomImg) {
        this.handleLoad({ target: this.imgProps.zoomImg });
        this.zoomIn(e);
      } else {
        this.imgProps.onLoadCallback = this.zoomIn.bind(this, e);
      }
    },
    handleLoad(e) {
      const scaledDimensions = getScaledDimensions(e.target, this.zoomScale);

      this.imgProps.zoomImg = e.target;
      this.imgProps.zoomImg.setAttribute('width', scaledDimensions.width);
      this.imgProps.zoomImg.setAttribute('height', scaledDimensions.height);
      this.imgProps.scaledDimensions = scaledDimensions;
      this.imgProps.bounds = getBounds(this.$refs.img, false);
      this.imgProps.ratios = getRatios(this.imgProps.bounds, scaledDimensions);

      if (this.imgProps.onLoadCallback) {
        this.imgProps.onLoadCallback();
        this.imgProps.onLoadCallback = null;
      }
    },
    handleMouseMove(e) {
      const positions = getMouseMovePositions(e, this.imgProps);
      this.left = positions.left;
      this.top = positions.top;
    },
    handleDragStart(e) {
      const coords = getEventCoords(e);

      this.imgProps.offsets = getOffsets(
        coords.x,
        coords.y,
        this.imgProps.zoomImg.offsetLeft,
        this.imgProps.zoomImg.offsetTop
      );

      this.imgProps.zoomImg.addEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.handleDragMove, {
        passive: true
      });

      if (!this.isTouch) {
        this.imgProps.eventPosition = coords;
      }
    },
    handleDragMove(e) {
      const positions = getDragMovePositions(e, this.imgProps);
      this.left = positions.left;
      this.top = positions.top;
    },
    handleDragEnd(e) {
      this.imgProps.zoomImg.removeEventListener(this.isTouch ? 'touchmove' : 'mousemove', this.handleDragMove);

      if (!this.isTouch) {
        this.isDragging = getIsValidDrag(e, this.imgProps)
      }
    },
    handleMouseLeave(e) {
      this.currentMoveType === 'drag' && this.isZoomed ? this.handleDragEnd(e) : this.handleClose();
    },
    handleClose() {
      this.zoomOut(() => {
        setTimeout(
          () => {
            if ((this.zoomPreload && this.isTouch) || !this.zoomPreload) {
              this.isActive = false;
              this.imgProps = getImgPropsDefaults();
            }

            this.isTouch = false;
            this.isFullscreen = false;
            this.currentMoveType = this.moveType;
          },
          this.isFullscreen ? 0 : this.fadeDuration
        );
      });
    },
    initialMove(e) {
      this.imgProps.offsets = getOffsets(
        window.pageXOffset,
        window.pageYOffset,
        -this.imgProps.bounds.left,
        -this.imgProps.bounds.top
      );

      this.handleMouseMove(e);
    },
    initialDragMove(e) {
      const initialDragCoords = getInitialDragCoords(e, this.imgProps, this.isFullscreen);
      this.imgProps.bounds = getBounds(this.$refs.img, this.isFullscreen);
      this.imgProps.offsets = getOffsets(0, 0, 0, 0);

      this.handleDragMove({
        ...initialDragCoords,
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    },
    zoomIn(e) {
      this.isZoomed = true;
      this.currentMoveType === 'drag' ? this.initialDragMove(e) : this.initialMove(e);
      this.afterZoomIn && this.afterZoomIn();
    },
    zoomOut(callback) {
      this.isZoomed = false;
      this.afterZoomOut && this.afterZoomOut();
      callback && callback();
    }
  }
};
</script>

<style scoped>
  @import '../styles.css';
</style>
