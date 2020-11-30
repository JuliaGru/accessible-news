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
      <button v-if="$parent.screenReader" @click="changeScreenReader(false)">Change to visual optimized version</button>
      <button v-else @click="changeScreenReader(true)">Change to screen reader optimized version</button>
    </div>
  </footer>
  <!-- icons from https://heroicons.com/ -->
</template>

<script>
export default {
  methods: {
    changeScreenReader: function (sr) {
      this.$parent.screenReader = sr;
    }
  }
}
</script>
