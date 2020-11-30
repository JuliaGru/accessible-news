<template>
  <div
    v-editable="blok"
    class="prose my-24 mx-auto" :class="tagClass">
    <p>{{ blok.tag }}</p>
    <h1>{{ blok.name }}</h1>
    <span class="mr-1">{{ blok.author }}</span>/<span class="mx-1">{{ blok.date }}</span>/<span class="mx-1">{{ blok.comments }}</span>/<span class="mx-1">{{ blok.type }}</span>/<span class="ml-1">{{ category }}</span>
    <p>{{ blok.teaser }}</p>
    <div
      :key="blok._uid"
      v-for="blok in blok.content">
      <component :blok="blok" :is="blok.component"/>
    </div>
    <a :href="blok.link.url" target="_blank">{{ blok.link.url }}</a>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tagClass: `theme-${this.category}`,
    }
  },
}
</script>
