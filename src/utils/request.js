import router, { resetRouter } from '@/router'
import store from '@/store'
import axios from 'axios'

// import i18n from '@/locales'

import { Toast } from 'vant'

// 根据环境不同引入不同api地址
import { baseApi } from '@/config'

function tokenError(msg) {
  store.commit('DEL_TOKEN')
  store.commit('DEL_USER_INFO')
  store.commit('CLEAR_TABS')
  store.commit('CLEAR_ROLES')
  store.commit('CLEAR_ROUTERS')
  store.commit('CLEAR_AUTH_BTNS')

  resetRouter()
  Toast({ message: msg })
  router.push('/login')
}

const http = axios.create({
  baseURL: baseApi, // url = base api url + request url
  timeout: 300000
})
const SUCCESS_CODE = '200'

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
http.defaults.transformRequest = [
  function (data) {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    } else {
      return JSON.stringify(data)
    }
  }
]

http.interceptors.request.use(
  config => {
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    // ---
    const token = store.state.login.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // ---
    // const envLang = process.env.VUE_APP_LANG
    // config.headers.lang = localStorage.getItem("language") === envLang ? envLang : "ZH"
    // ---
    config.headers.lang = localStorage.getItem('language') ? localStorage.getItem('language').toUpperCase() : 'ZH'

    if (!config.noFormatUndefined && config.params) {
      Object.keys(config.params).forEach(key => {
        if (config.params[key] === '') {
          config.params[key] = undefined
        }
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    Toast.clear()
    const data = response.data
    if (response.request.responseType === 'blob') {
      return Promise.resolve(data)
    }
    if (data.code !== SUCCESS_CODE) {
      if (data.code === '1011006') {
        tokenError('login again')
        return
      }
      Toast(data.msg)
      return Promise.reject(data)
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
    const errorRes = error.response
    Toast.clear()
    if (errorRes) {
      switch (errorRes.status) {
        case 401:
          // tokenError(i18n.t('message.LOGIN_EXPIRED'))
          break
        case 404:
          // console.error(i18n.t('message.NOT_EXIST'))
          break
        default:
          console.error(errorRes.data.msg)
      }
    } else {
      if (error.message.includes('timeout')) {
        // console.error(i18n.t('message.NETWORK_ANOMALY'))
      } else {
        // console.error(i18n.t('message.NETWORK_NOT_CONNECTED'))
      }
    }
    return Promise.reject(error)
  }
)

export default http
