import {injectReducer} from '../../../../store/reducers'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { browserHistory } from 'react-router'
export default(store) => ({
  path: 'baseinfos',
  breadcrumbName: '背包道具信息',
  getComponent(location, cb) {
    const subMenu = JSON.parse(sessionStorage.getItem('subMenu'))

    if (subMenu.includes(70200)) {
      require.ensure([], (require) => {
        NProgress.start()
        const BaseInfos = require('./containers/BaseInfosContainer').default
        const reducer = require('./modules/BaseInfosModules').default
        injectReducer(store, {
          key: 'baseinfos',
          reducer
        })
        cb(null, BaseInfos)
        NProgress.done()
      }, 'baseinfos')
    } else {
      browserHistory.push('/')
    }
  }
})
