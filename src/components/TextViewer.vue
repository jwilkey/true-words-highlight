<template>
  <div class="text-viewer theme-back">
    <div v-if="loading" class="loading flex-column align-center flex-center">
      <i class="fa fa-circle-o-notch fa-spin fa-2x"></i>
    </div>

    <div id="searcher" class="theme-mid shadow-long" v-if="searchingPassage">
      <form @submit.prevent="search">
        <input v-model="passageQuery" placeholder="Search Bible passages" autofocus />
        <button class="callout-light" @click.prevent="search" :disabled="!passageQuery">search</button>
        <button class="callout-light alt" v-if="passage" @click.prevent="searchingPassage = false">cancel</button>
      </form>
    </div>

    <div id="content" class="flex-column" :class="{blur: searchingPassage || loading}">
      <div id="menubar" v-if="passage" class="theme-mid shadow-long hi-bottom">
        <div class="flex-row align-center">
          <p class="passage" @click="startSearch">{{passage}} <i class="fa fa-edit callout-light alt"></i></p>
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
        <highlighter ref="highlighter" :text="text" :query="textQuery"></highlighter>
        <transition name="slide">
          <div v-if="mode === 'word-counts'" class="right-menu shadow-long">
            <word-count class="scrolly"></word-count>
            <div class="fade-away"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Highlighter from './Highlighter'
import WordCount from './WordCount'
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
      mode: undefined,
      loading: false
    }
  },
  components: { Highlighter, WordCount },
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
        self.text = response.data.passage.verses.map(v => {
          const text = v.text.replace(/<f>.*<\/f>/g, '')
          const chapter = v.number === 1 ? `\n[${v.chapter}:` : '['
          return `${chapter}${v.number}] ${text}`
        }).join(' ')
      })
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
  button {
    margin-top: 15px;
    margin-left: 15px;
    float: right;
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
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
    user-select: none;
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
input {
  box-sizing: border-box;
  width: 100%;
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
.relative {
  position: relative;
}
.right-menu {
  position: fixed;
  right: 0;
  top: 75px;
  bottom: 10px;
  border-top: solid 5px rgba(0, 0, 0, 0.5);
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
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  z-index: 1000;
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
