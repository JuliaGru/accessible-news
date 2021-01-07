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

.theme-default {
   --theme-color: #CCC;
   --theme-color-rgb: 204, 204, 204;
   --theme-color-dark: #6d6d6d;
}

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

.theme-wirtschaft {
   --theme-color: #D8DEC1;
   --theme-color-rgb: 216, 222, 193;
   --theme-color-dark: #6f7556;
}

.theme-web {
   --theme-color: #B7CCA3;
   --theme-color-rgb: 183, 204, 163;
   --theme-color-dark: #637353;
}

.theme-sport {
   --theme-color: #C6DC73;
   --theme-color-rgb: 198, 220, 115;
   --theme-color-dark: #637d00;
}

.theme-panorama {
   --theme-color: #AED4AE;
   --theme-color-rgb: 174, 212, 174;
   --theme-color-dark: #4c7d4c;
}

.theme-kultur {
   --theme-color: #D2D0CF;
   --theme-color-rgb: 210, 208, 207;
   --theme-color-dark: #736f6d;
}

.theme-etat {
   --theme-color: #FFCC66;
   --theme-color-rgb: 255, 204, 102;
   --theme-color-dark: #966400;
}

.theme-wissenschaft {
   --theme-color: #CFD3DD;
   --theme-color-rgb: 207, 211, 221;
   --theme-color-dark: #6c717d;
}

.theme-lifestyle {
   --theme-color: #D4EDD4;
   --theme-color-rgb: 212, 237, 212;
   --theme-color-dark: #557755;
}

.theme-diskurs {
   --theme-color: #F8CBC9;
   --theme-color-rgb: 248, 203, 201;
   --theme-color-dark: #ab5652;
}

.theme-immobilien {
   --theme-color: #C3DCBC;
   --theme-color-rgb: 195, 220, 188;
   --theme-color-dark: #447d34;
}

.theme-gesundheit {
   --theme-color: #ECBEAC;
   --theme-color-rgb: 236, 190, 172;
   --theme-color-dark: #a5593c;
}

.theme-recht {
   --theme-color: #ECD0F1;
   --theme-color-rgb: 236, 208, 241;
   --theme-color-dark: #864f90;
}

.theme-diestandard {
   --theme-color: #FFDFC2;
   --theme-color-rgb: 255, 223, 194;
   --theme-color-dark: #9a5f2a;
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
