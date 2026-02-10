<template>
  <div class="demo">
    <inner-image-zoom v-bind="$props" />

    <div class="demo__props">
      <div class="demo__card">
        <h3>Props</h3>

        <ul>
          <template v-for="(value, key) in $props" :key="key">
            <li v-if="key !== 'imgAttributes' && value">
              <strong>{{key}}:</strong> {{value}}
            </li>
          </template>
        </ul>
      </div>

      <div v-if="Object.keys($props.imgAttributes).length" class="demo__card">
        <h3>Img Attributes</h3>

        <ul>
          <template v-for="(value, key) in $props.imgAttributes" :key="key">
            <li v-if="value">
              <strong>{{key}}:</strong> {{value}}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import InnerImageZoom from '../../packages/vue/src/InnerImageZoom/InnerImageZoom.vue';

export default {
  name: 'Demo',
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
    imgAttributes: {
      type: Object,
      default: () => ({})
    },
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
  components: {
    InnerImageZoom
  }
};
</script>
