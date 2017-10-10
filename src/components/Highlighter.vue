<template>
  <div class="highlighter">
    <span v-for="word in words" @click="wordSelected(word)" class="twh-word" :class="wordClasses(word)">{{word.word}}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'highlighter',
  data () {
    return {
    }
  },
  props: ['text', 'query'],
  watch: {
    text () {
      this.extractWords()
    }
  },
  computed: {
    ...mapGetters(['words'])
  },
  methods: {
    ...mapActions(['setWords']),
    extractWords () {
      const words = this.text.split(/([^a-zA-Z]+)/g).map(word => {
        return {word, status: ''}
      })
      this.setWords(words)
    },
    wordClasses (word) {
      var classes = [word.status]
      if (this.query && word.word.toLowerCase().startsWith(this.query.toLowerCase())) {
        classes.push('highlighted')
      }
      return classes
    },
    wordSelected (word) {
      this.words.forEach(w => {
        var w1 = clean(w.word)
        var w2 = clean(word.word)
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
      })
    }
  },
  mounted () {
  }
}

function clean (word) {
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
    word-spacing: -3px;
  }
  .match {
    color: @color-highlight-contrast;
    border: solid 1px darken(@color-highlight-blue, 30%);
    background-color: @color-highlight-blue;
  }
  .match-4 {
    color: white;
    border: solid 1px @color-highlight-blue;
    background-color: fade(@color-highlight-blue, 50%);
  }
  .match-3 {
    color: white;
    border: solid 1px fade(@color-highlight-blue, 60%);
    background-color: fade(@color-highlight-blue, 30%);
  }
  .match-2 {
    color: white;
    background-color: fade(@color-highlight-blue, 30%);
  }
  .highlighted:not(.match):not(.match-4) {
    border-color: @color-highlight-orange;
    background: linear-gradient(transparent 70%, @color-highlight-orange 95%);
  }
}
</style>
