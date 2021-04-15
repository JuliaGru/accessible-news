<template>
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
  methods: {
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
    }
  }
}
</script>
