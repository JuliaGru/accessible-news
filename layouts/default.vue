<template>
  <section>
    <VueAnnouncer />
    <ScreenReader/>
    <SkipLinks :screenReader="screenReader"/>
    <Header/>
    <div id="content" class="prose mx-auto px-6 py-3">
      <Nuxt/>
    </div>
    <Footer/>
  </section>
</template>

<script>
import ScreenReader from '~/components/layout/ScreenReader.vue'
import SkipLinks from '~/components/layout/SkipLinks.vue'
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

export default {
  components: {
    ScreenReader,
    SkipLinks,
    Header,
    Footer
  },
  data() {
    return {
      screenReader: false,
      firstCall: true,
      links: {},
    }
  },
  beforeMount() {
    if(localStorage.getItem('sr')) {
      if (localStorage.getItem('sr') === 'true') {
        this.screenReader = true;
      } else {
        this.screenReader = false;
      }
      this.firstCall = false;
    } else {
      localStorage.setItem('sr', false);
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.links = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/links?starts_with=articles/&token=${preview_token}`)
  },
}
</script>
