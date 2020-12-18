<template>
  <nav id="navigation" v-if="nav.story">
    <ul class="flex">
      <li v-for="nav_item in nav.story.content.navigation" class="ml-2">
        <nuxt-link :to="'/articles' + nav_item.link.url">{{ nav_item.name }}</nuxt-link>
        <ul v-if="nav_item.subnav" class="hidden">
          <li v-for="nav_item_sub in nav_item.subnav">
            <nuxt-link :to="'/articles' + nav_item.link.url + nav_item_sub.link.url">{{ nav_item_sub.name }}</nuxt-link>
          </li>
        </ul>
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
