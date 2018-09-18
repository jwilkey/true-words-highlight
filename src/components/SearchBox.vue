<template>
  <div class="search-box">
    <div v-if="loading" class="loading flex-column align-center flex-center theme-mid">
      <i class="fa fa-circle-o-notch fa-spin fa-2x callout-light alt"></i>
    </div>

    <form @submit.prevent="search">
      <div class="flex-row">
        <input v-if="isESV" v-model="passageQuery" placeholder="Search Bible passages" class="hi-bottom flex-one" autofocus />

        <select v-model="translation">
          <option>ESV</option>
          <option value="EPT">EPT - Ancient Greek</option>
        </select>
      </div>

      <select v-if="isEPT" v-model="bookId">
        <option v-for="book in eptBooks" :value="book[0]">{{book[1]}}</option>
      </select>

      <div class="flex-row">
        <button type="button" class="callout-light alt" v-if="passage" @click.prevent="onDone">cancel</button>

        <button v-if="showQueryButton" type="submit" class="flex-one back-orange" @click.prevent="loadQuery">Search the Bible</button>

        <button v-if="searchButtonText" type="submit" class="flex-one callout-light" @click.prevent="loadPassage">{{searchButtonText}}</button>
      </div>
    </form>

    <!-- <div class="center-box blur">
      <translations class="shadow-long"></translations>
    </div> -->
  </div>
</template>

<script>
import Translations from './Translations'
import { mapGetters, mapActions } from 'vuex'
import dbtService from '../services/dbt_service'
import bibleApi from '../services/bible-api'
import nlp from 'compromise'
import osisNames from '../../static/json/osis.json'

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
      if (this.osis) {
        return `Read ${readableOsis(this.osis)}`
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
      window.location = `https://search.truewordsapp.com/#/?q=${this.passageQuery}`
    },
    onFail (error) {
      console.log(error)
      this.loading = false
      this.alert('There was a loading error. Check your network connection and try again.')
    },
    searchESV () {
      const self = this
      return bibleApi.searchEsv(this.passageQuery)
      .then(response => {
        self.loading = false
        self.passageQuery = ''
        debugger
        self.setPassage(response.data.passage.reference)
        self.setCopyright(response.data.copyright)

        var text = response.data.passage.verses.map(v => {
          var meta = v.number === 1 ? `(LINEBREAK) (${v.chapter}:${v.number})` : `(${v.number})`
          return `${meta} ${v.text.replace(/<f>\d*<\/f>/g, '')}`
        })

        var doc = nlp(text)
        self.setNlp(doc)
        var words = []

        doc.terms().list.forEach(outerTerm => {
          outerTerm.terms.forEach((term, index) => {
            if (term.text === '(LINEBREAK)') {
              words.push({word: '', meta: 'linebreak'})
            } else if (term.text.match(/\(\d*:?\d*\)/)) {
              words.push({word: term.text.replace(/[()]/g, ''), meta: 'muted'})
            } else {
              if (term.whitespace.before) {
                words.push({word: ' ', meta: 'space', id: term.uid})
              }
              term.text.split(/([^a-zA-Z\n']+)/g).forEach(t => {
                const isWord = t.match(/[a-zA-Z]/) !== null
                words.push({word: t, root: term.root, status: '', id: isWord ? term.uid : undefined, meta: isWord ? undefined : 'punctuation'})
              })
              if (term.whitespace.after) {
                words.push({word: ' ', meta: 'space', id: term.uid})
              }
            }
          })
        })

        return words
      })
    }
  },
  mounted () {
    this.passageQuery = this.passage
    this.translation = this.storeTranslation
    if (this.translation !== 'EPT') {
      this.$nextTick(() => {
        this.$el.querySelector('#searcher input').focus()
      })
    }
  }
}

function readableOsis (osis) {
  const refs = osis.split(',')

  const range = refs[0].split('-')
  const start = range[0].split('.')

  const l1 = start.length
  const startRef = `${osisNames[start[0]]} ${start[1]}${l1 > 2 ? ':' + start[2] : ''}`
  var endRef = ''
  if (range[1]) {
    const end = range[1].split('.')
    const l2 = end.length
    endRef = `-${end[1]}${l2 > 2 ? ':' + end[2] : ''}`
  }

  return `${startRef}${endRef}`
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";

.search-box {
  position: relative;
  input {
    margin-right: 10px;
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
