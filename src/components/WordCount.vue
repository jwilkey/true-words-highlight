<template>
  <div class="word-count theme-mid">
    <p v-for="word in wordCounts" class="hi-bottom">{{word[0]}} - {{word[1]}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'text-viewer',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['wordCounts'])
  }
}
</script>

<style lang="less" scoped>
.word-count {
  padding-left: 8px;
  p {
    padding: 8px;
    margin: 0;
  }
}
</style>
