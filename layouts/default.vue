<template>
  <div :class="$store.state.store.theme">
    <header>
      <client-only>
        <VueAnnouncer />
        <ScreenReader/>
      </client-only>
      <a aria-label="Skip Links" id="skiplink" ref="skiplink" href="#" tabindex="-1"></a>
      <SkipLinks/>
      <client-only>
        <Header/>
      </client-only>
    </header>
    <a aria-label="Inhalt" id="skiplink_content" ref="content" href="#" tabindex="-1"></a>
    <main id="content" class="prose mx-auto px-6 py-3">
        <Nuxt/>
    </main>
    <client-only>
      <Footer/>
    </client-only>
  </div>
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
      firstCall: true,
      links: {},
    }
  },
  watch: {
    $route() {
      if($nuxt.$route.hash === "") {
        this.$refs["content"].focus();
      }
    }
  },
  beforeMount() {
    if(localStorage.getItem('sr') && localStorage.getItem('vo') && localStorage.getItem('to')) {
      this.$store.commit('store/setReader', (localStorage.getItem('sr') === 'true'));
      this.$store.commit('store/setVisualOutput', (localStorage.getItem('vo') === 'true'));
      this.$store.commit('store/setTextualOutput', (localStorage.getItem('to') === 'true'));

      if(localStorage.getItem('sr') !== 'true') {
        window.history.pushState({page: 1}, "Overview", "#vo");
      } else {
        window.history.pushState({page: 1}, "Overview", "#sr-vo-" + (localStorage.getItem('vo') === 'true') + "-to-" + (localStorage.getItem('to') === 'true'));
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
