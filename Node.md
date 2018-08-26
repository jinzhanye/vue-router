match 根据 location 找到 routeRecord,然后通过 CreateRoute 将 routeRecord 转换成 Route 对象
transitionTo 的 confirmTrasntionw 实际上也就是在切换 this.current

createRoute 调用 formatMatch 获取到根路径的所有 record
