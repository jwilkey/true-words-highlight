<template>
  <div class="text-viewer theme-back">
    <div v-if="loading" class="loading flex-column align-center flex-center">
      <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
    </div>

    <div id="searcher" class="theme-mid shadow-long" v-if="searchingPassage">
      <form @submit.prevent="search">
        <input v-model="passageQuery" placeholder="Search Bible" autofocus />
      </form>
      <button class="callout-light" v-if="passage" @click="searchingPassage = false">cancel</button>
    </div>

    <div id="content" class="flex-column" :class="{blur: searchingPassage}">
      <div id="menubar" v-if="passage" class="theme-mid shadow">
        <div class="flex-row align-center">
          <p class="flex-one passage" @click="startSearch">{{passage}} <i class="fa fa-edit callout-light alt"></i></p>
          <i class="fa fa-search" @click="startSearchText"></i>
        </div>
        <div v-if="searchingText" class="text-search flex-row align-center">
          <input v-model="textQuery" placeholder="search text" />
          <i @click="clearTextQuery" class="fa fa-close red"></i>
        </div>
      </div>

      <highlighter class="flex-one substance" :text="text" :query="textQuery"></highlighter>
    </div>
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
      passageQuery: '',
      textQuery: '',
      searchingPassage: true,
      searchingText: false,
      loading: false
    }
  },
  components: {Highlighter},
  methods: {
    startSearch () {
      this.searchingPassage = true
      this.$nextTick(() => {
        this.$el.querySelector('#searcher input').focus()
      })
    },
    search () {
      this.searchingPassage = false
      this.loading = true
      const self = this
      const url = `https://bible.truewordsapp.com/search/${this.passageQuery}`
      axios.get(url, {headers: {'x-esv-api-key': window.esv}})
      .then(function (response) {
        self.loading = false
        self.passageQuery = ''
        self.passage = response.data.passage.reference
        self.text = response.data.passage.verses.map(v => v.text.replace(/<[^>]?.>/g, ' ')).join(' ')
      })
    },
    startSearchText () {
      this.searchingText = true
      this.$nextTick(() => {
        this.$el.querySelector('#menubar input').focus()
      })
    },
    clearTextQuery () {
      this.textQuery = ''
      this.$el.querySelector('#menubar input').focus()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.text-viewer {
}
#searcher {
  position: fixed;
  top: 20%;
  left: 20px;
  right: 20px;
  padding: 20px 8px;
  border-radius: 2px;
  z-index: 100;
  button {
    margin-top: 15px;
    float: right;
  }
}
#content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  #menubar {
    padding: 5px 15px;
  }
  .substance {
    overflow-x: hidden;
  }
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
  border-radius: 0px;
}
.passage {
  i {
    margin-left: 5px;
  }
}
.text-search {
  i {
    margin-left: 15px;
  }
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
.blur {
  filter: blur(3px);
}
</style>
