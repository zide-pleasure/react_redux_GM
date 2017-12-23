import { connect } from 'react-redux'
import {
  fetchRoleMenus,
  clearRoleMenus,
  updateRoleMenu
} from '../../permissions/modules/Module'
import Menu from '../components/Menu'

const mapDispatchtoProps = {
  fetchRoleMenus,
  clearRoleMenus,
  updateRoleMenu
}

const mapStateToProps = (state) => ({
  permission: state.permission,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Menu)
