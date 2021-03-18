<template>
  <div>
    <a aria-label="Footer" id="skiplink_footer" href="#" tabindex="-1"></a>
    <footer id="footer" class="mt-8 border-t p-6" v-bind:class="[ $parent.firstCall ? 'mb-24' : '']">
      <div class="max-w-5xl md:flex justify-center mx-auto text-center">
        <nav>
          <ul class="flex justify-center">
            <li class="mr-3">
              <nuxt-link to="/impressum" title="Impressum">Impressum</nuxt-link>
            </li>
            <li  class="mr-3">
              <nuxt-link to="/datenschutz" title="Datenschutz">Datenschutz</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/hilfe" title="Hilfe">Hilfe</nuxt-link>
            </li>
          </ul>
        </nav>
        <span class="inline-block md:ml-8">© Accessible News {{ $dateFns.format(new Date(), 'yyyy') }}</span>
      </div>
      <div v-if="!$parent.firstCall" class="max-w-5xl mx-auto text-center mt-2 text-sm text-gray-700">
        <template v-if="$store.state.store.screenReader">
          <div class="mb-2">
            <button v-if="$store.state.store.visualOutput" @click="changeVisualOutput(false, 'Sie verwenden textuelle Inhalte')">Zum textuellen Inhalt</button>
            <button v-else @click="changeVisualOutput(true, 'Sie verwenden visuelle Inhalte')">Zum visuellen Inhalt</button>
          </div>
          <button @click="changeScreenReader(false, 'Sie verwenden die visuelle Version')">Zur visuell optimierten Version</button>
        </template>
        <button v-else @click="changeScreenReader(true, 'Sie verwenden die Screen Reader Version')">Zur Screen Reader optimierten Version</button>
      </div>
    </footer>
  </div>
  <!-- icons from https://heroicons.com/ -->
</template>

<script>
export default {
  methods: {
    changeScreenReader: function (sr, text) {
      this.$store.commit('store/setReader', sr)
      localStorage.setItem('sr', sr);
      this.$announcer.assertive(text);
      if(sr) { // if screen reader set to textual output
        this.setOutput(false);
      }

      this.$store.commit('store/setNavMore', false);

      this.$nextTick(function () {
        this.$store.commit('store/setNavItemsLength', this.$parent.$children[4].$children[1].$refs.navitems); //get to navigation
        this.$store.commit('store/shortMenu', this.$parent.$children[4].$refs.maxwidth.clientWidth);
      })
    },

    changeVisualOutput: function (vo, text) {
      this.setOutput(vo);
      this.$announcer.assertive(text);
    },

    setOutput: function (vo) {
      this.$store.commit('store/setVisualOutput', vo)
      localStorage.setItem('vo', vo);
      this.$store.commit('store/setTextualOutput', !vo)
      localStorage.setItem('to', !vo);
    }
  }
}
</script>
