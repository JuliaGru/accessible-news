<template>
  <button :class="classList" class="ml-1" :title="title" :data-toggle="'toggle-' + index" :aria-expanded="index === $parent.navToggle" @click="toggleNav(index, true, $event)">
    <template v-if="ifCondition">
      <icon-arrow-up/>
    </template>
    <template v-else>
      <icon-arrow-down/>
    </template>
  </button>
</template>

<script>
import IconArrowDown from "@/components/icons/icon-arrow-down";
import IconArrowUp from "@/components/icons/icon-arrow-up";
export default {
  components: {IconArrowUp, IconArrowDown},
  props: {
    title: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    ifCondition: {
      type: Boolean,
      required: true,
    },
    classList: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    toggleNav(id, out, event) {
      event.stopPropagation();
      if (id === this.$parent.navToggle) {
        //check if index is within more navigation && if it is the last element
        if (this.$parent.navToggle > this.$parent.moreIndex) {
          this.$parent.navToggle = this.$parent.moreIndex;
        } else {
          this.$parent.navToggle = -1;
        }
      } else {
        this.$parent.navToggle = id;
      }
    }
  }
}
</script>
