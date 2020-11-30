<template>
  <div>
    <ScreenReader/>
    <SkipLinks :screenReader="screenReader"/>
    <Header/>
    <Nuxt/>
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
    }
  },
}
</script>
