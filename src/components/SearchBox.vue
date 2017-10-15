<template>
  <div class="search-box">
    <div v-if="loading" class="loading flex-column align-center flex-center theme-mid">
      <i class="fa fa-circle-o-notch fa-spin fa-2x callout-light alt"></i>
    </div>

    <form @submit.prevent="search">
      <input v-model="passageQuery" placeholder="Search Bible passages" class="hi-bottom" autofocus />
      <button class="callout-light" @click.prevent="search" :disabled="!passageQuery">search</button>
      <button class="callout-light alt" v-if="passage" @click.prevent="onDone">cancel</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'search-box',
  data () {
    return {
      passageQuery: '',
      loading: false
    }
  },
  props: ['onDone'],
  computed: {
    ...mapGetters(['passage'])
  },
  methods: {
    ...mapActions(['setPassage', 'setText']),
    search () {
      this.loading = true
      const self = this
      const url = `https://bible.truewordsapp.com/search/${this.passageQuery}`
      axios.get(url, {headers: {'x-esv-api-key': window.esv}})
      .then(function (response) {
        self.loading = false
        self.passageQuery = ''
        self.setPassage(response.data.passage.reference)

        const text = response.data.passage.verses.map(v => {
          const text = v.text.replace(/<f>.*<\/f>/g, '')
          const chapter = v.number === 1 ? `\n[${v.chapter}:` : '['
          return `${chapter}${v.number}] ${text}`
        }).join(' ')
        self.setText(text)

        self.onDone()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$el.querySelector('#searcher input').focus()
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.search-box {
  position: relative;
  button {
    margin-top: 15px;
    margin-left: 15px;
    float: right;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    opacity: 0.8;
  }
}
</style>
