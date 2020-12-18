<template>
  <section>
    <h1>{{ category }}</h1>
    <SubNavigation :nav="navigation" v-if="!$route.params.subcategory"/>
    <div class="flex flex-wrap -mx-3">
      <div
        v-for="article in stories" :key="article._uid"
        class="teaser w-full md:w-1/2 px-3 mb-6">
        <article-teaser
          :article-link="'/' + article.full_slug"
          :article-content="article.content"/>
      </div>
    </div>
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
    },
    category: {
      type: String,
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
