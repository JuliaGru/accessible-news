<template>
  <div>
    <rich-text-renderer
      :document="blok.text"
    />
  </div>
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
