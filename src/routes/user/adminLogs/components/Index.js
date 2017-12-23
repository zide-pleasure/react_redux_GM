import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'


export default class RanksPage extends Component {

  state = {
    fields: {}
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    let obj = Object.assign(this.state.fields, fieldsValue)
    this.setState({
      fields: obj
    })
  }

  // Table 和 Filter 数据组装一起，提交Fetch 查询
  onTableChange = (pagination) => {
    let newFilter = {}
    newFilter.adminUserId = this.state.fields.adminUserId
    if (this.state.fields.permissionId) {
      newFilter.permissionId = this.state.fields.permissionId
    }
    newFilter.startTime = this.state.fields.startTime
    newFilter.endTime = this.state.fields.endTime
    newFilter.pageSize = pagination.pageSize
    newFilter.pageNum = pagination.current

    this.props.fetchAdminLog(newFilter)
  }

  onSearch = (fieldsValue) => {
    this.props.fetchAdminLog(fieldsValue)
  }

  componentWillMount() {
    this.props.fetchPermissionmap()
    this.props.fetchUsermap()
    // this.setState({
    //   initial: {
    //     ...this.state.initial,
    //     ...this.props.rank.keeping
    //   }
    // })
  }

  componentWillUnmount() {
    this.props.clearAdminLog()
  }

  render() {
    const {login: {curd}, adminLog} = this.props

    return (
      <Card style={{marginBottom: 6}}>
        <Filter
          curd={curd}
          adminLog={adminLog}
          onSearch={this.onSearch}
          onChange={this.onChange}
        />
        <List
          curd={curd}
          data={this.props.adminLog.logs}
          fetching={this.props.adminLog.fetching}
          onTableChange={this.onTableChange}
        />
      </Card>
    )
  }

}

RanksPage.propTypes = {
  adminLog: PropTypes.object,
  login: PropTypes.object,
  fetchAdminLog: PropTypes.func,
  clearAdminLog: PropTypes.func,
  fetchUsermap: PropTypes.func,
  fetchPermissionmap: PropTypes.func
  // keepInitial: PropTypes.func,
}
