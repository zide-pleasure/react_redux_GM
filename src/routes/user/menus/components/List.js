import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Row, Col, Button, Icon } from 'antd'
import _ from 'lodash'

import MenuModal from './Modal'
import UriModal from './Uri'

export default class List extends Component {
  state = {
    data: {
      dataSource: [],
      count: 0,
      subSource: [],
      sonSource: []
    },
    modal: {
      currentItem: {},
      modalType: '',
      modalTitle: '',
      visible: false
    }
  }

  constructor(props) {
    super(props)
    this.columns = [
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '排序', dataIndex: 'order', key: 'order' },
      { title: '父级', dataIndex: 'parent', key: 'parent' },
      { title: '路由', dataIndex: 'route', key: 'route' },
      { title: '权限', dataIndex: 'permissionId', key: 'permissionId' },
      { title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 300,
        render: (text, record) => {
          const { options } = this.props
          return (
            <Row gutter={32}>
              {
                options.authorize.includes(10302) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改菜单</Button>
                </Col>
              }
              {
                options.authorize.includes(10303) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'URI'})}>关联权限</Button>
                </Col>
              }
              {
                options.authorize.includes(10304) &&
                <Col span={8}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'SUB'})}>添加子菜单</Button>
                </Col>
              }
            </Row>
          )
        }
      }
    ]
  }

  expandedRowRender = (subMenus) => {
    const { options } = this.props

    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '排序', dataIndex: 'order', key: 'order' },
      { title: '父级', dataIndex: 'parent', key: 'parent' },
      { title: '路由', dataIndex: 'route', key: 'route' },
      { title: '权限', dataIndex: 'permissionId', key: 'permissionId' },
      { title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 300,
        render: (text, record) => {
          return (
            <Row gutter={32}>
              {
                options.authorize.includes(10302) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改菜单</Button>
                </Col>
              }
              {
                options.authorize.includes(10303) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'URI'})}>关联权限</Button>
                </Col>
              }
              {
                options.authorize.includes(10304) &&
                <Col span={8}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'SUB'})}>添加子菜单</Button>
                </Col>
              }
            </Row>
          )
        }
      }
    ]

    const dataSource = [...subMenus]

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={record => this.expandedRowRenderNext(record.subMenus)}
        rowKey='id'
        pagination={false}
        showHeader={false}
        onExpand={this.onExpand}
      />
    )
  }

  expandedRowRenderNext = (subMenus) => {
    const { options } = this.props

    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '排序', dataIndex: 'order', key: 'order' },
      { title: '父级', dataIndex: 'parent', key: 'parent' },
      { title: '路由', dataIndex: 'route', key: 'route' },
      { title: '权限', dataIndex: 'permissionId', key: 'permissionId' },
      { title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 300,
        render: (text, record) => {
          return (
            <Row gutter={32}>
              {
                options.authorize.includes(10302) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改菜单</Button>
                </Col>
              }
              {
                options.authorize.includes(10303) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'URI'})}>关联权限</Button>
                </Col>
              }
            </Row>
          )
        }
      }
    ]

    const dataSource = [...subMenus]

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

    dataSource = permission.menus.map((elem, index) => {
      let subMenus = []
      subMenus = elem.subMenus.map((ele, idx) => {
        let subMenus = []
        subMenus = ele.subMenus.map((e, i) => {
          return {key: i, ...e}
        })
        return {key: idx, ...ele, subMenus}
      })
      return {key: index, ...elem, subMenus}
    })
    this.setState({
      data: {
        ...this.state.data,
        dataSource: [...dataSource],
        count: dataSource.length
      }
    })
  }

  handleClick = (option, action) => {
    switch (action.handle) {
      case 'URI':
        this.onUriAction(option)
        break
      case 'MOD':
        this.onModAction(option)
        break
      case 'SUB':
        this.onSubAction(option)
        break
      case 'DEL':
        this.onDelAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onUriAction = (data) => {
    const dataSource = [...this.state.data.dataSource]
    const subSource = [...this.state.data.subSource]
    const sonSource = [...this.state.data.sonSource]
    if (
      (data.level === 1 && dataSource[data.key].id === data.id) ||
      (data.level === 2 && subSource[data.key].id === data.id) ||
      (data.level === 3 && sonSource[data.key].id === data.id)
    ) {
      this.setState({
        modal: {
          currentItem: data,
          modalType: 'uri',
          modalTitle: '关联权限',
          visible: true
        }
      })
    }
  }

  onModAction = (data) => {
    const dataSource = [...this.state.data.dataSource]
    const subSource = [...this.state.data.subSource]
    const sonSource = [...this.state.data.sonSource]
    if (
      (data.level === 1 && dataSource[data.key].id === data.id) ||
      (data.level === 2 && subSource[data.key].id === data.id) ||
      (data.level === 3 && sonSource[data.key].id === data.id)
    ) {
      this.setState({
        modal: {
          currentItem: data,
          modalType: 'update',
          modalTitle: '修改菜单',
          visible: true
        }
      })
    }
  }

  onSubAction = (data) => {
    const dataSource = [...this.state.data.dataSource]
    const subSource = [...this.state.data.subSource]
    const sonSource = [...this.state.data.sonSource]
    if (
      (data.level === 1 && dataSource[data.key].id === data.id) ||
      (data.level === 2 && subSource[data.key].id === data.id) ||
      (data.level === 3 && sonSource[data.key].id === data.id)
    ) {
      this.setState({
        modal: {
          currentItem: data,
          modalType: 'child',
          modalTitle: '添加子菜单',
          visible: true
        }
      })
    }
  }

  onDelAction = (data) => {
    this.setState({
      modal: {
        currentItem: data,
        modalType: 'delete',
        modalTitle: '删除提示',
        visible: true
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      modal: {
        currentItem: {},
        modalType: '',
        modalTitle: '',
        visible: false
      }
    })
  }

  onOK = () => {
    const deleteItem = this.state.modal.currentItem
    const dataSource = [...this.state.data.dataSource]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.id === deleteItem.id }), 1)
    this.setState({
      data: {
        ...this.state.data,
        dataSource: [...dataSource],
        count: dataSource.length
      },
      modal: {
        currentItem: {},
        modalType: '',
        modalTitle: '',
        visible: false
      }
    })
    this.props.onDelete({
      path: {
        menuId: deleteItem.id
      }
    })
  }

  onModalLoad = () => {
    return this.state.modal
  }

  onExpand = (expanded, record) => {
    if (expanded) {
      this.setState({
        data: {
          ...this.state.data,
          subSource: record.level === 1 ? [...record.subMenus] : [...this.state.data.subSource],
          sonSource: record.level === 2 ? [...record.subMenus] : [...this.state.data.sonSource]
        }
      })
    } else {
      this.setState({
        data: {
          ...this.state.data,
          subSource: record.level === 1 ? [] : [...this.state.data.subSource],
          sonSource: record.level === 2 ? [] : [...this.state.data.sonSource]
        }
      })
    }
  }

  render() {
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.data.count
    }
    const modalType = this.state.modal.modalType
    return (
      <div>
        <Table
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          expandedRowRender={record => this.expandedRowRender(record.subMenus)}
          rowKey='id'
          pagination={pagination}
          onExpand={this.onExpand}
        />

        <Modal
          width={800}
          key={Math.random()}
          title={['update', 'child'].includes(modalType) && this.state.modal.modalTitle}
          visible={['update', 'child'].includes(modalType) && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <MenuModal
            options={this.props.options}
            initials={this.props.initials}
            onUpdate={this.props.onUpdate}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>

        <Modal
          title={modalType === 'delete' && this.state.modal.modalTitle}
          visible={modalType === 'delete' && this.state.modal.visible}
          onOk={this.onOK}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <p><Icon type='question-circle-o' style={{ fontSize: 24, color: '#f00' }} /> 确定删除此条记录吗? ...</p>
        </Modal>

        <Modal
          width={800}
          key={Math.random()}
          title={modalType === 'uri' && this.state.modal.modalTitle}
          visible={modalType === 'uri' && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <UriModal
            options={this.props.options}
            initials={this.props.initials}
            onUpdate={this.props.onUpdate}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object,
  onUpdate: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onRender: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
