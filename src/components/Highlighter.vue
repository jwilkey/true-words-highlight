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
.highlighter {
  background-color: #111;
  color: #efefef;
  padding: 8px;
  font-size: 18px;
  line-height: 1.2;
  .twh-word {
    border-radius: 2px;
    border: solid 1px transparent;
    word-spacing: -3px;
  }
  .match {
    color: black;
    border: solid 1px #ffaa00;
    background-color: rgba(255, 230, 0, 1);
  }
  .match-4 {
    color: white;
    border: solid 1px rgba(255, 190, 0, 0.7);
    background-color: rgba(255, 190, 0, 0.5);
  }
  .match-3 {
    color: white;
    border: solid 1px rgba(255, 190, 0, 0.7);
    background-color: rgba(255, 190, 0, 0.3);
  }
  .match-2 {
    color: white;
    background-color: rgba(255, 190, 0, 0.3);
  }
}
</style>
