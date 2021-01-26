<template>
  <div class="block h-full mt-4">
    <template v-if="!$store.state.store.screenReader">

      <template v-if="articleContent.image.id !== null">
        <nuxt-link :to="articleLink" :title="articleContent.name">
          <div class="teaser-image flex justify-center items-end mb-3">
            <img :src="articleContent.image.filename" :alt="articleContent.image.alt" :title="articleContent.image.title" class="img w-full" width="500" />
          </div>
        </nuxt-link>
      </template>
      <template v-else>
        <div class="teaser-image bg-var-light mb-3"></div>
      </template>

      <div class="uppercase font-bold text-gray-500">{{ articleContent.tag }}</div>
    </template>


    <nuxt-link :to="articleLink">
      <h2 class="font-bold pb-4" style="margin: 0">
        {{ articleContent.name }}
      </h2>
    </nuxt-link>
    <div v-if="$store.state.store.screenReader">
      <div class="font-bold mb-2">Schlagwort: {{ articleContent.tag }}</div>
    </div>
    <p class="leading-relaxed" style="margin: 0;">
      {{ articleContent.teaser }}
    </p>
    <template v-if="$store.state.store.screenReader">
      <nuxt-link :to="articleLink" class="inline-block mt-2">Zum Artikel</nuxt-link>
    </template>

  </div>
</template>


<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.article-teaser:hover {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.75);
}
</style>
