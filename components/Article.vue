<template>
  <div
    v-editable="blok">
    <template v-if="!$store.state.store.screenReader">
      <span class="uppercase text-gray-500">{{ blok.tag }}</span>
    </template>
    <h1>{{ blok.name }}</h1>
    <div v-if="$store.state.store.screenReader">
      <div>Autor: {{ blok.author }}</div>
      <div>Erschienen am: {{ $dateFns.format(blok.date, 'dd.MM.yyyy') }}</div>
      <div>{{ blok.comments }} Kommentare</div>
      <div>Schlagwort: {{ blok.tag }}</div>
      <div>Ein {{ type }}</div>
    </div>
    <div v-else>
      <div><icon-user /><span class="ml-1">{{ blok.author }}</span></div>
      <div><icon-calendar /><span class="ml-1">{{ $dateFns.format(blok.date, 'dd.MM.yyyy') }}</span></div>
      <div><icon-comments /><span class="ml-1">{{ blok.comments }}</span></div>
      <div><icon-text /><span class="ml-1">{{ type }}</span></div>
    </div>

    <p class="font-bold"><span v-if="$store.state.store.screenReader">Teaser: </span>{{ blok.teaser }}</p>
    <Img v-if="blok.image" :source="blok.image.filename" :alt="blok.image.alt" :title="blok.image.title" :copyright="blok.image.copyright" />
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
import Img from "@/components/layout/Img";
import IconText from "@/components/icons/icon-text";
export default {
  components: {IconText, Img, IconCalendar, IconComments, IconUser},
  props: {
    blok: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      type: '',
    }
  },
  created() {
    this.type = this.blok.type.replace(/^./, this.blok.type[0].toUpperCase());
  },
}
</script>
