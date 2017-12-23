import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, IndexLink, Link } from 'react-router'
import _ from 'lodash'

import './CoreLayout.scss'
import '../../styles/core.scss'
import logoImage from '../../static/hoolai.png'
import myImage from '../../static/admin.png'

import WrappedHorizontalLoginForm from '../../components/Login/Login'

import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Modal,
  Row,
  Col,
  Breadcrumb,
  BackTop,
  message
} from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

// React.Component 另一种写法
export class CoreLayout extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    isLoginActionCreator: PropTypes.func.isRequired,
    fetchPurview: PropTypes.func.isRequired,
    onceLogin: PropTypes.func.isRequired,
    receiveLogin: PropTypes.func.isRequired,
    singOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      rander: true
    }
    // this.handleSingOut = this.handleSingOut.bind(this)
  }

  menu = (
    <Menu onClick={key => this.handleSingOut(key)}>
      <Menu.Item key='3'>退出</Menu.Item>
      <Menu.Item key='0'>修改密码</Menu.Item>
    </Menu>
  )

  static myData = {}

  handleSingOut = ({ key }) => {
    if (key === '3') {
      browserHistory.push('/')
      this.props.singOut()
      this.showModal()
    }
    if (key === '0') {
      browserHistory.push('/pwdChange')
    }
  }

  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1
    if (last) {
      return <span>{route.breadcrumbName}</span>
    } else {
      return paths.join('/') == '' ? (
        <IndexLink to='/'>主页</IndexLink>
      ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      )
    }
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleSubmit = data => {
    this.props.isLoginActionCreator(data)
  }

  componentDidMount() {
    const { fetchPurview, receiveLogin } = this.props
    const sango2 = sessionStorage.getItem('sango2')
    // 如果sessionStorage有值，就直接登录
    if (sango2 !== null && sango2 !== '') {
      receiveLogin(JSON.parse(sango2))
      fetchPurview(JSON.parse(sango2))
    } else {
      this.showModal()
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { onceLogin } = this.props

    if (nextProps.login.resolved && nextProps.login.once) {
      message.success('登录成功')
      onceLogin()
      this.handleCancel()
    } else if (nextProps.login.err) {
      message.error(nextProps.login.errMes)
    } else if (!nextProps.login.resolved) {
      this.showModal()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.login.once) {
      return true
    }

    if (nextProps.login.errMes.tips) {
      return false
    }

    if (nextProps.login.fetching) {
      // message.info('shouldComponentUpdate 不rander', 10)
      return false
    } else {
      // message.info('shouldComponentUpdate 就rander', 10)
      return true
    }
  }

  render() {
    // 此时的routes 不是传进来的了 注意是router index.js里分配来的
    const props = this.props
    let myMenus = []
    const { admin, purview } = this.props.login
    if (_.size(admin) > 0) {
      _.forEach(purview, function(value, key) {
        let subMenus = []
        // console.log(value)
        _.map(value.subMenu, function(v, i) {
          // console.log(v)
          subMenus.push(
            <Menu.Item key={v.id}>
              {' '}
              <Link to={{ pathname: v.route, state: { authorize: v.id } }}>
                {v.name}
              </Link>{' '}
            </Menu.Item>
          )
        })
        myMenus.push(
          <SubMenu title={value.name} children={subMenus} key={value.id} />
        )
      })
    }

    return (
      <div className='components-layout-demo-top-side-2'>
        <Modal
          width={300}
          key={Math.random()}
          title='登录'
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          closable={false}
          maskClosable={false}
        >
          <WrappedHorizontalLoginForm handleSubmit={this.handleSubmit} />
        </Modal>
        <Layout>
          <Row>
            <Header className='header'>
              <Col className='gutter-row' span={5}>
                <div className='logo'>
                  <IndexLink to='/' activeClassName='route--active'>
                    <img className='logo-img' src={logoImage} />
                  </IndexLink>
                </div>
              </Col>
              <Col className='gutter-row' span={16}>
                <Menu
                  theme='dark'
                  mode='horizontal'
                  defaultSelectedKeys={['2']}
                  style={{
                    lineHeight: '64px'
                  }}
                >
                  <Menu.Item key='home'>
                    <IndexLink to='/' activeClassName='route--active'>
                      <Icon type='home' />主页
                    </IndexLink>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col className='gutter-row' span={1}>
                <Dropdown overlay={this.menu}>
                  <img alt='' className='my-image' src={myImage} />
                </Dropdown>
              </Col>
              <Col className='gutter-row' span={2}>
                <span style={{ color: 'white' }}>
                  {_.size(admin) === 0 ? '未登录' : admin.userName}
                </span>
              </Col>
            </Header>
          </Row>

          <Layout>
            <Sider
              width={200}
              style={{
                background: '#fff'
              }}
            >
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%'
                }}
              >
                {myMenus}
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: '64px 24px 24px',
                minHeight: '100vh',
                marginTop: '-64px'
              }}
            >
              <Breadcrumb
                itemRender={this.itemRender}
                style={{
                  margin: '12px 0'
                }}
                routes={props.routes}
                params={props.params}
                separator='/'
              />
              <Content
                style={{
                  // background: '#fff',
                  // padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>

        <BackTop />
      </div>
    )
  }
}
