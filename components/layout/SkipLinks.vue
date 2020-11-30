<template>
  <section>
    <a href="#navigation" :class="skipLink" :style="top">Zur Navigation</a>
    <a href="#content" :class="skipLink" :style="top">Zum Inhalt</a>
    <a href="#footer" :class="skipLink" :style="top">Zum Footer</a>
  </section>
</template>

<script>
export default {
  props: {
    screenReader: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      skipLink: 'focus:opacity-100 opacity-0 absolute top-10 left-0 p-2 font-bold border-2 bg-white text-gray-700',
      top: 'top: 5.5rem'
    }
  },
}
</script>
