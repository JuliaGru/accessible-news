<template>
  <nav id="subNavigation" v-if="nav.story" class="bg-var-light px-4 py-2 mb-4">
    <ul class="flex">
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
