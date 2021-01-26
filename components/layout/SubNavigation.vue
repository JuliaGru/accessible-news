<template>
  <nav id="subNavigation" class="bg-var-light px-4 py-2 mb-4 h-12 flex items-center">
    <ul class="flex" v-if="nav.story">
      <li v-for="nav_item in nav.story.content.navigation">
        <nuxt-link :to="'/articles/' + $route.params.category + nav_item.link.url">{{ nav_item.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    nav: {
      type: Object,
      required: true
    },
  },
}
</script>
