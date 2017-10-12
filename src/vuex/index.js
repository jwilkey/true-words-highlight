import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  words: [],
  wordCounts: {},
  selectedWord: undefined
}

export const getters = {
  words: state => state.words,
  wordCounts: state => state.wordCounts,
  selectedWord: state => state.selectedWord
}

export const actions = {
  setWords ({ commit }, words) {
    commit('SET_WORDS', words)

    var wordCounts = {}
    words.reduce((counts, word) => {
      if (word.word.match(/[a-zA-Z]/)) {
        wordCounts[word.word] = (wordCounts[word.word] || 0) + 1
      }
    }, {})
    var counts = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])

    commit('SET_WORD_COUNTS', counts)
  },
  wordSelected ({ commit }, word) {
    commit('SET_SELECTED_WORD', word)
  }
}

export const mutations = {
  SET_WORDS (state, words) {
    state.words = words
  },
  SET_WORD_COUNTS (state, wordCounts) {
    state.wordCounts = wordCounts
  },
  SET_SELECTED_WORD (state, word) {
    state.selectedWord = word
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
