<template>
  <Img :source="blok.image.filename" :alt="blok.image.alt" :title="blok.image.title" :copyright="blok.image.copyright"/>
</template>

<script>
import Img from "@/components/layout/Img";
export default {
  components: {Img},
  props: {
    blok: {
      type: Object,
      required: true
    },
  }
}
</script>
