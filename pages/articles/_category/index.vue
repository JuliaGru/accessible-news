<template>
  <section>
    <Overview :stories="stories" :category="category"/>
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
    this.category = this.$route.params.category.replace(/^./, this.$route.params.category[0].toUpperCase());
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/' + context.params.category + '/',
      version: 'draft'
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
      title: "Accessible News - " +  this.category,
      htmlAttrs: {
        lang: 'de'
      },
    }
  }
}
</script>
