<template>
  <div class="text-viewer theme-back">
    <search-box id="searcher" class="theme-mid shadow-long" v-if="searchingPassage" :on-done="searchComplete"></search-box>

    <div id="content" class="flex-column" :class="{blur: searchingPassage || loading}">
      <div id="menubar" v-if="passage" class="theme-mid shadow-long hi-bottom">
        <div class="flex-row align-center">
          <p class="passage shadow" @click="startSearch">{{passage}}</p>
          <div class="flex-one"></div>
          <div class="buttons">
            <div class="zoom">
              <i class="fa fa-minus shadow" @click.prevent="zoomOut"></i>
              <i class="fa fa-plus shadow" @click.prevent="zoomIn"></i>
            </div>
            <i class="fa fa-file-text-o" :class="{active: mode === 'word-counts'}" @click="toggleWordCounts"></i>
            <i class="fa fa-search" :class="{active: mode === 'search'}" @click="toggleSearchText"></i>
          </div>
        </div>
        <transition name="slide">
          <div v-if="mode === 'search'" class="text-search flex-row align-center">
            <input v-model="textQuery" placeholder="search text" />
            <i @click="clearTextQuery" class="fa fa-close red"></i>
          </div>
        </transition>
      </div>

      <div class="flex-one substance relative">
        <highlighter ref="highlighter" :query="textQuery"></highlighter>
        <transition name="slide">
          <div v-if="mode === 'word-counts'" class="right-menu shadow-long">
            <word-count class="scrolly"></word-count>
            <div class="fade-away"></div>
          </div>
        </transition>

        <div v-if="selectedWord" class="bottom-display theme-mid shadow-top">
          <span class="count">{{ wordCount }}</span> <span class="blue">{{ cleanWord }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from './SearchBox'
import Highlighter from './Highlighter'
import WordCount from './WordCount'
import { mapGetters } from 'vuex'

export default {
  name: 'text-viewer',
  data () {
    return {
      textQuery: '',
      searchingPassage: true,
      mode: undefined,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['passage', 'text', 'selectedWord', 'wordCounts']),
    cleanWord () {
      return clean(this.selectedWord)
    },
    wordCount () {
      const count = [...this.wordCounts].find(wc => wc[0] === this.selectedWord)
      return count ? count[1] : undefined
    }
  },
  components: { SearchBox, Highlighter, WordCount },
  methods: {
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
    clearTextQuery () {
      this.textQuery = ''
      this.$el.querySelector('#menubar input').focus()
    },
    toggleWordCounts () {
      this.mode = this.mode === 'word-counts' ? undefined : 'word-counts'
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
    }
  }
}

function clean (word) {
  if (word === undefined) {
    return word
  }
  return word.toLowerCase().replace(/[,."?;:]/g, '')
}
function getFontSize (element) {
  return parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'))
}
</script>

<style lang="less" scoped>
@import "../../static/less/flex";
@import "../../static/less/colors";

.text-viewer {
}
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
.text-search {
  i {
    margin-left: 15px;
  }
}
.relative {
  position: relative;
}
.right-menu {
  position: fixed;
  right: 0;
  top: 75px;
  bottom: 40px;
  z-index: 1000;
  .word-count {
    height: 100%;
  }
  .fade-away {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  }
}
.bottom-display {
  position: fixed;
  z-index: 900;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px;
  .count {
    padding: 1px 8px;
    border-radius: 16px;
    margin: 0 8px;
    background-color: @color-highlight-blue;
    color: white;
    text-shadow: 1px 0px 3px black;
  }
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
</style>
