<template>
  <div>
    <h1>{{ category }}</h1>
    <SubNavigation :nav="navigation" v-if="!$route.params.subcategory"/>
    <div class="flex flex-wrap -mx-3">
      <div v-for="(article, index) in stories" :key="article._uid"
        class="teaser w-full md:w-1/2 px-3 mb-6" >
        <a aria-label="Artikel" href="#" tabindex="-1" :ref="'article-' + index"></a>
        <article-teaser
          :article-link="'/' + article.full_slug"
          :article-content="article.content"/>
      </div>
    </div>
  </div>
</template>


<script>
import SubNavigation from "@/components/layout/SubNavigation";
export default {
  components: {SubNavigation},
  props: {
    stories: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      navigation: {},
      articleIndex: -1,
    }
  },
  mounted() {
    window.addEventListener('keypress', this.keyPressed);
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.keyPressed);
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-${this.$route.params.category}/?token=${preview_token}&version=draft`)
  },
  methods: {
    keyPressed(event) {
      if(event.key === 'j') {
        if(this.articleIndex < (this.stories.length - 1)) {
          this.articleIndex++;
        }
      } else if(event.key === 'k') {
        if(this.articleIndex > 0) {
          this.articleIndex--;
        }
      }

      this.$refs["article-" + this.articleIndex][0].focus();
    },
  }
}
</script>
