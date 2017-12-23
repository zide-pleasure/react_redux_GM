import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default class List extends Component {
  state = {
    data: {
      dataSource: [],
      count: 0
    },
    modal: {
      editing: {},
      currentItem: {},
      modalType: '',
      modalTitle: '',
      visible: false
    }
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level'
      }, {
        title: '排序',
        dataIndex: 'order',
        key: 'order'
      }, {
        title: '父级',
        dataIndex: 'parent',
        key: 'parent'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: 'URI',
        dataIndex: 'uri',
        key: 'uri'
      }
    ]
  }

  expandedRowRender = (subList) => {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '等级',
        dataIndex: 'level',
        key: 'level'
      }, {
        title: '排序',
        dataIndex: 'order',
        key: 'order'
      }, {
        title: '父级',
        dataIndex: 'parent',
        key: 'parent'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: 'URI',
        dataIndex: 'uri',
        key: 'uri'
      }, {
        title: '关联权限',
        dataIndex: 'linkPermission',
        key: 'linkPermission'
      }
    ]

    const dataSource = [...subList]

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        pagination={false}
        showHeader={false}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    const permission = nextProps.options.permission
    let dataSource = []
    permission.permissions.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      data: {
        dataSource: [...dataSource],
        count: dataSource.length
      }
    })
  }

  render() {
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.data.count
    }
    return (
      <div>
        <Table
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          expandedRowRender={record => this.expandedRowRender(record.subPermission)}
          rowKey='id'
          pagination={pagination}
        />
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onRender: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
