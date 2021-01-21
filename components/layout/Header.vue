<template>
  <header class="mb-8 border-b p-6">
    <div class="max-w-5xl md:flex justify-between mx-auto" ref="maxwidth">
      <nuxt-link to="/" title="Zur Startseite" class="home">
        <icon-home/>
      </nuxt-link>
      <Navigation :nav="navigation" :width="maxWidth"/>
    </div>
  </header>
</template>
<script>
import IconHome from "@/components/icons/icon-home";
import Navigation from "@/components/layout/Navigation";
export default {
  components: {
    Navigation,
    IconHome
  },
  data() {
    return {
      navigation: {},
      maxWidth: 1024,
    }
  },
  mounted() {
    this.maxWidth = this.$refs.maxwidth.clientWidth;
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.maxWidth = this.$refs.maxwidth.clientWidth;
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-main/?token=${preview_token}&version=draft`)
  },
}
</script>
