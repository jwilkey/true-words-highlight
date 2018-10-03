<template>
  <div class="search-box">
    <div v-if="loading" class="loading flex-column align-center flex-center theme-mid">
      <i class="fa fa-circle-o-notch fa-spin fa-2x callout-light alt"></i>
    </div>

    <form @submit.prevent="search">
      <div class="flex-row align-center">
        <input v-if="isESV" v-model="passageQuery" placeholder="Search Bible passages" class="hi-bottom flex-one" autofocus />
        <button type="button" class="muted hi-bottom hi-right marginr" @click="passageQuery = ''"><i class="fa fa-close"></i></button>

        <select v-model="translation">
          <option>ESV</option>
          <option value="EPT">EPT - Ancient Greek</option>
        </select>
      </div>

      <select v-if="isEPT" v-model="bookId">
        <option v-for="book in eptBooks" :value="book[0]">{{book[1]}}</option>
      </select>

      <div class="flex-row pad">
        <button type="button" class="callout-light alt" v-if="passage" @click.prevent="onDone">cancel</button>

        <button v-if="showQueryButton" type="submit" class="flex-one back-orange" @click.prevent="loadQuery">Search the Bible</button>

        <button v-if="searchButtonText" type="submit" class="flex-one callout-light" @click.prevent="loadPassage">{{searchButtonText}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import Translations from './Translations'
import { mapGetters, mapActions } from 'vuex'
import dbtService from '../services/dbt_service'
import bible from '../helpers/bible'
import bibleApi from '../services/bible-api'
import nlp from 'compromise'
import nlprocessor from '../helpers/nlprocessor'

import parser from 'bible-passage-reference-parser/js/en_bcv_parser'
var bcv = new parser.bcv_parser()  // eslint-disable-line new-cap
bcv.options.book_alone_strategy = 'first_chapter'
bcv.options.book_sequence_strategy = 'include'

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
  components: { Translations },
  computed: {
    ...mapGetters({passage: 'passage', storeTranslation: 'translation'}),
    osis () {
      return bcv.parse(this.passageQuery).osis()
    },
    searchButtonText () {
      if (this.isESV && this.osis) {
        return `Read ${bible.readableOsis(this.osis)}`
      } else if (this.isEPT) {
        return 'Read'
      }
      return undefined
    },
    showQueryButton () {
      return this.passageQuery && (!this.osis || !this.passageQuery.match(/\d/))
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
    ...mapActions(['setPassage', 'setWords', 'setTranslation', 'setNlp', 'setCopyright']),
    search () {
      this.showQueryButton ? this.loadQuery() : this.loadPassage()
    },
    loadPassage () {
      this.loading = true
      this.setNlp(undefined)
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
    loadQuery () {
      const url = `https://search.truewordsapp.com/#/?q=${this.passageQuery}`
      var win = window.open(url, '_blank')
      win.focus()
    },
    onFail (error) {
      console.log(error)
      this.loading = false
      this.alert('There was a error.')
    },
    searchESV () {
      const self = this
      return bibleApi.searchEsv(this.passageQuery)
      .then(result => {
        self.loading = false
        self.passageQuery = ''
        self.setPassage(result.reference)
        self.setCopyright(result.copyright)

        var nlpDoc = nlp(result.text)
        self.setNlp(nlpDoc)
        return nlprocessor.extractWords(nlpDoc)
      })
    }
  },
  mounted () {
    this.passageQuery = this.passage
    this.translation = this.storeTranslation
    if (this.translation !== 'EPT') {
      this.$nextTick(() => {
        this.$el.querySelector('#searcher input').focus()
        if (this.$route.query.passage) {
          this.passageQuery = this.$route.query.passage
          this.$route.query.passage = undefined
          this.loadPassage()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.search-box {
  position: relative;
  button {
    &[type="button"] {
      background-color: transparent;
      border-radius: 0;
    }
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
