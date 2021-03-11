<template>
  <section>
      <Overview v-if="stories" :stories="stories" :category="category"/>
  </section>
</template>

<script>
import Overview from "@/components/Overview";
export default {
  components: {Overview},
  data () {
    return {
      stories: [],
      category: ''
    }
  },
  created() {
    this.$store.commit('store/setTheme', "theme-" + this.$route.params.category)
    if(this.$route.params.category === 'diestandard') {
      this.category = 'dieStandard';
    } else {
      this.category = this.$route.params.category.replace(/^./, this.$route.params.category[0].toUpperCase());
    }
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published';

    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/' + context.params.category + '/',
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },
  head() {
    return {
      title: this.category + " - Accessible News",
      htmlAttrs: {
        lang: 'de'
      },
    }
  }
}
</script>
