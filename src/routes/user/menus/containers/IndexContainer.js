import { connect } from 'react-redux'
import {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  fetchPermissions,
  updateMenuRoute,
  updateMenuPermit,
  keepPermission
} from '../../permissions/modules/Module'
import Page from '../components/Page'

const mapDispatchtoProps = {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  fetchPermissions,
  updateMenuRoute,
  updateMenuPermit,
  keepPermission
}

const mapStateToProps = (state) => ({
  permission: state.permission,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
