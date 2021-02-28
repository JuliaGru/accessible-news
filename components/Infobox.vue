<template>
  <section aria-labelledby="infoboxID">
    <p id="infoboxID" class="sr-only">Infobox</p>
    <div
      :key="blok._uid"
      v-for="blok in blok.content" class="bg-var-light py-4 px-5 my-8">
      <component :blok="blok" :is="blok.component"/>
    </div>
    <p class="sr-only">Infobox Ende</p>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
