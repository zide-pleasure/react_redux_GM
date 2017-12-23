import {connect} from 'react-redux'

import Home from './../components/HomeView.js'

const mapDispatchtoProps = {}

const mapStateToProps = (state) => ({login: state.islogin})

export default connect(mapStateToProps, mapDispatchtoProps)(Home)
