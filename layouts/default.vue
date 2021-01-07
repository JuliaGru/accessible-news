<template>
  <div :class="$store.state.store.theme">
    <VueAnnouncer />
    <ScreenReader/>
    <a aria-label="Skip Links" id="skiplink" ref="skiplink" href="#" tabindex="-1"></a>
    <SkipLinks/>
    <Header/>
    <a aria-label="Inhalt" id="skiplink_content" href="#" tabindex="-1"></a>
    <div id="content" class="prose mx-auto px-6 py-3">
      <Nuxt/>
    </div>
    <Footer/>
  </div>
</template>

<style>
.theme-international {
  --theme-color: #C1D9D9;
  --theme-color-rgb: 193,217, 217;
  --theme-color-dark: #507371;
}

.theme-inland {
   --theme-color: #D7E3E8;
   --theme-color-rgb: 215, 227, 232;
   --theme-color-dark: #415963;
 }
</style>

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
      firstCall: true,
      links: {},
    }
  },
  watch: {
    $route() {
      if($nuxt.$route.hash === "") {
        this.$refs["skiplink"].focus();
      }
    }
  },
  beforeMount() {
    if(localStorage.getItem('sr')) {
      if (localStorage.getItem('sr') === 'true') {
        this.$store.commit('store/setReader', true)
      } else {
        this.$store.commit('store/setReader', false)
      }
      this.firstCall = false;
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.links = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/links?starts_with=articles/&token=${preview_token}`)
  },
}
</script>
