// 我们只需要导入初始渲染所需的模块
import LayoutsContainer from '../containers/LayoutsContainer.js'
import HomeContainer from './Home/containers/HomeContainer.js'

import sango2 from './sango2'
import users from './user'
import PageNotFound from './PageNotFound'
import pwdChange from './pwdChange'
import Redirect from './PageNotFound/redirect'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start()

import {injectReducer} from '../store/reducers'
import {default as loginReducer} from './../modules/login.js'

export const createRoutes = store => ({
  path: '/',
  breadcrumbName: 'Home',
  getComponent(nextState, cb) {
    injectReducer(store, {
      key: 'islogin',
      reducer: loginReducer
    })
    cb(null, LayoutsContainer)
    NProgress.done()
  },
  getIndexRoute(location, callback) {
    callback(null, {component: HomeContainer})
  },
  childRoutes: [
    sango2(store),
    users(store),
    PageNotFound(),
    pwdChange(store),
    Redirect
  ]
})

export default createRoutes
