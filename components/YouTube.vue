<template>
  <div class="my-8">
    <template v-if="$store.state.store.screenReader">
      <div class="bg-var-light py-4 px-5">
        <span class="block font-bold">YouTube-Video</span>
        <span class="block">Titel: {{ blok.title }}</span>
        <div>Beschreibung: {{ blok.description }}</div>
      </div>
    </template>
    <template v-else>
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
