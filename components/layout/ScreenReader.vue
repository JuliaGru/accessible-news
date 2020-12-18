<template>
  <section v-if="$parent.firstCall" class="fixed top-auto bottom-0 left-0 shadow w-full bg-white border-t p-4 text-center z-10">
    <p class="pb-2">Verwenden Sie einen Screen Reader?</p>
    <div class="flex justify-center">
      <div role="button" @click="changeScreenReader(true)" class="button font-bold px-2 py-1 mr-2 w-16">Ja</div>
      <div role="button" @click="changeScreenReader(false)" class="button font-bold px-2 py-1 w-16">Nein</div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    changeScreenReader: function (sr) {
      this.$store.commit('store/setReader', sr)
      this.$parent.firstCall = false;
      localStorage.setItem('sr', sr);
    }
  }
}
</script>
