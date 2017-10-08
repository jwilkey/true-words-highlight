<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '../static/less/colors';

body, html {
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
