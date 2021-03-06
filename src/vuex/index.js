import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  alertMessage: '',
  translation: 'ESV',
  passage: '',
  copyright: '',
  text: '',
  words: [],
  wordCounts: {},
  selectedWord: undefined,
  selectedVerses: {},
  nlp: undefined,
  focusedIds: []
}

export const getters = {
  alertMessage: state => state.alertMessage,
  translation: state => state.translation,
  passage: state => state.passage,
  copyright: state => state.copyright,
  text: state => state.text,
  words: state => state.words,
  wordCounts: state => state.wordCounts,
  selectedWord: state => state.selectedWord,
  selectedVerses: state => state.selectedVerses,
  nlp: state => state.nlp,
  focusedIds: state => state.focusedIds
}

export const actions = {
  setAlert ({ commit }, message) {
    commit('SET_ALERT_MESSAGE', message)
  },
  setTranslation ({ commit }, translation) {
    commit('SET_TRANSLATION', translation)
  },
  setPassage ({ commit }, passage) {
    commit('SET_PASSAGE', passage)
  },
  setCopyright ({ commit }, copyright) {
    commit('SET_COPYRIGHT', copyright)
  },
  setText ({ commit }, text) {
    commit('SET_TEXT', text)
  },
  setWords ({ commit }, words) {
    commit('SET_WORDS', words)

    const wordCounts = words.reduce((counts, word) => {
      if (word.word && !word.word.match(/[\s.'0-9]/)) {
        const w = word.word.replace(word.word.charAt(0), word.word.charAt(0).toUpperCase())
        counts[w] = (counts[w] || 0) + 1
      }
      return counts
    }, {})
    const counts = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])

    commit('SET_WORD_COUNTS', counts)
  },
  clearAll ({ commit }) {
    commit('SET_SELECTED_VERSES', {})
    commit('SET_SELECTED_WORD', undefined)
  },
  wordSelected ({ commit }, word) {
    commit('SET_SELECTED_WORD', word)
    commit('SET_FOCUSED_IDS', [])
  },
  verseSelected ({commit}, verse) {
    commit('VERSE_SELECTED', verse)
  },
  setNlp ({ commit }, nlp) {
    commit('SET_NLP', nlp)
  },
  setFocusedIds ({ commit }, ids) {
    commit('SET_FOCUSED_IDS', ids)
  }
}

export const mutations = {
  SET_ALERT_MESSAGE (state, message) {
    state.alertMessage = message
  },
  SET_TRANSLATION (state, translation) {
    state.translation = translation
  },
  SET_PASSAGE (state, passage) {
    state.passage = passage
  },
  SET_COPYRIGHT (state, copyright) {
    state.copyright = copyright
  },
  SET_TEXT (state, text) {
    state.text = text
  },
  SET_WORDS (state, words) {
    state.words = words
  },
  VERSE_SELECTED (state, verse) {
    state.selectedVerses = { ...state.selectedVerses, [verse]: !state.selectedVerses[verse] }
  },
  SET_WORD_COUNTS (state, wordCounts) {
    state.wordCounts = wordCounts
  },
  SET_SELECTED_WORD (state, word) {
    state.selectedWord = word
  },
  SET_SELECTED_VERSES (state, verses) {
    state.selectedVerses = verses
  },
  SET_NLP (state, nlp) {
    state.nlp = nlp
  },
  SET_FOCUSED_IDS (state, ids) {
    state.focusedIds = ids
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
