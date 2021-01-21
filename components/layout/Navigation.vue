<template>
  <div>
    <a aria-label="Navigation" id="skiplink_navigation" href="#" tabindex="-1"></a>
    <nav id="navigation" v-if="nav.story">
      <ul class="flex" ref="nav" >
        <template v-for="(nav_item, index) in nav.story.content.navigation">
          <li @mouseenter="toggleNav(index, true, $event)" @mouseleave="toggleNav(index, false, $event)" v-bind:class="{ 'hidden' : moreItems[index]}" class="pl-4 py-1 flex items-center relative" ref="navitems">
            <nuxt-link :class="'nav-item-' + index" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
            <button class="sr-only sr-only-focusable focus:not-sr-only ml-1" :title="'Subnavigation ' + nav_item.name + ' öffnen'" :data-toggle="'toggle-' + index" :aria-expanded="index === navToggle" @click="toggleNav(index, true)">
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
        <template v-if="more">
          <li @mouseenter="toggleNav(moreIndex, true, $event)" @mouseleave="toggleNav(moreIndex, false, $event)" class="pl-4 py-1 flex items-center relative" ref="more">
            <a :class="'nav-item-' + moreIndex" href="#">Mehr</a>
            <button class="sr-only sr-only-focusable focus:not-sr-only ml-1" title="Mehr Navigationselemente" :data-toggle="'toggle-' + moreIndex" :aria-expanded="moreIndex === navToggle" @click="toggleNav(moreIndex, true)">
              <template v-if="moreIndex === navToggle">
                <icon-arrow-up/>
              </template>
              <template v-else>
                <icon-arrow-down/>
              </template>
            </button>
            <!-- <template v-if="moreIndex === navToggle || navToggle > moreIndex"> -->
              <ul class="absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: 2rem; left: auto; right: -0.75rem; text-align: right; z-index: 10">
                <template v-for="(nav_item, index) in nav.story.content.navigation">
                  <li class="w-full relative" v-if="moreItems[index]" @mouseenter="toggleNav(moreIndex + index, true, $event)" @mouseleave="toggleNav(moreIndex + index, false, $event)">
                    <nuxt-link :class="'nav-item-' + moreIndex" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
                    <template v-if="moreIndex + index === navToggle">
                      <ul v-if="nav_item.subnav" class="absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: -0.75rem; left: -10rem; z-index: 11">
                        <li v-for="nav_item_sub in nav_item.subnav">
                          <nuxt-link :to="'/articles' + nav_item.link.url + nav_item_sub.link.url" :class="'nav-item-' + index">{{ nav_item_sub.name }}</nuxt-link>
                        </li>
                      </ul>
                    </template>
                  </li>
                </template>
              </ul>
            <!-- </template> -->
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import IconArrowDown from "@/components/icons/icon-arrow-down";
import IconArrowUp from "@/components/icons/icon-arrow-up";
export default {
  components: {IconArrowUp, IconArrowDown},
  props: {
    nav: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      return: true
    }
  },
  data() {
    return {
      navToggle: -1,
      moreItems: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      itemsLength: [],
      more: true,
      moreLength: 0,
      first: true,
      moreIndex: 0,
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
  watch: {
    nav(newVal, oldVal) {
      this.$nextTick(function () {
        this.shortMenu();
        this.moreIndex = this.nav.story.content.navigation.length;
      })
    }
  },
  methods: {
    toggleNav(id, out, event) {
      event.stopPropagation();
      if (id === this.navToggle || !out) {
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
      if (this.first) {
        let items = this.nav.story.content.navigation;
        for (let i = 0; i < items.length; i++ ) {
          this.itemsLength[i] = this.$refs.navitems[i].clientWidth;
        }
        this.moreLength = this.$refs.more.clientWidth;
        this.first = false;
      }
      let items = this.nav.story.content.navigation;
      let summary = 0;

      let maxwidth = this.width - 30;

      for (let i = 0; i < items.length; i++ ) {
        summary += this.itemsLength[i];
      }

      if (summary > maxwidth) {
        this.more = true;
        summary += this.moreLength;

        for (let i = items.length - 1; i >= 0; i--) {
          if (summary > maxwidth) {
            this.$set(this.moreItems, i, true)
            this.moreItems[i] = true;
          } else {
            this.$set(this.moreItems, i, false)
            this.moreItems[i] = false;
          }

          summary -= this.itemsLength[i];
        }
      }  else {
        this.more = false;
      }
    }
  }
}
</script>
