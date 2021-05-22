<template>
  <div class="mb-8 border-b p-6 relative" style="z-index: 10;">
      <div class="max-w-5xl items-center flex justify-between mx-auto" ref="maxwidth">
        <nuxt-link to="/" title="Zur Startseite" class="home">
          <icon-home/>
        </nuxt-link>
        <template v-if="$store.state.store.screenReader">
          <NavigationSR :nav="navigation" :width="maxWidth"/>
        </template>
        <template v-else>
          <Navigation :nav="navigation" :width="maxWidth"/>
        </template>
      </div>
  </div>
</template>
<script>
import IconHome from "@/components/icons/icon-home";
import Navigation from "@/components/layout/Navigation";
import NavigationSR from "@/components/layout/NavigationSR";
export default {
  components: {
    NavigationSR,
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
    this.initClientOnlyComp();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.maxWidth = this.$refs.maxwidth.clientWidth;
      this.$store.commit('store/shortMenu', this.maxWidth);
    },
    initClientOnlyComp(count = 10) {
      this.$nextTick(() => {
        if (this.$refs.maxwidth) {
          this.maxWidth = this.$refs.maxwidth.clientWidth;
          window.addEventListener('resize', this.resize);
        } else if (count > 0) {
          this.initClientOnlyComp(count - 1);
        }
      });
    },
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-main/?token=${preview_token}&version=draft`)
  },
}
</script>
