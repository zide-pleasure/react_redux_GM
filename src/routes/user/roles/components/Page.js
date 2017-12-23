import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'

export default class Page extends Component {
  state = {
    fields: {
      name: '',
      type: ''
    },
    initials: {
      params: {
        name: '',
        type: ''
      },
      conf: {
        renderState: true,
        locale: false
      },
      map: {},
      enum: {}
    }
  }

  _menuReduce = (options) => {
    let first = []
    _.reduce(options, (result, option, index) => {
      let second = []
      _.reduce(option.subMenus, (res, opt, inx) => {
        let third = []
        _.reduce(opt.subMenus, (r, o, i) => {
          r.push({label: `${o.name} (${o.id})`, value: `${o.id}`, key: `${o.id}`})
          return r
        }, third)
        res.push({label: `${opt.name} (${opt.id})`, value: `${opt.id}`, key: `${opt.id}`, children: third})
        return res
      }, second)
      result.push({label: `${option.name} (${option.id})`, value: `${option.id}`, key: `${option.id}`, children: second})
      return result
    }, first)
    return first
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.conf.renderState
  }

  onRender = (nextInitials) => {
    this.state.initials.conf.renderState = nextInitials.renderState
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onCreate = (values) => {
    this.props.createRole(values)
  }

  onUpdate = (values) => {
    if (values.handle === 'update') {
      this.props.updateRole(values)
    } else if (values.handle === 'menu') {
      this.props.updateRoleMenu(values)
    }
  }

  onDelete = (values) => {
    this.props.deleteRole(values)
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.props.fetchRoles(values)
      this.props.fetchMenus()
    }
  }

  onLimit = (values) => {
    if (values.handle === 'limit') {
      this.props.updateLimit(values)
    }
  }

  render() {
    const { permission, login, products } = this.props
    const options = {
      permission,
      login,
      authorize: login.authorize,
      menu: {
        list: this._menuReduce(permission.menus)
      }
    }
    const initials = this.state.initials

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          options={options}
          initials={initials}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
          onCreate={this.onCreate}
        />
        <List
          options={options}
          initials={initials}
          products={products}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
          onLimit={this.onLimit}
          onRender={this.onRender}
        />
      </Card>
    )
  }
}

Page.propTypes = {
  permission: PropTypes.object,
  login: PropTypes.object,
  fetchRoles: PropTypes.func,
  createRole: PropTypes.func,
  deleteRole: PropTypes.func,
  updateRole: PropTypes.func,
  fetchMenus: PropTypes.func,
  updateRoleMenu: PropTypes.func,
  updateLimit: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  products: PropTypes.object
}
