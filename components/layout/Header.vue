<template>
  <header class="mb-8 border-b p-6 relative" style="z-index: 10;">
    <div class="max-w-5xl items-center flex justify-between mx-auto" ref="maxwidth">
      <nuxt-link to="/" title="Zur Startseite" class="home">
        <icon-home/>
      </nuxt-link>
      <NavigationSR ref="nav"/>
      <Navigation ref="nav"/>
    </div>
  </header>
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
      maxWidth: 1024,
    }
  },
  mounted() {
    this.maxWidth = this.$refs.maxwidth.clientWidth;
    window.addEventListener('resize', this.resize);

    this.$store.commit('store/setNavRefMore', this.$refs.nav.$refs.more);
    this.$store.commit('store/setNavMoreIndex', this.$store.state.store.navigation.story.content.navigation.length);
    this.$store.commit('store/setNavItemsLength', this.$refs.nav.$refs.navitems);
    this.$store.commit('store/shortMenu', this.maxWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.maxWidth = this.$refs.maxwidth.clientWidth;
      this.$store.commit('store/shortMenu', this.maxWidth);
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.$store.commit('store/setNavigation', await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-main/?token=${preview_token}&version=draft`));
  },
}
</script>
