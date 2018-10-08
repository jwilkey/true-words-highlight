<template>
  <div class="theme-mid small-pad flex-column">
    <p>Zoom text</p>
    <div class="zoom flex-row marginb">
      <button class="flex-one callout shadow marginr" @click.prevent="zoomOut"><i class="fa fa-minus"></i></button>
      <button class="flex-one callout shadow" @click.prevent="zoomIn"><i class="fa fa-plus"></i></button>
    </div>
    <button class="callout" @click="toggleVerses">{{ shouldHideMeta ? 'Show' : 'Hide'}} verses</button>

    <div class="margint">
      <p>Theme</p>
      <div class="flex-row">
        <button class="flex-one callout light marginr shadow" @click="setTheme('light-theme')">Light</button>
        <button class="flex-one callout dark shadow" @click="setTheme('dark-theme')">Dark</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  props: ['zoomOut', 'zoomIn', 'toggleVerses', 'shouldHideMeta'],
  methods: {
    setTheme (theme) {
      window.document.querySelector('html').classList.remove('light-theme')
      window.document.querySelector('html').classList.remove('dark-theme')
      window.document.querySelector('html').classList.add(theme)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
