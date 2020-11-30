<template>
  <section>
    <h1>Articles Overview</h1>
    <ul class="flex flex-wrap">
      <li
        v-for="article in stories" :key="article._uid"
        class="w-1/2 pr-6 pb-6" style="padding-left: 0; margin: 0;">
        <article-teaser
          v-if="article.content"
          :article-link="'/' + article.full_slug"
          :article-content="article.content"/>
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">This content loads on save. <strong>Save the entry & reload.</strong></p>
      </li>
    </ul>
  </section>
</template>


<script>
export default {
  props: {
    stories: {
      type: Array,
      required: true
    }
  },
}
</script>
