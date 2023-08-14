// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'amfe-flexible'

// filters
import './filters'
Vue.config.productionTip = false

/**=====国际化===== */
import VueI18n from 'vue-i18n'
import { i18n, vantLocales, setLanguage, lang } from './locales/index'
console.log('当前的语言是：', i18n.locale)
// vant-ui组件国际化
vantLocales(i18n.locale)
// 多语言
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.$setLocales = setLanguage
Vue.prototype.$lang = lang // 注入全局, 页面$lang('xxx')调用

/*=====https=====*/
import http from '@/api/index'
import { Toast } from 'vant'
Vue.prototype.$http = http
Vue.prototype.$Toast = Toast

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
