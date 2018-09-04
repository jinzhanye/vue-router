match 根据 location 找到 routeRecord,然后通过 CreateRoute 将 routeRecord 转换成 Route 对象

transitionTo 的 confirmTrasntionw 实际上是切换 this.current

createRoute 调用 formatMatch 获取到根路径的所有 record

在混入的 beforeCreate 钩子函数中，会执行 registerInstance 方法，进而执行 render 函数中定义的 registerRouteInstance 方法，
从而给 matched.instances[name] 赋值当前组件的 vm 实例。

## 其他

- 子组件是不受router 守卫控制的，所以导航守卫放在子组件是无效的。

这个因为守卫函数是从routes 配置中每个 route 对应的 component 中 提取的
````js
const routes = [{
  path: '/foo/:id',
  component: Foo,
  name: 'Foo',
  // 路由独享的守卫
  beforeEnter: (to, from, next) => {
    // ...
    console.log('foo 路由独享的守卫,beforeEnter');
    next();
  }
}, {
  path: '/bar',
  component: Bar,
  name: 'Bar',
  children: [{
    path: 'baz',
    component: Baz,
    name: 'Baz'
  }]
}];
````

- 研究 切换页面 旧页面组件 beforeRouterLeave ->  新页面组件 created -> 旧页面组件 beforeDestoryed 

- 为什么加上 fullpath 会消除 keep-alive 

- `history` 构造过程中在根 url 后补上 `/#/` ???
