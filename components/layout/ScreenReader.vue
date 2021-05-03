<template>
  <div>
    <div v-if="$parent.firstCall" class="border-b p-4 text-center z-10" aria-live="polite">
      <div :class="questionSRclass">
        <p class="pb-2">Verwenden Sie einen Screen Reader?</p>
        <div class="flex justify-center">
          <button @click="changeScreenReader(true)" class="button font-bold px-2 py-1 mr-2 w-16">Ja</button>
          <button @click="changeScreenReader(false)" class="button font-bold px-2 py-1 w-16">Nein</button>
        </div>
      </div>

      <div :class="questionVOclass">
        <p class="pb-2">Wollen Sie eine visuelle Darstellung von Bildern und Videos?</p>
        <div class="flex justify-center">
          <button role="button" @click="changeVisualOutput(true)" class="button font-bold px-2 py-1 mr-2 w-16">Ja</button>
          <button role="button" @click="changeVisualOutput(false)" class="button font-bold px-2 py-1 w-16">Nein</button>
        </div>
      </div>

      <div :class="questionTOclass">
        <p class="pb-2">Wollen Sie eine textuelle Darstellung von Bildern und Videos?</p>
        <div class="flex justify-center">
          <button role="button" @click="changeTextualOutput(true)" class="button font-bold px-2 py-1 mr-2 w-16">Ja</button>
          <button role="button" @click="changeTextualOutput(false)" class="button font-bold px-2 py-1 w-16">Nein</button>
        </div>
      </div>
    </div>
    <div v-else class="border-b text-center py-2 text-sm text-gray-700" aria-live="polite">
      <span class="font-bold">Ansicht Einstellung:</span>
      <template v-if="$store.state.store.screenReader">
        <button @click="changeSR(false, 'Sie verwenden die visuelle Version')">Zur visuell optimierten Version</button>
        <div class="mt-1">
          <button class="mx-1" v-if="!$store.state.store.visualOutput" @click="changeOutput(true, false, 'Sie verwenden die visuelle Darstellung von Bildern/Videos')">Bilder/Videos visuell darstellen</button>
          <button class="mx-1" v-if="!$store.state.store.textualOutput" @click="changeOutput(false, true, 'Sie verwenden die textuelle Darstellung von Bildern/Videos')">Bilder/Videos textuell darstellen</button>
          <button class="mx-1" v-if="$store.state.store.visualOutput || $store.state.store.textualOutput" @click="changeOutput(false, false, 'Sie werden keine Bilder/Videos angezeigt bekokmmen')">Bilder/Videos gar nicht darstellen</button>
        </div>
      </template>
      <button v-else @click="changeSR(true, 'Sie verwenden die Screen Reader Version')">Zur Screen Reader optimierten Version</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: 0,
      questionSRclass: '',
      questionVOclass: 'hidden',
      questionTOclass: 'hidden'
    }
  },
  mounted() {
    window.addEventListener('popstate', this.popstate);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.popstate);
  },
  methods: {
    popstate(event) {
      let hash = window.location.hash.substr(1);
      if (hash === "vo") {
        this.changeSR(false, 'Sie verwenden die visuelle Version', false);
      } else if (hash === "sr-vo-false-to-false") {
        this.changeOutput(false, false, 'Sie werden keine Bilder/Videos angezeigt bekommen', false)
      } else if (hash === "sr-vo-true-to-false") {
        this.changeOutput(true, false, 'Sie verwenden die visuelle Darstellung von Bildern/Videos', false)
      } else if (hash === "sr-vo-false-to-true") {
        this.changeOutput(false, true, 'Sie verwenden die textuelle Darstellung von Bildern/Videos', false)
      }
    },
    changeScreenReader: function (sr) {
      this.$store.commit('store/setReader', sr)
      if(!sr) { //only then firstCall otherwise Questions will go on
        this.$parent.firstCall = false;
        this.setTextualOutput(false)
        this.setVisualOutput(false)
      } else {
        this.questions++;
        this.questionSRclass = "hidden";
        this.questionVOclass = "";
      }
      localStorage.setItem('sr', sr);

      this.$store.commit('store/setNavMore', false);

      this.$nextTick(function () {
        this.$store.commit('store/setNavItemsLength', this.$parent.$children[4].$children[1].$refs.navitems); //get to navigation
        this.$store.commit('store/shortMenu', this.$parent.$children[4].$refs.maxwidth.clientWidth);
      })
    },

    changeVisualOutput: function (output) {
      this.setVisualOutput(output)
      if(output) { //only then firstCall otherwise Questions will go on
        this.$parent.firstCall = false;
        this.setTextualOutput(false)
      } else {
        this.questions++;
        this.questionVOclass = "hidden";
        this.questionTOclass = "";
      }
    },

    setScreenReader: function (bool) {
      this.$store.commit('store/setReader', bool)
      localStorage.setItem('sr', bool);
    },

    changeTextualOutput: function (output) {
      this.setTextualOutput(output)
      this.$parent.firstCall = false;
    },

    setVisualOutput: function (bool) {
      this.$store.commit('store/setVisualOutput', bool)
      localStorage.setItem('vo', bool);
    },

    setTextualOutput: function (bool) {
      this.$store.commit('store/setTextualOutput', bool)
      localStorage.setItem('to', bool);
    },

    changeSR: function (sr, text, pushstate = true) {
      this.$store.commit('store/setReader', sr)
      localStorage.setItem('sr', sr);
      this.$announcer.assertive(text);
      if(sr) { // if screen reader = true set to textual output
        if (pushstate) {
          window.history.pushState({page: 1}, "Overview", "#sr-vo-false-to-true");
        }
        this.setVisualOutput(false);
        this.setTextualOutput(true);
      } else {
        if (pushstate) {
          window.history.pushState({page: 1}, "Overview", "#vo");
        }
        this.setVisualOutput(false);
        this.setTextualOutput(false);
      }

      this.$store.commit('store/setNavMore', false);

      this.$nextTick(function () {
        this.$store.commit('store/setNavItemsLength', this.$parent.$children[4].$children[1].$refs.navitems); //get to navigation
        this.$store.commit('store/shortMenu', this.$parent.$children[4].$refs.maxwidth.clientWidth);
      })
    },

    changeOutput: function (vo, to, text, pushstate = true) {
      if (pushstate) {
        window.history.pushState({page: 1}, "Overview", "#sr-vo-" + vo + "-to-" + to);
      }
      this.setScreenReader(true);
      this.setVisualOutput(vo);
      this.setTextualOutput(to);
      this.$announcer.assertive(text);
    },
  }
}
</script>
