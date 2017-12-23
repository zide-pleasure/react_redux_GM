import {connect} from 'react-redux'
import {fetchProductsMap} from '../../../../modules/products'
import {
  fetchRoles,
  createRole,
  deleteRole,
  updateRole,
  fetchMenus,
  updateRoleMenu,
  keepPermission,
  updateLimit
} from '../../permissions/modules/Module'
import Page from '../components/Page'

const mapDispatchtoProps = {
  fetchRoles,
  createRole,
  deleteRole,
  updateRole,
  fetchMenus,
  updateRoleMenu,
  keepPermission,
  updateLimit,
  fetchProductsMap
}

const mapStateToProps = state => ({
  permission: state.permission,
  login: state.islogin,
  products: state.products
})

export default connect(mapStateToProps, mapDispatchtoProps)(Page)
