import * as Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import en from 'element-plus/es/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import installIcon  from '@/icons' // icon
import '@/permission' // permission control

window.$vueApp = Vue.createApp(App)
installIcon(window.$vueApp)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementPlus lang to EN
window.$vueApp.use(ElementPlus, { locale: en })

window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}
window.$vueApp.use(store)
window.$vueApp.use(router)
window.$vueApp.mount('#app')
