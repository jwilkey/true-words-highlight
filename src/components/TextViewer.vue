<template>
  <div class="text-viewer theme-back">
    <search-box id="searcher" class="theme-mid shadow-long" v-if="searchingPassage" :on-done="searchComplete"></search-box>

    <div id="content" v-if="hasWords" class="flex-column" :class="{blur: searchingPassage || loading}">
      <div id="menubar" v-if="passage" class="theme-mid shadow-long hi-bottom">
        <div class="flex-row align-center">
          <p class="passage shadow" @click="startSearch">{{passage}}</p>
          <div class="flex-one"></div>
          <div class="buttons">
            <i class="fa fa-search" :class="{active: mode === 'search'}" @click="toggleSearchText"></i>
            <i class="fa fa-file-text-o" :class="{active: mode === 'word-counts'}" @click="toggleWordCounts"></i>
            <i class="fa fa-gear" :class="{active: mode === 'settings'}" @click="toggleSettings"></i>
          </div>
        </div>
        <transition name="slide">
          <div v-if="mode === 'search'" class="text-search flex-row align-center margint">
            <input v-model="textQuery" placeholder="search text" class="theme-mid" />
            <i @click="clearTextQuery" class="fa fa-close red"></i>
          </div>
        </transition>
      </div>

      <div class="flex-one flex-row relative">
        <div class="flex-one flex-column vfull">
          <div class="flex-one scrolly">
            <highlighter ref="highlighter" :query="textQuery" :hide-meta="shouldHideMeta"></highlighter>
            <p class="copyright muted hi-top">{{copyright}}</p>
          </div>
          <div v-if="selectedWord" class="theme-mid z2 small-pad shadow-top">
            <span class="count">{{ wordCount }}</span> <span class="blue">{{ selectedWord }}</span>
          </div>
        </div>

        <div v-show="showMenu" class="right-menu">
          <transition name="slide">
            <div v-if="showMenu" class="right-menu-content vfull theme-mid scrolly shadow-long">
                <words-menu v-if="mode === 'word-counts'" :focusBtnClass="focusBtnClass" :setFocused="setFocused" :hasNlp="hasNlp"></words-menu>
                <settings v-if="mode === 'settings'" :zoomOut="zoomOut" :zoomIn="zoomIn" :toggleVerses="toggleVerses" :shouldHideMeta="shouldHideMeta"></settings>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from './SearchBox'
import Highlighter from './Highlighter'
import WordsMenu from '@/components/WordsMenu'
import Settings from '@/components/Settings'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'text-viewer',
  data () {
    return {
      textQuery: '',
      searchingPassage: true,
      mode: undefined,
      loading: false,
      focusedMode: '',
      shouldHideMeta: false
    }
  },
  computed: {
    ...mapGetters(['passage', 'words', 'text', 'selectedWord', 'wordCounts', 'nlp', 'copyright']),
    hasWords () {
      return this.words && this.words.length
    },
    wordCount () {
      const count = [...this.wordCounts].find(wc => wc[0] === this.selectedWord)
      return count ? count[1] : undefined
    },
    hasNlp () {
      return this.nlp !== undefined
    },
    showMenu () {
      return this.mode !== undefined
    }
  },
  components: { SearchBox, Highlighter, WordsMenu, Settings },
  methods: {
    ...mapActions(['setFocusedIds']),
    startSearch () {
      this.searchingPassage = true
    },
    searchComplete () {
      this.searchingPassage = false
    },
    toggleSearchText () {
      this.mode = this.mode === 'search' ? undefined : 'search'
      if (this.mode === 'search') {
        this.$nextTick(() => {
          this.$el.querySelector('#menubar input').focus()
        })
      }
    },
    toggleVerses () {
      this.shouldHideMeta = !this.shouldHideMeta
    },
    clearTextQuery () {
      this.textQuery = ''
      this.$el.querySelector('#menubar input').focus()
    },
    toggleWordCounts () {
      this.mode = this.mode === 'word-counts' ? undefined : 'word-counts'
    },
    toggleSettings () {
      this.mode = this.mode === 'settings' ? undefined : 'settings'
    },
    zoomOut () {
      const highlighter = this.$refs.highlighter.$el
      const fontSize = getFontSize(highlighter)
      const newFontSize = fontSize === 1 ? 1 : fontSize - 1
      highlighter.style.fontSize = `${newFontSize}px`
    },
    zoomIn () {
      const highlighter = this.$refs.highlighter.$el
      const fontSize = getFontSize(this.$refs.highlighter.$el)
      const newFontSize = fontSize === 40 ? 40 : fontSize + 1
      highlighter.style.fontSize = `${newFontSize}px`
    },
    focusBtnClass (type) {
      return type === this.focusedMode ? 'callout' : 'callout-light'
    },
    setFocused (type) {
      if (type === this.focusedMode) {
        this.focusedMode = ''
        this.setFocusedIds([])
      } else {
        this.focusedMode = type
        switch (type) {
          case 'deity': this.focusSubset(this.nlp.match(`(spirit|jesus|christ|god|god's|lord|son)`))
            break
          case 'keywords': this.focusSubset(this.nlp.match('(faith|believe|hope|love|justice|righteous|righteousness|death|sin|true|truth|good|evil|wrong)'))
            break
          case 'people': this.focusSubset(this.nlp.people())
            break
          case 'nouns': this.focusSubset(this.nlp.nouns())
            break
          case 'adjectives': this.focusSubset(this.nlp.adjectives())
            break
          case 'verbs': this.focusSubset(this.nlp.verbs())
            break
          default:
        }
      }
      this.mode = undefined
    },
    focusSubset (subset) {
      var ids = []
      subset.list.forEach(item => {
        ids.push(...item.terms.map(term => term.uid))
      })
      this.setFocusedIds(ids)
    }
  }
}

function getFontSize (element) {
  return parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'))
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";
@import "../../static/less/colors";

#searcher {
  position: fixed;
  top: 20%;
  left: 20px;
  right: 20px;
  padding: 20px 15px;
  border-radius: 2px;
  z-index: 100;
}
#content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  #menubar {
    padding: 10px 15px;
    user-select: none;
    .passage {
      padding: 5px 10px;
      border-radius: 3px;
      margin: 0;
      cursor: pointer;
    }
    .buttons {
      i {
        cursor: pointer;
      }
      & > * {
        padding-left: 15px;
        display: inline-block;
        &.active {
          color: @color-highlight-green;
          text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
        }
      }
      .zoom {
        i {
          padding: 5px 8px;
          border-radius: 2px;
        }
      }
    }
  }
  .substance {
    overflow-x: hidden;
  }
}
.copyright {
  padding: 20px;
}
.text-search {
  i {
    margin-left: 15px;
  }
}
.relative {
  position: relative;
}
.count {
  padding: 1px 8px;
  border-radius: 16px;
  margin: 0 8px;
  background-color: @color-highlight-blue;
  color: white;
  text-shadow: 1px 0px 3px black;
}
.blur {
  filter: blur(3px);
}
.freeze {
  overflow-y: hidden;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .5s
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
.right-menu {
  position: relative;
  max-width: 20%;
  max-height: 100%;
  padding-top: 10px;
  z-index: 1000;
  margin-left: 10px;
  .right-menu-content {
    min-width: 200px;
  }
}
@media only screen and (max-width: 600px) {
  .right-menu {
    position: fixed;
    min-width: 200px;
    padding: 0;
    right: 0;
    top: 75px;
    bottom: 40px;
  }
}

</style>
