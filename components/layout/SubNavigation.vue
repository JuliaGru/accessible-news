<template>
  <nav id="navigation" v-if="nav.story">
    <ul class="flex">
      <li v-for="nav_item in nav.story.content.navigation" class="text-teal-600 hover:underline ml-2">
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
