import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import enLocale from './json/en.json'
import zhLocale from './json/zh.json'

const { crc32 } = require('crc')

Vue.use(VueI18n)

const messages = {
  en: {
    ...enUS,
    ...enLocale
  },
  zh: {
    ...zhCN,
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('language') || 'en', // 设置默认语言
  messages: messages // 设置资源文件对象
})

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales(lang) {
  console.log(lang, messages, '------------')
  if (lang === 'en') {
    Locale.use(lang, enUS)
  } else if (lang === 'zh') {
    Locale.use(lang, zhCN)
  }
}

function setLanguage(lang, callback) {
  i18n.locale = lang
  localStorage.setItem('language', lang)
  vantLocales(lang)
  callback && callback()
}

// --------这里是i18next-scanner新增的配置-------------
function lang(key) {
  let hashKey = `K${crc32(key).toString(16)}` // 将中文转换成crc32格式去匹配对应的json语言包
  let words = i18n.t(hashKey)
  if (words == hashKey) {
    words = key
    console.log(key, '-无匹配语言key')
  }
  return words
}
// --------这里是i18next-scanner新增的配置-------------

export { i18n, vantLocales, setLanguage, lang }
