<template>
  <section>
    <a href="#skiplink_navigation" :class="skipLink" :style="top">Zur Navigation</a>
    <a href="#skiplink_content" :class="skipLink" :style="top">Zum Inhalt</a>
    <a href="#skiplink_footer" :class="skipLink" :style="top">Zum Footer</a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      skipLink: 'focus:opacity-100 opacity-0 absolute top-10 left-0 p-2 font-bold border-2 bg-white text-gray-700 pointer-events-none',
      top: 'top: 5.5rem'
    }
  },
}
</script>
