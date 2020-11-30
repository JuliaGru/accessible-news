<template>
  <section class="m-4">
    <p>Are you using a screen reader?</p>
    <button @click="changeScreenReader(true)">Yes</button>
    <button @click="changeScreenReader(false)">No</button>
    <div class="mt-4" v-if="$parent.screenReader">
      Using a screen reader
    </div>
  </section>
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
