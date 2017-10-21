<template>
  <div class="search-box">
    <div v-if="loading" class="loading flex-column align-center flex-center theme-mid">
      <i class="fa fa-circle-o-notch fa-spin fa-2x callout-light alt"></i>
    </div>

    <form @submit.prevent="search">
      <input v-if="isESV" v-model="passageQuery" placeholder="Search Bible passages" class="hi-bottom" autofocus />

      <select v-if="isEPT" v-model="bookId">
        <option v-for="book in eptBooks" :value="book[0]">{{book[1]}}</option>
      </select>

      <div v-if="isEPT">

      </div>

      <div class="flex-row">
        <select v-model="translation">
          <option>ESV</option>
          <option value="EPT">EPT - Ancient Greek</option>
        </select>
        <div class="flex-one"></div>
        <button type="button" class="callout-light alt" v-if="passage" @click.prevent="onDone">cancel</button>
        <button type="submit" class="callout-light" @click.prevent="search" :disabled="isDisabled">{{searchButtonText}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import dbtService from '../services/dbt_service'

export default {
  name: 'search-box',
  data () {
    return {
      passageQuery: '',
      translation: 'ESV',
      bookId: 'Matt',
      loading: false
    }
  },
  props: ['onDone'],
  watch: {
    translation (value) {
      this.setTranslation(value)
    }
  },
  computed: {
    ...mapGetters({passage: 'passage', storeTranslation: 'translation'}),
    searchButtonText () {
      return this.isEPT ? 'go' : 'search'
    },
    isESV () {
      return this.translation === 'ESV'
    },
    isEPT () {
      return this.translation === 'EPT'
    },
    isDisabled () {
      return this.translation === 'ESV'
      ? !this.passageQuery
      : !this.bookId
    },
    eptBooks () {
      return dbtService.books()
    }
  },
  methods: {
    ...mapActions(['setPassage', 'setWords', 'setTranslation']),
    search () {
      this.loading = true
      const self = this
      if (this.translation === 'ESV') {
        this.searchESV()
        .then(words => {
          self.setWords(words)
          self.onDone()
        }, this.onFail)
      } else {
        dbtService.fetch(this.bookId)
        .then(words => {
          self.setPassage(self.bookId)
          self.setWords(words)
          self.onDone()
        }, this.onFail)
      }
    },
    onFail () {
      this.loading = false
      this.alert('There was a loading error. Check your network connection and try again.')
    },
    searchESV () {
      const self = this
      const url = `https://bible.truewordsapp.com/search/${this.passageQuery}`
      return axios.get(url, {headers: {'x-esv-api-key': window.esv}})
      .then(function (response) {
        self.loading = false
        self.passageQuery = ''
        self.setPassage(response.data.passage.reference)

        const text = response.data.passage.verses.map(v => {
          const text = v.text.replace(/<f>.*<\/f>/g, '')
          const chapter = v.number === 1 ? `\n[${v.chapter}:` : '['
          return `${chapter}${v.number}] ${text}`
        }).join(' ')
        const words = text.split(/([^a-zA-Z\n]+)/g).map(word => {
          return word === '\n'
          ? {word, status: 'break'}
          : {word, status: ''}
        })
        return words
      })
    }
  },
  mounted () {
    this.translation = this.storeTranslation
    if (this.translation !== 'EPT') {
      this.$nextTick(() => {
        this.$el.querySelector('#searcher input').focus()
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.search-box {
  position: relative;
  select {
    margin-top: 15px;
  }
  button {
    margin-top: 15px;
    margin-left: 15px;
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
