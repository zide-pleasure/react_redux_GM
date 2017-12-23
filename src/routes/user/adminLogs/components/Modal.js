import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default class Modal extends Component {

  constructor(props) {
    super(props)

    this.columns = [{
        title: '管理员',
        dataIndex: 'userName',
        key: 'userName'
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
      }, {
        title: '操作是否成功',
        dataIndex: 'code',
        key: 'code',
        render: (text) => {
          return (
            text === 1 ? '成功' : '失败'
          )
        }
      }, {
        title: '操作时间',
        dataIndex: 'createDate',
        key: 'createDate',
        render: (text) => {
          return (
            moment(text).format('YYYY-MM-DD hh:mm:ss')
          )
        }
      }, {
        title: '管理员ID',
        dataIndex: 'adminUserId',
        key: 'adminUserId'
      }, {
        title: '权限ID',
        dataIndex: 'permissionId',
        key: 'permissionId'
      }, {
        title: '结果',
        dataIndex: 'result',
        key: 'result'
      }, {
        title: '请求参数',
        dataIndex: 'params',
        key: 'params',
        width: 250
      }, {
        title: 'uri',
        dataIndex: 'uri',
        key: 'uri'
      }]
  }

  render() {
    const dataSource = [this.props.data]
    return (
      <div>
        <Table
          bordered
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
        />
        <Button type='primary' onClick={this.props.handleCancel} style={{marginTop: '30px', marginBottom: '10px'}}>返回</Button>
      </div>
    )
  }
}

Modal.propTypes = {
  data: PropTypes.object,
  handleCancel: PropTypes.func
}
