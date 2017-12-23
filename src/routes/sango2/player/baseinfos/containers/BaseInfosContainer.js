import { connect } from 'react-redux'
import { baseInfosSearchActionCreator, baseInfosItemActionCreator, receiveBaseInfos, keepBaseInfos } from './../modules/BaseInfosModules'
import { fetchProductsMap } from '../../../../../modules/products'
import BaseInfosPage from './../components/BaseInfosPage'

const mapDispatchtoProps = {
  baseInfosSearchActionCreator,
  baseInfosItemActionCreator,
  receiveBaseInfos,
  fetchProductsMap,
  keepBaseInfos
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  baseinfo: state.baseinfos
})

export default connect(mapStateToProps, mapDispatchtoProps)(BaseInfosPage)
