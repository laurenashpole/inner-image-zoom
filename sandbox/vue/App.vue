<template>
  <div id="app">
    <h1>vue-inner-image-zoom Sandbox</h1>

    <section>
      <h2>Pan Demo</h2>

      <demo
        src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=750&q=80"
        zoomSrc="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=1500&q=80"
        :sources="[
          {
            srcSet: `https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=750, https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=1500 2x`,
            media: '(min-width: 768px)'
          },
          {
            srcSet: `https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=1000, https://images.unsplash.com/photo-1525253086316-d0c936c814f8?fit=crop&w=2000 2x`,
            media: '(min-width: 1024px)'
          }
        ]"
        :fullscreenOnMobile="true"
        :hideHint="true"
        :fadeDuration="0"
        :imgAttributes="{
          style: {
            transition: 'none'
          }
        }"
      />
    </section>

    <section>
      <h2>Drag Demo</h2>

      <demo
        src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?fit=crop&w=1500&q=80"
        moveType="drag"
        :fullscreenOnMobile="false"
        :width="750"
        :height="500"
        :hasSpacer="true"
      />
    </section>

    <section>
      <h2>Zoom on Hover Demo</h2>

      <demo
        src="https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?fit=crop&w=750&q=80"
        zoomSrc="https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?fit=crop&w=1500&q=80"
        zoomType="hover"
        :fullscreenOnMobile="true"
        :zoomScale="0.9"
        :zoomPreload="true"
      />
    </section>
  </div>
</template>

<script>
import Demo from './Demo.vue';
import '../shared/styles.css';

export default {
  name: 'App',
  components: {
    Demo
  },
};
</script>
