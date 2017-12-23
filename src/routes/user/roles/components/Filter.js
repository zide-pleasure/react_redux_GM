import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'

import RoleModal from './Modal'

class RoleFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  handleCreate = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          // params: {
          //   name: values.name ? values.name : '',
          //   type: values.type ? values.type : ''
          // },
          handle: 'SEARCH'
        })
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    // const { form: { getFieldDecorator } } = this.props
    const { options } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10} style={{ marginBottom: 8 }}>
            {/* <Col className='gutter-row' span={4}>
              {getFieldDecorator('name', {
                rules: [{ type: 'string', required: false, message: '请输入角色名!' }]
              })(
                <Input
                  placeholder='请输入角色名'
                />
              )}
            </Col>
            <Col className='gutter-row' span={4}>
              {getFieldDecorator('type', {
                rules: [{ type: 'string', required: false, message: '请输入角色类型!' }]
              })(
                <Input
                  placeholder='请输入角色类型'
                />
              )}
            </Col> */}
            {
              options.authorize.includes(10205) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit' style={{ marginLeft: 16 }}>查询</Button>
              </Col>
            }
            {
              options.authorize.includes(10201) &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreate}>添加角色</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title='添加管理台角色'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <RoleModal
            options={this.props.options}
            initials={this.props.initials}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

RoleFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onCreate: PropTypes.func,
  onSearch: PropTypes.func
}

const Filter = Form.create()(RoleFilter)

export default Filter
