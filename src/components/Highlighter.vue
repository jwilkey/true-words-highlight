<template>
  <div class="highlighter">
    <span v-for="word in words" @click="wordPressed(word)" class="twh-word" :class="wordClasses(word)">{{word.word}}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import synonymService from '../services/synonym_service'

export default {
  name: 'highlighter',
  data () {
    return {
    }
  },
  props: ['query', 'hideMeta', 'breakVerses'],
  watch: {
    selectedWord () {
      this.applySelection()
    }
  },
  computed: {
    ...mapGetters(['words', 'selectedWord', 'focusedIds', 'translation'])
  },
  methods: {
    ...mapActions(['setWords', 'wordSelected']),
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
      if (!word.meta) {
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

        var w1 = w.word
        var w2 = this.selectedWord
        if (w1 === w2) {
          w.status = 'match'
        } else {
          var matchLevel = 0
          for (var i = 0; i < (w1.length < w2.length ? w1.length : w2.length); i++) {
            if (w1[i] === w2[i] && matchLevel < 4) {
              matchLevel++
            } else {
              break
            }
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
    border-radius: 2px;
    border: solid 1px transparent;
    word-spacing: -1px;
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
  .synonym {
    text-shadow: 1px 0px 3px black;
    color: white;
    border: solid 1px @color-highlight-red;
    background-color: fade(@color-highlight-red, 50%);
  }
  .match {
    text-shadow: 1px 0px 3px black;
    color: white;
    border: solid 1px darken(@color-highlight-blue, 30%);
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
