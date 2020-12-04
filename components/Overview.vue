<template>
  <section>
    <h1>Articles Overview</h1>
    <SubNavigation :nav="navigation" v-if="!$route.params.subcategory"/>
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
import SubNavigation from "@/components/layout/SubNavigation";
export default {
  components: {SubNavigation},
  props: {
    stories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      navigation: {},
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-${this.$route.params.category}/?token=${preview_token}&version=draft`)
  },
}
</script>
