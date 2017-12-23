import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Row, Col, Button, Icon } from 'antd'
import _ from 'lodash'

import UserModal from './Modal'
import RoleModal from './Role'

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
        title: '账号',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName'
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      }, {
        title: '邮件',
        dataIndex: 'email',
        key: 'email'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 400,
        render: (text, record) => {
          const { options } = this.props
          return (
            <Row gutter={48}>
              {
                options.authorize.includes(10102) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改信息</Button>
                </Col>
              }
              {
                options.authorize.includes(10104) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'PASS'})}>修改密码</Button>
                </Col>
              }
              {
                options.authorize.includes(10103) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'DEL'})}>删除帐号</Button>
                </Col>
              }
              {
                options.authorize.includes(10105) &&
                <Col span={5}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'ROLE'})}>分配角色</Button>
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
    permission.users.map(function(elem, index) {
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
      case 'ROLE':
        this.onRoleAction(option)
        break
      case 'MOD':
        this.onModAction(option)
        break
      case 'PASS':
        this.onPassAction(option)
        break
      case 'DEL':
        this.onDelAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onRoleAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'role',
            modalTitle: '分配角色',
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
            modalTitle: '修改管理台用户',
            visible: true,
            editing: val
          }
        })
      }
    })
  }

  onPassAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'pass',
            modalTitle: '修改管用户密码',
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
        userId: deleteItem.id
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
          title={['update', 'pass'].includes(modalType) && this.state.modal.modalTitle}
          visible={['update', 'pass'].includes(modalType) && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <UserModal
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
          title={modalType === 'role' && this.state.modal.modalTitle}
          visible={modalType === 'role' && this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <RoleModal
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
  onDelete: PropTypes.func,
  onRender: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
