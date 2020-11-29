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
      stories: []
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'articles/inland/bundeslaender/',
      version: 'draft'
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>
