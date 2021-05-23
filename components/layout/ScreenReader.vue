<template>
  <div>
    <div v-if="$parent.firstCall" class="border-b p-4 text-center z-10" aria-live="polite">
      <div>
        <p class="pb-2">{{ questions[numberQ].text }}</p>
        <div class="flex justify-center">
          <button @click="setOptions(questions[numberQ].answers.yes, false)" class="button font-bold px-2 py-1 mr-2 w-16">Ja</button>
          <button @click="setOptions(questions[numberQ].answers.no, false)" class="button font-bold px-2 py-1 w-16">Nein</button>
        </div>
      </div>
    </div>
    <div v-else class="border-b text-center py-2 text-sm text-gray-700" aria-live="polite">
      <span class="font-bold">Ansicht Einstellung:</span>
      <template v-if="$store.state.store.screenReader">
        <button @click="setOptions(questions[0].answers.no)">Zur visuell optimierten Version</button>
        <div class="mt-1">
          <button class="mx-1" v-if="!$store.state.store.visualOutput" @click="setOptions(questions[1].answers.yes)">Bilder/Videos visuell darstellen</button>
          <button class="mx-1" v-if="!$store.state.store.textualOutput" @click="setOptions(questions[2].answers.yes)">Bilder/Videos textuell darstellen</button>
          <button class="mx-1" v-if="$store.state.store.visualOutput || $store.state.store.textualOutput" @click="setOptions(questions[2].answers.no)">Bilder/Videos gar nicht darstellen</button>
        </div>
      </template>
      <button v-else @click="setOptions(questions[3].answers.yes)">Zur Screen Reader optimierten Version</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberQ: 0,
      questions: [
        {
          text: 'Verwenden Sie einen Screen Reader?',
          answers: {
            yes: {
              nq: true,
            },
            no: {
              nq: false,
              sr: false,
              to: false,
              vo: false,
              ps: '#vo',
              an: 'Sie verwenden die visuell optimierte Version'
            },
          },
        },
        {
          text: 'Wollen Sie eine visuelle Darstellung von Bildern und Videos?',
          answers: {
            yes: {
              nq: false,
              sr: true,
              to: false,
              vo: true,
              ps: '#sr-vo-true-to-false',
              an: 'Sie verwenden die visuelle Darstellung von Bildern/Videos mit einem Screen-Reader'
            },
            no: {
              nq: true,
            }
          },
        },
        {
          text: 'Wollen Sie eine textuelle Darstellung von Bildern und Videos?',
          answers: {
            yes: {
              nq: false,
              sr: true,
              to: true,
              vo: false,
              ps: '#sr-vo-false-to-true',
              an: 'Sie verwenden die textuelle Darstellung von Bildern/Videos mit einem Screen-Reader'
            },
            no: {
              nq: false,
              sr: true,
              to: false,
              vo: false,
              ps: '#sr-vo-false-to-false',
              an: 'Sie werden keine Bilder/Videos angezeigt bekommen in der Screen-Reader optimierten Version',
            }
          },
        },
        // default sr -> for switching afterwards
        {
          answers: {
            yes: {
              nq: false,
              sr: true,
              to: true,
              vo: false,
              ps: '#sr-vo-false-to-true',
              an: 'Sie verwenden die Screen-Reader optimierte Version'
            },
          },
        }
      ],
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
        this.setOptions(this.questions[0].answers.no, false)
      } else if (hash === "sr-vo-false-to-false") {
        this.setOptions(this.questions[2].answers.no, false)
      } else if (hash === "sr-vo-true-to-false") {
        this.setOptions(this.questions[1].answers.yes, false)
      } else if (hash === "sr-vo-false-to-true") {
        this.setOptions(this.questions[2].answers.yes, false)
      }
    },

    setOptions: function (param, pushState = true) {
      if (!param.nq) {
        if (pushState) {
          window.history.pushState({page: 1}, "Overview", param.ps);
        }
        this.setScreenReader(param.sr)
        this.setTextualOutput(param.to)
        this.setVisualOutput(param.vo)
        this.$parent.firstCall = false;
        this.setNav();
        this.$announcer.assertive(param.an);
      } else {
        this.numberQ++;
      }
    },

    //setter
    setScreenReader: function (bool) {
      this.$store.commit('store/setReader', bool)
      localStorage.setItem('sr', bool);
    },

    setVisualOutput: function (bool) {
      this.$store.commit('store/setVisualOutput', bool)
      localStorage.setItem('vo', bool);
    },

    setTextualOutput: function (bool) {
      this.$store.commit('store/setTextualOutput', bool)
      localStorage.setItem('to', bool);
    },

    //helper
    setNav: function () {
      this.$store.commit('store/setNavMore', false);

      this.$nextTick(function () {
        this.$store.commit('store/setNavItemsLength', this.$parent.$children[4].$children[1].$refs.navitems); //get to navigation
        this.$store.commit('store/shortMenu', this.$parent.$children[4].$refs.maxwidth.clientWidth);
      })
    },
  }
}
</script>
