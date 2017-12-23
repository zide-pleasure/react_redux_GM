import { connect } from 'react-redux'
import { fetchPermissions, keepPermission } from '../modules/Module'
import Index from '../components/Index'

const mapDispatchtoProps = {
  fetchPermissions,
  keepPermission
}

const mapStateToProps = (state) => ({
  permission: state.permission,
  login: state.islogin
})

export default connect(mapStateToProps, mapDispatchtoProps)(Index)
