<template>
  <div class="right-menu flex-column shadow-long">
    <div v-if="hasNlp" class="theme-mid hi-bottom focus-buttons">
      <div class="flex-row">
        <button class="flex-one" :class="focusBtnClass('deity')" @click="setFocused('deity')">God</button>
        <button class="flex-one" :class="focusBtnClass('keywords')" @click="setFocused('keywords')">Keywords</button>
      </div>
      <div class="flex-row">
        <button class="flex-one" :class="focusBtnClass('people')" @click="setFocused('people')">People</button>
        <button class="flex-one" :class="focusBtnClass('nouns')" @click="setFocused('nouns')">Nouns</button>
      </div>
      <div class="flex-row">
        <button class="flex-one" :class="focusBtnClass('verbs')" @click="setFocused('verbs')">Verbs</button>
        <button class="flex-one" :class="focusBtnClass('adjectives')" @click="setFocused('adjectives')">Adjectives</button>
      </div>
    </div>
    <word-count class="flex-one scrolly"></word-count>
    <div class="fade-away"></div>
  </div>
</template>

<script>
import WordCount from '@/components/WordCount'

export default {
  name: 'words-menu',
  props: ['focusBtnClass', 'setFocused', 'hasNlp'],
  components: { WordCount }
}
</script>

<style lang="less" scoped>
.right-menu {
  position: fixed;
  min-width: 200px;
  right: 0;
  top: 75px;
  bottom: 40px;
  z-index: 1000;
  .focus-buttons {
    button {
      font-size: 13px;
      margin: 2px;
      outline: none;
    }
  }
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
</style>
