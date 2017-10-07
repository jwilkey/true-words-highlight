import Vue from 'vue'
import Router from 'vue-router'
import TextViewer from '@/components/TextViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TextViewer',
      component: TextViewer
    }
  ]
})
