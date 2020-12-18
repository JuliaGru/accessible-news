<template>
    <div class="block p-6 border border-gray-500 h-full">
      <nuxt-link
        :to="articleLink">
        <h2 class="text-2xl font-bold pb-4" style="margin: 0">
            {{ articleContent.name }}
        </h2>
      </nuxt-link>
      <p class="leading-relaxed" style="margin: 0;">
          {{ articleContent.teaser }}
      </p>
      <nuxt-link :to="articleLink">Zum Artikel</nuxt-link>
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
        box-shadow: 0 0 15px 0 rgba(0,0,0,0.75);
    }
</style>
