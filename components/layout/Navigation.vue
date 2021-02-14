<template>
  <div>
    <a aria-label="Navigation" id="skiplink_navigation" href="#" tabindex="-1"></a>
    <nav id="navigation" v-if="nav.story">
      <ul class="flex" ref="nav" >
        <template v-for="(nav_item, index) in nav.story.content.navigation">
          <li v-bind:class="{ 'hidden' : $store.state.store.navMoreItems[index]}" class="pl-4 py-1 flex items-center relative" ref="navitems">
            <nuxt-link :class="'nav-item-' + index" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
            <NavSubmenu :index="index" :navItem="nav_item" styleProp="display: none; top: 1.5rem; left: -0.75rem; padding-top: 1rem; z-index: -1;" :ifCondition="nav_item.subnav !== undefined"/>
          </li>
        </template>
        <template v-if="$store.state.store.navMore">
          <li class="pl-4 py-1 flex items-center relative" ref="more">
            <a :class="'nav-item-' + $store.state.store.navMoreIndex" class="flex items-center" href="#">
              <span class="mr-1">Mehr</span>
              <icon-arrow-down/>
            </a>
            <ul class="hidden absolute -left-2 top-8 p-3 pt-2 bg-white shadow-md w-40" style="top: 1.4rem; left: auto; right: -0.75rem; text-align: right; z-index: -1; padding-top: 1.1rem;">
              <template v-for="(nav_item, index) in nav.story.content.navigation">
                <li class="w-full relative" v-if="$store.state.store.navMoreItems[index]">
                  <nuxt-link :class="'nav-item-' + $store.state.store.navMoreIndex" :to="'/articles' + nav_item.link.url" >{{ nav_item.name }}</nuxt-link>
                  <NavSubmenu :index="($store.state.store.navMoreIndex + index)" :navItem="nav_item" styleProp="display: none; top: -0.75rem; left: -10rem; z-index: -1;" :ifCondition="nav_item.subnav !== undefined"/>
                </li>
              </template>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<style>
li:hover > ul {
  display: block !important;
}
</style>

<script>
import NavSubmenu from "@/components/layout/nav-helpers/NavSubmenu";
import IconArrowDown from "@/components/icons/icon-arrow-down";
export default {
  components: {IconArrowDown,NavSubmenu},
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
  watch: {
    nav() {
      console.log("-");
      this.$nextTick(function () {
        console.log("-");
        console.log(this.$refs.more);
        console.log(this.nav.story.content.navigation.length);
        console.log(this.$refs.navitems);
        console.log(this.width);
        this.$store.commit('store/setNavRefMore', this.$refs.more);
        this.$store.commit('store/setNavMoreIndex', this.nav.story.content.navigation.length);
        this.$store.commit('store/setNavItemsLength', this.$refs.navitems);
        this.$store.commit('store/shortMenu', this.width);
      })
    }
  },
}
</script>
