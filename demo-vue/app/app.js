/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Camera
 * The most advanced and modern Camera module for Android with a lot of awesome features
 *
 * Luigui Delyer, Haroldo Teruya, Victor Goulart, Gabriel Rizzo & Márcio Bruffato @ 2020-2021
 */

import Vue from 'nativescript-vue'
import App from './components/App'
import YoonitCamera from '@yoonit/nativescript-camera/vue'

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
