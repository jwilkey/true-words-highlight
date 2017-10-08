<template>
  <div class="highlighter">
    <span v-for="word in words" @click="wordSelected(word)" class="twh-word" :class="[word.status]">{{word.word}}</span>
  </div>
</template>

<script>
export default {
  name: 'highlighter',
  data () {
    return {
      words: []
    }
  },
  props: ['text'],
  watch: {
    text () {
      this.words = this.text.split(/([^a-zA-Z]+)/g).map(word => {
        return {word, status: ''}
      })
    }
  },
  methods: {
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
}
</style>