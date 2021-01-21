<template>
  <li v-for="(nav_item, index) in nav.story.content.navigation" class="pl-4 flex items-center relative" ref="navitems">
    <nuxt-link :class="'nav-item-' + index" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
    <button class="sr-only sr-only-focusable focus:not-sr-only ml-1" :title="'Subnavigation ' + nav_item.name + ' öffnen'" :data-toggle="'toggle-' + index" :aria-expanded="index === navToggle" @click="toggleNav(index)">
      <template v-if="index === navToggle">
        <icon-arrow-up/>
      </template>
      <template v-else>
        <icon-arrow-down/>
      </template>
    </button>

    <template v-if="index === navToggle">
      <ul v-if="nav_item.subnav" class="absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: 2rem; left: -0.75rem;">
        <li v-for="nav_item_sub in nav_item.subnav">
          <nuxt-link :to="'/articles' + nav_item.link.url + nav_item_sub.link.url" :class="'nav-item-' + index">{{ nav_item_sub.name }}</nuxt-link>
        </li>
      </ul>
    </template>
  </li>
</template>

<script>
import IconArrowDown from "@/components/icons/icon-arrow-down";
import IconArrowUp from "@/components/icons/icon-arrow-up";
export default {
  components: {IconArrowUp, IconArrowDown},
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      navToggle: -1,
      moreItems: [],
      more: true,
    }
  },
  mounted() {
    document.addEventListener('focusin', this.focusChanged);
    window.addEventListener('resize', this.shortMenu);
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged);
    window.removeEventListener('resize', this.shortMenu);
  },
  methods: {
    toggleNav(id) {
      if (id === this.navToggle) {
        this.navToggle = -1;
      } else {
        this.navToggle = id;
      }
    },
    focusChanged (event) {
      if (this.navToggle !== -1 && !event.target.classList.contains('nav-item-' + this.navToggle)) {
          this.navToggle = -1;
      }
    },
    shortMenu() {
      console.log("short-menu");

      let items = this.nav.story.content.navigation;
      let summary = 0;

      let maxwidth = this.width - 30;

      for (let i = 0; i < items.length; i++ ) {
        summary += this.$refs.navitems[i].clientWidth;
      }

      console.log(summary)
      console.log(maxwidth)
      if (summary > maxwidth) {
        this.more = true;
        summary += this.$refs.more.clientWidth;

        for (let i = items.length; i--;) {
          if (summary > maxwidth) {
            this.moreItems[i] = true;
          } else {
            this.moreItems[i] = false;
          }

          summary -= this.$refs.navitems[i].clientWidth;
        }
      } else {
        this.more = false;
      }

      console.log(this.moreItems);
    }
  }
}
</script>
