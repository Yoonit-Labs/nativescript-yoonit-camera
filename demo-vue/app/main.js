import Vue from 'nativescript-vue'
import App from './components/App'
import YoonitCamera from '@yoonit/nativescript-camera/vue'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.use(YoonitCamera)

new Vue({
  render: h =>
    h(
      'frame',
      [
        h(App)
      ]
    )
})
  .$start()
