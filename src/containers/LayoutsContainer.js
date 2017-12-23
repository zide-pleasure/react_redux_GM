import {connect} from 'react-redux'
import {isLoginActionCreator, fetchPurview, onceLogin, receiveLogin, singOut} from './../modules/login.js'

import Layouts from './../layouts/CoreLayout'

const mapDispatchToProps = {
  isLoginActionCreator,
  fetchPurview,
  receiveLogin,
  onceLogin,
  singOut
}

const mapStateToProps = (state) => ({
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Layouts)

/**
 * mapStateToProps 会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
 * mapStateToProps 的第一个参数总是state对象，还可以使用第二个参数ownProps，代表容器组件的props对象。
 * 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
 * connect方法可以省略 mapStateToProps 参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
 */
