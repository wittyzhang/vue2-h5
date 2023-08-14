import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { constantRouterMap } from './router.config.js'
import { Toast } from 'vant'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

/** 删除动态路由 **/
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach(async (to, from, next) => {
  // const lang = localStorage.getItem("language") || "ZH"
  if (to.meta.name === 'login') {
    if (store.getters.token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (!store.getters.token) {
      //token过期
      next('/login')
    } else {
      // 只有催收员能进入系统
      if (store.getters.roleCodes.length === 0 || !store.getters.roleCodes.includes('ROLE_COLL')) {
        Toast({ message: '请使用催收员账号登录' })
        store.dispatch('_reset')
      } else {
        next()
      }
    }
  }
})
export default router
