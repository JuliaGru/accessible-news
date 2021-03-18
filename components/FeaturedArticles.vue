<template>
  <section :aria-label="ariaLabel" class="mt-12" :class="'theme-' + blok.navslug">
    <SubNavigation v-if="blok.hasnav" :nav="navigation" :title="blok.title" :route="blok.navslug"/>
    <div class="flex flex-wrap -mx-3">
      <client-only>
        <article v-for="(article, index) in sortedArticles" :key="article.id" :aria-label="article.content.name"
                 class="teaser w-full md:w-1/2 px-3 mb-6" ref="article">
          <article-teaser
            :article-link="'/' + article.full_slug"
            :article-content="article.content"
            :ishomepage="true"
            :id="article.id"
            :focused="focused"/>
        </article>
      </client-only>
    </div>
  </section>
</template>

<script>
import SubNavigation from "@/components/layout/SubNavigation";
export default {
  components: {SubNavigation},
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      navigation: {},
      focused: "",
    }
  },
  async fetch () {
    let preview_token = 'AZg8k4iwgfML7XgBWjtsUQtt';
    this.navigation = await this.$axios.$get(`https://api.storyblok.com/v1/cdn/stories/navigation/navigation-${this.blok.navslug}/?token=${preview_token}&version=draft`)
  },
  mounted() {
    if(window.location.hash !== "") {
      this.focused = window.location.hash.substr(1);
    }
  },
  computed: {
    sortedArticles() {
      // Load reference data/content from store
      const featuredArticles = this.$store.state.articles.articles.filter((article) => {
        return this.blok.articles.includes(article.uuid)
      })

      // Enable the ordering of the article previews
      featuredArticles.sort((a, b) => {
        return this.blok.articles.indexOf(a.uuid) - this.blok.articles.indexOf(b.uuid);
      })

      return featuredArticles
    },
    ariaLabel() {
      if(this.blok.hasnav) {
        return "Artikel zum Thema " + this.blok.title;
      } else {
        return "Top Artikel";
      }
    }
  }
}
</script>
