<template>
  <div class="my-8">
    <template v-if="$store.state.store.screenReader && $store.state.store.textualOutput">
      <section :aria-labelledby="id" class="bg-var-light py-4 px-5">
        <span :id="id" class="block font-bold">Bild {{ alt }}</span>
        <span class="block">Bild-Titel: {{ title }}</span>
        <span class="block text-sm">© {{ copyright }}</span>
      </section>
    </template>
    <template v-else-if="!$store.state.store.screenReader || $store.state.store.visualOutput">
      <img :src="source" :alt="alt" :title="title" class="img mb-2" width="800">
      <span class="block">{{ title }}</span>
      <span class="block text-sm text-gray-500">© {{ copyright }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    copyright: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
  }
}
</script>
