<template>
  <div class="bg-var-light px-4 py-2 mb-4 -mx-4 h-12 flex items-center">
    <nuxt-link :to="'/articles/' + route"  class="mr-4 header-link" v-if="title">
      <h2 style="margin-top: 0; margin-bottom: 0;">{{ title }}</h2>
    </nuxt-link>
    <nav class="subNavigation">
      <ul class="flex" v-if="nav.story">
        <li v-for="nav_item in nav.story.content.navigation">
          <nuxt-link :to="'/articles/' + route + nav_item.link.url">{{ nav_item.name }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    nav: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    route: {
      type: String,
      required: true,
    }
  },
}
</script>
