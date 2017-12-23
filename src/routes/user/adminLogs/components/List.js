import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import AdminLogModal from './Modal'


export default class List extends Component {

  state = {
    visible: false,
    record: {},
    dataSource: [],
    pagination: {
      current: 1,
      pageSize: 50,
      total: 0
    }
  }

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
            moment(text).format('YYYY-MM-DD HH:mm:ss')
          )
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <Button onClick={() => this.handleVisible(record)}>
              查看详情
            </Button>
          )
        }
      }]
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.data)
    const { domainObject = [], pagination = {} } = nextProps.data
    let dataSource = []
    domainObject.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })

    this.setState({
      dataSource: [...dataSource],
      pagination: {
        current: pagination.pageNum,
        pageSize: pagination.pageSize,
        total: pagination.total
      }
    })
  }

  handleTableChange = (pagination) => {
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total
      }
    })
    this.props.onTableChange(pagination)
  }

  handleVisible = (e) => {
    this.setState({
      visible: true,
      record: e
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {

    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500'],
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            total: this.state.pagination.total
          }}
          loading={this.props.fetching}
          onChange={this.handleTableChange}
        />
        <Modal
          width={1000}
          maskClosable={false}
          title='详情'
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <AdminLogModal
            handleCancel={this.handleCancel}
            data={this.state.record}
          />
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  data: PropTypes.object,
  fetching: PropTypes.bool,
  onTableChange: PropTypes.func
}
