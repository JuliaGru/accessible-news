<template>
  <div>
    <ScreenReader/>
    <SkipLinks :screenReader="screenReader"/>
    <Header/>
    <div id="content" class="prose mx-auto px-6 py-3">
      <Nuxt/>
    </div>
    <Footer/>
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
      screenReader: false,
      firstCall: true,
    }
  },
  beforeMount() {
    if(localStorage.getItem('sr')) {
      this.screenReader = localStorage.getItem('sr');
      this.firstCall = false;
    } else {
      localStorage.setItem('sr', false);
    }
  }
}
</script>
