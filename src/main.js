// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import { mapActions } from 'vuex'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    ...mapActions(['setAlert']),
    alert (message) {
      this.setAlert(message)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
