<template>
  <div class="text-viewer theme-back">
    <div v-if="loading" class="loading flex-column align-center flex-center">
      <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
    </div>
    <div id="searcher" v-if="searching">
      <form @submit.prevent="search">
        <input v-model="query" placeholder="Search Bible" />
      </form>
    </div>
    <div v-if="passage" class="flex-row align-center">
      <p class="flex-one">{{passage}}</p>
      <i class="fa fa-search" @click="startSearch"></i>
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
      query: '',
      searching: true,
      loading: false
    }
  },
  components: {Highlighter},
  methods: {
    startSearch () {
      this.searching = true
      this.$nextTick(() => {
        this.$el.querySelector('#searcher input').focus()
      })
    },
    search () {
      this.searching = false
      this.loading = true
      const self = this
      const url = `https://bible.truewordsapp.com/search/${this.query}`
      axios.get(url, {headers: {'x-esv-api-key': window.esv}})
      .then(function (response) {
        self.loading = false
        self.passage = response.data.passage.reference
        self.text = response.data.passage.verses.map(v => v.text.replace(/<[^>]?.>/g, ' ')).join(' ')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.text-viewer {
  padding: 8px;
}
input {
  box-sizing: border-box;
  width: 100%;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: solid 1px #999;
  padding: 8px;
  font-size: 16px;
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
}
</style>
