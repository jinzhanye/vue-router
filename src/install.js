import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  // installed 标记确保 install 逻辑只执行一次
  // 也就是说当开发者多次执行 Vue.use(VueRouter) 时，实际上只执行一次 install 逻辑
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      // 调用 view.js 中的 registerRouteInstance
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {// 根 vm 实例
        this._routerRoot = this // _routerRoot 也就是根 vm 实例
        this._router = this.$options.router // VueRouter 的实例 router
        this._router.init(this)
        // 将 _route 变成响应式对象
        // 在每个 <router-view> 执行 render 函数的时候，都会访问 parent.$route，触发下面line 49 的 getter，收集依赖
        // 然后再执行完 transitionTo 后，修改 index.js line 118 app._route 的时候，又触发了setter，因此会通知 <router-view> 的渲染 watcher 更新，重新渲染组件。
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else { // 非根 vm
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
