import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Row, Col, Button, Icon } from 'antd'
import _ from 'lodash'

import RoleModal from './Modal'
import Limit from './Limit'
import MenuModal from '../containers/MenuContainer'

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
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '限制产品',
        dataIndex: 'limitProduct',
        key: 'limitProduct'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 400,
        render: (text, record) => {
          const { options } = this.props
          return (
            <Row gutter={32}>
              {
                options.authorize.includes(10202) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改角色</Button>
                </Col>
              }
              {
                options.authorize.includes(10203) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'DEL'})}>删除角色</Button>
                </Col>
              }
              {
                options.authorize.includes(10204) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MENU'})}>分配权限</Button>
                </Col>
              }
              {
                options.authorize.includes(10206) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'LIMIT'})}>限制产品</Button>
                </Col>
              }
            </Row>
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const permission = nextProps.options.permission
    let dataSource = []
    permission.roles.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      data: {
        dataSource: [...dataSource],
        count: dataSource.length
      }
    })
  }

  handleClick = (option, action) => {
    switch (action.handle) {
      case 'MENU':
        this.onMenuAction(option)
        break
      case 'MOD':
        this.onModAction(option)
        break
      case 'DEL':
        this.onDelAction(option)
        break
      case 'LIMIT':
        this.onLimitAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onMenuAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'menu',
            modalTitle: '分配权限',
            visible: true,
            editing: val
          }
        })
      }
    })
  }

  onModAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'update',
            modalTitle: '修改角色',
            visible: true,
            editing: val
          }
        })
      }
    })
  }

  onDelAction = (data) => {
    this.setState({
      modal: {
        currentItem: data,
        modalType: 'delete',
        modalTitle: '删除提示',
        visible: true,
        editing: {}
      }
    })
  }

  onLimitAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'limit',
            modalTitle: '限制产品',
            visible: true,
            editing: {}
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      modal: {
        currentItem: {},
        modalType: '',
        modalTitle: '',
        visible: false,
        editing: {}
      }
    })
  }

  onOK = () => {
    const deleteItem = this.state.modal.currentItem
    const dataSource = [...this.state.data.dataSource]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.key === deleteItem.key }), 1)
    this.setState({
      data: {
        dataSource: [...dataSource],
        count: dataSource.length
      },
      modal: {
        currentItem: {},
        modalType: '',
        modalTitle: '',
        visible: false,
        editing: {}
      }
    })
    this.props.onDelete({
      path: {
        roleId: deleteItem.id
      }
    })
  }

  onModalLoad = () => {
    return this.state.modal
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
          rowKey='id'
          pagination={pagination}
          bordered
        />

        <Modal
          width={800}
          key={Math.random()}
          title={modalType === 'update' && this.state.modal.modalTitle}
          visible={modalType === 'update' && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <RoleModal
            options={this.props.options}
            initials={this.props.initials}
            onUpdate={this.props.onUpdate}
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
          title={modalType === 'menu' && this.state.modal.modalTitle}
          visible={modalType === 'menu' && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <MenuModal
            options={this.props.options}
            initials={this.props.initials}
            onUpdate={this.props.onUpdate}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
        <Modal
          width={800}
          key={Math.random()}
          title={modalType === 'limit' && this.state.modal.modalTitle}
          visible={modalType === 'limit' && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Limit
            products={this.props.products}
            initials={this.props.initials}
            onLimit={this.props.onLimit}
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
  products: PropTypes.object,
  initials: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onLimit: PropTypes.func,
  onRender: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
