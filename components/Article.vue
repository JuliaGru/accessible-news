<template>
  <div
    v-editable="blok" :class="tagClass">
    <span class="uppercase text-gray-500">{{ blok.tag }}</span>
    <h1>{{ blok.name }}</h1>
    <div v-if="$store.state.screenReader.screenReader">
      <div><span>{{ blok.author }}</span></div>
      <div><span>{{ $dateFns.format(blok.date, 'dd.MM.yyyy') }}</span></div>
      <div><span>{{ blok.comments }}</span></div>
    </div>
    <div v-else>
      <div><icon-user /><span class="ml-1">{{ blok.author }}</span></div>
      <div><icon-calendar /><span class="ml-1">{{ $dateFns.format(blok.date, 'dd.MM.yyyy') }}</span></div>
      <div><icon-comments /><span class="ml-1">{{ blok.comments }}</span></div>
    </div>

    <span class="mr-1 font-bold uppercase">{{ blok.type }}</span>/<span class="ml-1 text-sm">{{ category }}</span>
    <p class="font-bold">{{ blok.teaser }}</p>
    <div
      :key="blok._uid"
      v-for="blok in blok.content">
      <component :blok="blok" :is="blok.component"/>
    </div>
    <a :href="blok.link.url" target="_blank">Zum originalen Artikel</a>
  </div>
</template>

<script>
import IconUser from "@/components/icons/icon-user";
import IconComments from "@/components/icons/icon-comments";
import IconCalendar from "@/components/icons/icon-calendar";
export default {
  components: {IconCalendar, IconComments, IconUser},
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
