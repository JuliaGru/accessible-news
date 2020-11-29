<template>
  <section>
    <rich-text-renderer
      :document="blok.text"
    />
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
  }
}
</script>
