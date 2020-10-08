import Vue from 'nativescript-vue'
import App from './components/App'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'YoonitCamera',
  () => require('@yoonit/nativescript-camera')
    .YoonitCamera
)

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
