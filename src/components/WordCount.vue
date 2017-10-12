<template>
  <div class="word-count theme-mid">
    <p v-for="word in wordCounts" class="hi-bottom" @click="wordPressed(word[0])"><span class="count callout-light">{{word[1]}}</span> {{word[0]}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'text-viewer',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['wordCounts'])
  },
  methods: {
    ...mapActions(['wordSelected']),
    wordPressed (word) {
      this.wordSelected(word)
    }
  }
}
</script>

<style lang="less" scoped>
.word-count {
  padding-left: 8px;
  p {
    padding: 8px;
    margin: 0;
    cursor: pointer;
  }
  .count {
    padding: 3px 8px;
    border-radius: 16px;
    margin-right: 8px;
  }
}
</style>
