<template>
  <div
    v-editable="blok"
    class="prose my-24 mx-auto">
    <h1>{{ blok.name }}</h1>
    <span class="mr-1">{{ blok.author }}</span>/<span class="mx-1">{{ blok.date }}</span>/<span class="mx-1">{{ blok.comments }}</span>/<span class="ml-1">{{ blok.link.url }}</span>
    <p>{{ blok.teaser }}</p>
    <p>Tags: {{ tags }}</p>
    <div
      :key="blok._uid"
      v-for="blok in blok.content">
      <component :blok="blok" :is="blok.component"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
