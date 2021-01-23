<template>
  <div>
    <a aria-label="Navigation" id="skiplink_navigation" href="#" tabindex="-1"></a>
    <nav id="navigation" v-if="nav.story">
      <ul class="flex" ref="nav" >
        <template v-for="(nav_item, index) in nav.story.content.navigation">
          <li @mouseenter="toggleNav(index, true, $event)" @mouseleave="toggleNav(index, false, $event)" v-bind:class="{ 'hidden' : moreItems[index]}" class="pl-4 py-1 flex items-center relative" ref="navitems">
            <nuxt-link :class="'nav-item-' + index" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
            <NavSubmenu :index="index" :navItem="nav_item" styleProp="top: 2rem; left: -0.75rem;"/>
          </li>
        </template>
        <template v-if="more">
          <li @mouseenter="toggleNav(moreIndex, true, $event)" @mouseleave="toggleNav(moreIndex, false, $event)" class="pl-4 py-1 flex items-center relative" ref="more">
            <a :class="'nav-item-' + moreIndex" href="#">
              Mehr
              <template v-if="moreIndex <= navToggle">
                <icon-arrow-up/>
              </template>
              <template v-else>
                <icon-arrow-down/>
              </template>
            </a>
            <template v-if="moreIndex === navToggle || navToggle > moreIndex">
              <ul class="absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: 2rem; left: auto; right: -0.75rem; text-align: right; z-index: 10">
                <template v-for="(nav_item, index) in nav.story.content.navigation">
                  <li class="w-full relative" v-if="moreItems[index]" @mouseenter="toggleNav(moreIndex + index, true, $event)" @mouseleave="toggleNav(moreIndex + index, false, $event)">
                    <nuxt-link :class="'nav-item-' + moreIndex" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
                    <NavSubmenu :index="(moreIndex + index)" :navItem="nav_item" styleProp="top: -0.75rem; left: -10rem; z-index: 11"/>
                  </li>
                </template>
              </ul>
            </template>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import NavSubmenu from "@/components/layout/nav-helpers/NavSubmenu";
import IconArrowDown from "@/components/icons/icon-arrow-down";
import IconArrowUp from "@/components/icons/icon-arrow-up";
export default {
  components: {IconArrowUp, IconArrowDown,NavSubmenu},
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
        //check if index is within more navigation && if it is the last element
        if (this.navToggle > this.moreIndex && this.navToggle !== this.moreIndex + this.nav.story.content.navigation.length - 1) {
          this.navToggle = this.moreIndex;
        } else {
          this.navToggle = -1;
        }
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
