<template>
  <div class="block h-full mt-4">
    <template v-if="!$store.state.store.screenReader">
        <nuxt-link :to="articleLink" :title="articleContent.name" @click.native="click(id)">
          <template v-if="articleContent.image.id !== null">
            <div class="teaser-image flex justify-center items-end">
              <img :src="articleContent.image.filename" :alt="articleContent.image.alt" :title="articleContent.image.title" class="img w-full" width="500" />
            </div>
          </template>
          <template v-else>
            <div class="teaser-image bg-var-light mb-3"></div>
          </template>
        </nuxt-link>
      <div class="uppercase font-bold text-gray-700">{{ articleContent.tag }}</div>
    </template>

    <nuxt-link :to="articleLink" :title="'Artikel: ' + articleContent.name" class="header-link block" @click.native="click(id)" :id="id" :ref="id">
      <h3 v-if="ishomepage" style="margin-top: 0; margin-bottom: 1rem;">
        {{ articleContent.name }}
      </h3>
      <h2 v-else style="margin-top: 0; margin-bottom: 1rem;">
        {{ articleContent.name }}
      </h2>
    </nuxt-link>
    <div v-if="$store.state.store.screenReader">
      <div class="font-bold mb-2">Schlagwort: {{ articleContent.tag }}</div>
    </div>
    <p class="leading-relaxed" style="margin: 0;">
      {{ articleContent.teaser }}
    </p>
    <template v-if="$store.state.store.screenReader">
      <nuxt-link :to="articleLink" class="inline-block mt-2" :title="'Zum Artikel ' + articleContent.name" @click.native="click(id)">Zum Artikel</nuxt-link>
    </template>
  </div>
</template>


<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true
    },
    articleLink: {
      type: String,
      required: true
    },
    ishomepage: {
      type: Boolean,
      required: false,
    },
    id: {
      type: Number,
      required: true
    },
    focused: {
      type: String,
      required: true
    }
  },
  mounted() {
    if(this.focused == this.id) {
      document.getElementById(this.focused).focus(); //does not work with ref, since it then refferes to nuxt-link
    }
  },
  methods: {
    click(id) {
      window.history.replaceState({page: 1}, "Overview", "#"+id);
    }
  }
}
</script>
