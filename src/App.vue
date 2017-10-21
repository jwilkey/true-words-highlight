<template>
  <div id="app">
    <router-view :class="{blur: alertMessage}"></router-view>

    <div v-if="alertMessage" class="alert theme-mid shadow-long">
      <p>{{ alertMessage }}</p>
      <button @click="alert(undefined)" class="callout-light alt">OK</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['alertMessage'])
  }
}
</script>

<style lang="less">
@import '../static/less/colors';
@import '../static/less/app';

body, html {
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
}
.alert {
  position: fixed;
  top: 30%;
  left: 0;
  right: 0;
  z-index: 2000;
  text-align: center;
  padding: 20px 40px;
}
</style>
