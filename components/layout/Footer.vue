<template>
  <footer id="footer" class="mt-8 border-t p-6" v-bind:class="[ $parent.firstCall ? 'mb-24' : '']">
    <div class="max-w-5xl md:flex justify-center mx-auto text-center">
      <nav>
        <ul class="flex justify-center">
          <li class="mr-3">
            <nuxt-link
              class="text-teal-600 hover:underline"
              to="/impressum">
              Impressum
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="text-teal-600 hover:underline"
              to="/datenschutz">
              Datenschutz
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <span class="inline-block md:ml-8">© Accessible News 2020</span>
    </div>
    <div v-if="!$parent.firstCall" class="max-w-5xl mx-auto text-center mt-2 text-sm text-gray-500">
      <button v-if="$parent.screenReader" @click="changeScreenReader(false, 'Visuelle Version')">Zur visuell optimierten Version</button>
      <button v-else @click="changeScreenReader(true, 'Screen Reader Version')">Zur Screen Reader optimierten Version</button>
    </div>
  </footer>
  <!-- icons from https://heroicons.com/ -->
</template>

<script>
export default {
  methods: {
    changeScreenReader: function (sr, text) {
      this.$parent.screenReader = sr;
      localStorage.setItem('sr', sr);
      this.$announcer.assertive(text)
    }
  }
}
</script>
