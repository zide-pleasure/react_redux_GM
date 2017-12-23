import { connect } from 'react-redux'

import {
  changePwd, clearPwd
} from '../modules/Module'
import Index from '../components/Index'


const mapDispatchtoProps = {
  changePwd,
  clearPwd
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  pwdChange: state.pwdChange
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
