import API from '@/api/module/user'
import menuApi from '@/api/module/auth'
import router, { resetRouter } from '@/router'

// import { Toast } from 'vant'
const token = localStorage.getItem('token') || ''
const roleCodes = JSON.parse(localStorage.getItem('roleCodes')) || ''
const userInfo = JSON.parse(localStorage.getItem('userinfo')) || ''
const roles = JSON.parse(localStorage.getItem('roles')) || ''
const state = {
  userInfo: userInfo || '',
  token: token || '',
  roles: roles || [],
  roleCodes: roleCodes || []
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  DEL_TOKEN(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  //用户信息
  SET_USER_INFO(state, info) {
    state.userInfo = info
    localStorage.setItem('userinfo', JSON.stringify(info))
  },
  DEL_USER_INFO(state) {
    state.userInfo = {}
    localStorage.removeItem('userinfo')
  },
  //角色
  SET_ROLES(state, roles) {
    state.roles = roles
    localStorage.setItem('roles', JSON.stringify(roles))
  },
  CLEAR_ROLES(state) {
    state.roles = []
    localStorage.removeItem('roles')
  },
  SET_ROLES_CODE(state, roleCodes) {
    state.roleCodes = roleCodes
    localStorage.setItem('roleCodes', JSON.stringify(roleCodes))
  },
  CLEAR_ROLES_CODE(state) {
    state.roleCodes = []
    localStorage.removeItem('roleCodes')
  },
  //路由
  SET_ROUTERS(state, routers) {
    state.routers = routers
    // localStorage.setItem("routers", JSON.stringify(routers))
  },
  CLEAR_ROUTERS(state) {
    state.routers = []
    // localStorage.removeItem("routers")
  },
  //按钮权限
  SET_AUTH_BTNS(state, authBtns) {
    state.authBtns = authBtns
  },
  CLEAR_AUTH_BTNS(state) {
    state.authBtns = []
  }
}
const actions = {
  _login({ commit, dispatch }, obj) {
    API.login(obj).then(res => {
      const { token, username, id, avart, isMch, operationList, mchId, roleCodes } = res.data
      if (operationList && operationList.length > 0) {
        commit('SET_TOKEN', token)
        commit('SET_ROLES', operationList)
        commit('SET_ROLES_CODE', roleCodes)
        commit('SET_USER_INFO', { username, id, avart, isMch, mchId })
        router.push('/')
      } else {
        dispatch('_reset')
        // Toast({
        //   message: i18n.t("message.NO_ANY_PERMISSION"),
        //   duration: 5000
        // })
      }
    })
  },
  _loginOut({ dispatch }) {
    return new Promise((resolve, reject) => {
      API.loginout()
        .then(res => {
          dispatch('_reset')
          router.push('/login')
          resolve(res)
        })
        .catch(error => reject(error))
    })
  },
  _getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      menuApi
        .menuList()
        .then(() => {
          const authBtns = []
          // const routes = filterRouter(res.data, roles, authBtns)
          // commit('SET_ROUTERS', routes)
          commit('SET_AUTH_BTNS', authBtns)
          // addRouter(routes)
          // resolve(routes)
        })
        .catch(error => reject(error))
    })
  },
  _reset({ commit }) {
    commit('DEL_TOKEN')
    commit('DEL_USER_INFO')
    commit('CLEAR_ROLES')
    commit('CLEAR_AUTH_BTNS')
    commit('CLEAR_ROLES_CODE')
    resetRouter()
  }
}
export default {
  state,
  mutations,
  actions
}
