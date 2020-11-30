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
import ScreenReader from '~/components/ScreenReader.vue'
import SkipLinks from '~/components/SkipLinks.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

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
}
</script>
