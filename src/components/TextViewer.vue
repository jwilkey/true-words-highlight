<template>
  <div class="text-viewer">
    <div id="searcher">
      <form @submit.prevent="search">
        <input v-model="query" placeholder="Search Bible" />
      </form>
    </div>
    <div v-if="passage">
      <h1>{{passage}}</h1>
    </div>
    <highlighter :text="text"></highlighter>
  </div>
</template>

<script>
import Highlighter from './Highlighter'
import axios from 'axios'

export default {
  name: 'text-viewer',
  data () {
    return {
      passage: '',
      text: require('../../static/samples/2_peter.json').text,
      query: ''
    }
  },
  components: {Highlighter},
  methods: {
    search () {
      const self = this
      const url = `https://bible.truewordsapp.com/search/${this.query}`
      axios.get(url, {headers: {'x-esv-api-key': '220c852e0d6abf77'}})
      .then(function (response) {
        self.passage = response.data.passage.reference
        self.text = response.data.passage.verses.map(v => v.text.replace(/<[^>]?.>/g, ' ')).join(' ')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.text-viewer {
  color: #efefef;
}
input {
  width: 100%;
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #999;
  padding: 8px;
  font-size: 16px;
}
</style>
