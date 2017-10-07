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

<style>
body, html {
  height: 100%;
  background-color: #111;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
