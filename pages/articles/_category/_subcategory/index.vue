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
      category: '',
    }
  },
  created() {
    this.$store.commit('store/setTheme', "theme-" + this.$route.params.category)
    if(this.$route.params.subcategory === 'bundeslaender') {
      this.category = 'Bundesländer';
    } else if(this.$route.params.subcategory === 'eu') {
      this.category = 'EU';
    } else if(this.$route.params.subcategory === 'fussball') {
      this.category = 'Fußball';
    } else if(this.$route.params.subcategory === 'bildende-kunst') {
      this.category = 'Bildende Kunst';
    } else if(this.$route.params.subcategory === 'buehne') {
      this.category = 'Bühne';
    } else if(this.$route.params.subcategory === 'tv') {
      this.category = 'TV';
    } else if(this.$route.params.subcategory === 'wissens-blogs') {
      this.category = 'Wissens-Blogs';
    } else if(this.$route.params.subcategory === 'mobilitaet') {
      this.category = 'Mobilität';
    } else if(this.$route.params.subcategory === 'essen-trinken') {
      this.category = 'Essen & Trinken';
    } else if(this.$route.params.subcategory === 'architektur-stadt') {
      this.category = 'Architektur & Stadt';
    } else if(this.$route.params.subcategory === 'bauen-wohnen') {
      this.category = 'Bauen & Wohnen';
    } else if(this.$route.params.subcategory === 'gesund-bleiben') {
      this.category = 'Gesund bleiben';
    } else if(this.$route.params.subcategory === 'blog-medienrecht') {
      this.category = 'Blog: Medienrecht';
    } else {
      this.category = this.$route.params.subcategory.replace(/^./, this.$route.params.subcategory[0].toUpperCase());
    }
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published';

    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/' + context.params.category + '/' + context.params.subcategory + '/',
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
