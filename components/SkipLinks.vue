<template>
  <section v-if="screenReader">
    <a href="#navigation">Zur Navigation</a>
    <a href="#content">Zum Inhalt</a>
    <a href="#footer">Zum Footer</a>
  </section>
</template>

<script>
export default {
  props: {
    screenReader: {
      type: Boolean,
      required: true
    }
  }
}
</script>
