<template>
  <section>
    <client-only>
      <Article :blok="story.content" :category="$route.params.category"/>
    </client-only>
  </section>
</template>

<script>
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
  data() {
    return {
      story: {content: {}},
    }
  },
  created() {
    this.$store.commit('store/setTheme', "theme-" + this.$route.params.category)
  },
  asyncData(context) {
    // Load the JSON from the API
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published';

    return context.app.$storyapi.get(`cdn/stories/articles/${context.params.category}/${context.params.subcategory}/${context.params.slug}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        context.error({statusCode: 404, message: 'Failed to receive content form api'})
      } else {
        context.error({statusCode: res.response.status, message: res.response.data})
      }
    })
  },
  head() {
    return {
      title: this.story.name + " - Accessible News",
      htmlAttrs: {
        lang: 'de'
      },
    }
  }
}
</script>
