<template>
  <div class="highlighter">
    <p v-for="(word, i) in words" @click="wordPressed(word)" :key="i"
      class="twh-word" :class="wrapperClasses(word)"><span :class="wordClasses(word)">{{word.word}}</span></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import synonymService from '../services/synonym_service'

export default {
  name: 'highlighter',
  data () {
    return {
      // selectedVerses: {},
      keyCommand: ''
    }
  },
  props: ['query', 'hideMeta', 'breakVerses'],
  watch: {
    selectedWord () {
      this.applySelection()
    }
  },
  computed: {
    ...mapGetters(['words', 'selectedWord', 'selectedVerses', 'focusedIds', 'translation'])
  },
  methods: {
    ...mapActions(['wordSelected', 'verseSelected']),
    keypress (e) {
      const cmd = String.fromCharCode(e.keyCode).toLowerCase()
      if (cmd.match(/\d+/)) {
        this.keyCommand = this.keyCommand + cmd
        setTimeout(() => {
          this.verseSelected(this.keyCommand)
          // this.$set(this.selectedVerses, this.keyCommand, !this.selectedVerses[this.keyCommand])
          this.keyCommand = ''
        }, 400)
      }
    },
    wrapperClasses (word) {
      return !this.selectedVerses[word.verse] ? [] : ['selected-verse']
    },
    wordClasses (word) {
      var classes = [word.status]
      if (word.meta) {
        this.hideMeta && word.meta === 'verse-num' ? classes.push('hidden') : classes.push(word.meta)
        this.breakVerses && word.meta === 'verse-num' ? classes.push('break') : classes.push(word.meta)
      }
      if (this.query && word.word.toLowerCase().startsWith(this.query.toLowerCase())) {
        classes.push('highlighted')
      }
      if (this.focusedIds.includes(word.id)) {
        classes.push('focused')
      }
      return classes
    },
    wordPressed (word) {
      if (word.meta) {
        if (word.meta === 'verse-num') {
          this.verseSelected(word.word)
          // this.$set(this.selectedVerses, word.word, !this.selectedVerses[word.word])
        }
      } else {
        this.wordSelected(word.word === this.selectedWord ? undefined : word.word)
      }
    },
    applySelection () {
      const skip = [' ', ', ', '; ', '\n']
      this.words.every(w => {
        if (skip.includes(w.word)) {
          return true
        }
        if (this.selectedWord === undefined) {
          w.status = ''
          return true
        }

        var w1 = w.word.toLowerCase()
        var w2 = this.selectedWord.toLowerCase()
        if (w1 === w2) {
          w.status = 'match'
        } else {
          let matchLevel = 0
          while (w1.charAt(matchLevel) === w2.charAt(matchLevel) && matchLevel < 5) {
            matchLevel++
          }
          w.status = matchLevel > 0 ? `match-${matchLevel}` : ''
        }
        return true
      })

      if (this.translation === 'ESV') { this.fetchSynonyms() }
    },
    fetchSynonyms () {
      const self = this
      synonymService.fetchSynonyms(this.selectedWord)
      .then(synonyms => {
        self.words.forEach(w => {
          var w1 = clean(w.word)
          if (synonyms.includes(w1)) {
            w.status = w.status || 'synonym'
          }
        })
      })
    }
  },
  created () {
    window.addEventListener('keypress', this.keypress)
  },
  destroyed () {
    window.removeEventListener('keypress', this.keypress)
  },
  mounted () {
    if (this.$route.query.selection) {
      this.wordSelected(this.$route.query.selection)
      this.$nextTick(() => {
        this.applySelection()
      })
    }
  }
}

function clean (word) {
  if (word === undefined) {
    return word
  }
  return word.toLowerCase().replace(/[,."?;:]/g, '')
}
</script>

<style lang="less" scoped>
@import "../../static/less/colors";

.highlighter {
  padding: 8px;
  font-size: 18px;
  line-height: 1.2;
  .twh-word {
    display: inline;
    word-spacing: -1px;
    line-height: 130%;
    span {
      border: solid 1px transparent;
      border-radius: 2px;
    }
  }
  .linebreak {
    display: block;
    margin-top: 10px;
  }
  .verse-num {
    &.break::before {
      content: '\A';
      white-space: pre;
    }
    color: #999;
  }
  .selected-verse {
    background-color: fade(@color-highlight-gray, 40%);
    border-top: solid 1px fade(@color-highlight-gray, 20%);
    border-bottom: solid 1px fade(@color-highlight-gray, 20%);
  }
  .synonym {
    text-shadow: 1px 0px 3px black;
    color: white;
    border-color: @color-highlight-red !important;
    background-color: fade(@color-highlight-red, 50%);
  }
  .match {
    text-shadow: 1px 0px 3px black;
    color: white;
    border-color: darken(@color-highlight-blue, 30%) !important;
    background-color: @color-highlight-blue;
  }
  .match-4 {
    border: solid 1px @color-highlight-blue;
    background-color: fade(@color-highlight-blue, 50%);
  }
  .match-3 {
    border: solid 1px fade(@color-highlight-blue, 60%);
    background-color: fade(@color-highlight-blue, 30%);
  }
  .match-2 {
    background-color: fade(@color-highlight-blue, 30%);
  }
  .highlighted:not(.match):not(.match-4) {
    border-color: @color-highlight-orange;
    background: fade(@color-highlight-orange, 40%);
  }
  .focused:not(.match):not(.match-4) {
    border-radius: 0;
    border-bottom-color: @color-highlight-green;
    background-color: fade(@color-highlight-green, 50%);
  }
}
</style>
