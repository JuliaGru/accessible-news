<template>
  <section>
    <Overview :stories="stories"/>
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
    if(this.$route.params.subcategory === 'bundeslaender') {
      this.category = 'Bundesländer';
    } else if(this.$route.params.subcategory === 'eu') {
      this.category = 'EU';
    } else {
      this.category = this.$route.params.subcategory.replace(/^./, this.$route.params.subcategory[0].toUpperCase());
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/' + context.params.category + '/' + context.params.subcategory + '/',
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
    }
  }
}
</script>
