<template>
  <section v-if="$parent.firstCall" class="fixed top-auto bottom-0 left-0 shadow w-full bg-white border-t p-4 text-center">
    <p class="pb-2">Are you using a screen reader?</p>
    <button @click="changeScreenReader(true)" class="bg-teal-600 text-white px-2 pb-1 mr-2">Yes</button>
    <button @click="changeScreenReader(false)" class="bg-teal-600 text-white px-2 pb-1">No</button>
  </section>
</template>

<script>
export default {
  methods: {
    changeScreenReader: function (sr) {
      this.$parent.screenReader = sr;
      this.$parent.firstCall = false;
      localStorage.setItem('sr', sr);
    }
  }
}
</script>
