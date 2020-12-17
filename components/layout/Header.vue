<template>
  <header class="mb-8 border-b p-6">
    <div class="max-w-5xl md:flex justify-between mx-auto">
      <nuxt-link
        class="text-teal-600 hover:underline"
        to="/" title="Zur Startseite">
        <icon-home/>
      </nuxt-link>
      <Navigation :nav="navigation"/>
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
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-main/?token=${preview_token}&version=draft`)
  },
}
</script>
