match 根据 location 找到 routeRecord,然后通过 CreateRoute 将 routeRecord 转换成 Route 对象

transitionTo 的 confirmTrasntionw 实际上是切换 this.current

createRoute 调用 formatMatch 获取到根路径的所有 record

在混入的 beforeCreate 钩子函数中，会执行 registerInstance 方法，进而执行 render 函数中定义的 registerRouteInstance 方法，
从而给 matched.instances[name] 赋值当前组件的 vm 实例。

其他

子组件是不受router 控制的，所以导航守卫放在子组件是无效的。

研究 切换页面 旧页面组件 beforeRouterLeave ->  新页面组件 created -> 旧页面组件 beforeDestoryed 

````
beforeCreate () {
    if (isDef(this.$options.router)) {// 根 vm 实例
      this._routerRoot = this // _routerRoot 也就是根 vm 实例
      this._router = this.$options.router // VueRouter 的实例 router
      this._router.init(this)
      // 将 _route 变成响应式对象
      Vue.util.defineReactive(this, '_route', this._router.history.current)
    } else { // 非根 vm
      // || this ?????
      this._routerRoot = (this.$parent && this.$parent._routerRoot) || this // 指向根 vm 实例
    }
    registerInstance(this, this)
  },
````


`history` 构造过程中在根 url 后补上 `/#/` ???
