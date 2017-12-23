export default (store) => ({
  path: 'user',
  breadcrumbName: '权限管理',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./permissions/index').default(store),
        require('./menus').default(store),
        require('./roles').default(store),
        require('./users').default(store),
        require('./adminLogs').default(store)
      ])
    })
  }
})
