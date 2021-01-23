<template>
  <ul v-if="index === this.$parent.navToggle && navItem.subnav" class="absolute p-3 pt-2 bg-white shadow-md w-40" :style="styleProp">
    <li v-for="nav_item_sub in navItem.subnav">
      <nuxt-link :to="'/articles' + navItem.link.url + nav_item_sub.link.url" :class="'nav-item-' + index">{{ nav_item_sub.name }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    navItem: {
      type: Object,
      required: true,
    },
    styleProp: {
      type: String,
      required: true,
    },
  },
}
</script>
