import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { browserHistory } from 'react-router'
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'pwdChange',
  breadcrumbName: '修改密码',
  getComponent (nextState, cb) {
    // const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    require.ensure([], (require) => {
      NProgress.start()
      const pwdChange = require('./containers/IndexContainer').default
      const reducer = require('./modules/Module').default
      injectReducer(store, { key: 'pwdChange', reducer })
      cb(null, pwdChange)
      NProgress.done()
    })
    // if (subMenu.includes(10500)) {
    //   require.ensure([], (require) => {
    //     NProgress.start()
    //     const adminLog = require('./containers/IndexContainer').default
    //     const reducer = require('./modules/Module').default
    //     injectReducer(store, { key: 'adminLog', reducer })
    //     cb(null, adminLog)
    //     NProgress.done()
    //   })
    // } else {
    //   browserHistory.push('/')
    // }
  }
})
