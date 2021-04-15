<template>
  <div class="my-8">
    <template v-if="$store.state.store.screenReader && $store.state.store.textualOutput">
      <section :aria-labelledby="blok.id" class="bg-var-light py-4 px-5">
        <div :id="blok.id" class="font-bold">Youtube Video: {{blok.title}}</div>
        <div>Beschreibung: {{ blok.description }}</div>
      </section>
    </template>
    <template v-else-if="!$store.state.store.screenReader || $store.state.store.visualOutput">
      <div class="youtube-container flex justify-center items-end mb-3">
        <iframe class="youtube w-full" width="752" height="423" :src="'https://www.youtube-nocookie.com/embed/' + blok.id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
    </template>
  </div>
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
