<template>
  <section id="breadcrumbs">
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link :to="categoryLink">{{ $route.params.category }}</nuxt-link>
    <nuxt-link :to="subCategoryLink">{{ $route.params.subcategory }}</nuxt-link>
    <nuxt-link :to="subCategoryLink">{{ $route.params.slug }}</nuxt-link>

    <!-- vlt eher stories -->
    <!-- https://www.storyblok.com/docs/api/management -->

  </section>
</template>

<script>
export default {
  props: {
    links: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      categoryLink: `/articles/${this.$route.params.category}`,
      subCategoryLink: `/articles/${this.$route.params.category}/${this.$route.params.subCategory}`
    }
  },
}
</script>
