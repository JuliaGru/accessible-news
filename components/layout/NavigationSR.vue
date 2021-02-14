<template>
  <div v-if="$store.state.store.screenReader">
    <a aria-label="Navigation" id="skiplink_navigation" href="#" tabindex="-1"></a>
    <nav id="navigation" v-if="nav.story">
      <ul class="flex" ref="nav" >
        <template v-for="(nav_item, index) in nav.story.content.navigation">
          <li v-bind:class="{ 'hidden' : $store.state.store.navMoreItems[index]}" class="pl-4 py-1 flex items-center relative" ref="navitems">
            <nuxt-link :class="'nav-item-' + index" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
            <NavButton :title="'Subnavigation ' + nav_item.name + ' öffnen'" :index="index" :ifCondition="index === navToggle"/>
            <NavSubmenu :index="index" :navItem="nav_item" styleProp="top: 2rem; left: -0.75rem;" :ifCondition="index === navToggle && nav_item.subnav !== undefined"/>
          </li>
        </template>
        <template v-if="$store.state.store.navMore">
          <li class="pl-4 py-1 flex items-center relative" ref="more">
            <a :class="'nav-item-' + $store.state.store.navMoreIndex" href="#">Mehr</a>
            <NavButton title="Mehr Navigationselemente öffnen" :index="$store.state.store.navMoreIndex" :ifCondition="$store.state.store.navMoreIndex <= navToggle"/>
            <template v-if="$store.state.store.navMoreIndex === navToggle || navToggle > $store.state.store.navMoreIndex">
              <ul class="absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: 2rem; left: auto; right: -0.75rem; text-align: right; z-index: 10">
                <template v-for="(nav_item, index) in nav.story.content.navigation">
                  <li class="w-full relative" v-if="$store.state.store.navMoreItems[index]">
                    <nuxt-link :class="'nav-item-' + $store.state.store.navMoreIndex" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
                    <NavButton :title="'Subnavigation ' + nav_item.name + ' öffnen'" :index="($store.state.store.navMoreIndex + index)" :class="'nav-item-' + $store.state.store.navMoreIndex" :ifCondition="($store.state.store.navMoreIndex + index) === navToggle"/>
                    <NavSubmenu :index="($store.state.store.navMoreIndex + index)" :navItem="nav_item" styleProp="top: -0.75rem; left: -10rem; z-index: 11" :ifCondition="($store.state.store.navMoreIndex + index) === navToggle && nav_item.subnav !== undefined"/>
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
import NavButton from "@/components/layout/nav-helpers/NavButton";
import NavSubmenu from "@/components/layout/nav-helpers/NavSubmenu";
export default {
  components: {NavSubmenu, NavButton},
  computed: {
    nav () {
      return this.$store.state.store.navigation;
    }
  },
  data() {
    return {
      navToggle: -1,
    }
  },
  mounted() {
    document.addEventListener('focusin', this.focusChanged);
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged);
  },
  methods: {
    focusChanged (event) {
      if (this.navToggle !== -1 && !event.target.classList.contains('nav-item-' + this.navToggle)) {
        //check if index is within more navigation && if it is the last element
        if (this.navToggle > this.$store.state.store.navMoreIndex && this.navToggle !== this.$store.state.store.navMoreIndex + this.nav.story.content.navigation.length - 1) {
          this.navToggle = this.$store.state.store.navMoreIndex;
        } else {
          this.navToggle = -1;
        }
      }
    },
  }
}
</script>
