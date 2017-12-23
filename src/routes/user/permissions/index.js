import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: 'permissions',
  breadcrumbName: '权限列表',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Index = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'permission', reducer })
      cb(null, Index)
    })
  }
})
