import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class UserModal extends Component {
  state = {
    currentItem: {},
    modalType: '',
    select: true
  }

  componentWillMount() {
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        if (values.id) data.id = values.id
        if (values.name) data.name = values.name
        if (values.password) data.password = values.password
        if (values.realName) data.realName = values.realName
        if (values.phone) data.phone = values.phone
        if (values.email) data.email = values.email

        let posts = {
          form: data,
          path: { userId: data.id || '' },
          handle: this.state.modalType
        }

        if (['update', 'pass'].includes(this.state.modalType)) {
          this.props.onUpdate(posts)
        } else {
          this.props.onCreate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const detail = this.state.currentItem
    const modalType = this.state.modalType
    const check = ['update', 'pass'].includes(modalType)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          check &&
          <FormItem
            {...formItemLayout}
            label='ID'
          >
            {getFieldDecorator('id', {
              initialValue: detail.id || '',
              rules: [{ required: true, message: '请填写 ID!' }]
            })(
              <Input placeholder='请填写 ID' disabled={check} />
            )}
          </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label='账号'
        >
          {getFieldDecorator('name', {
            initialValue: detail.name || '',
            rules: [{ required: true, message: '请填写账号!' }]
          })(
            <Input placeholder='请填写账号' disabled={check} />
          )}
        </FormItem>
        {
          modalType !== 'update' &&
          <FormItem
            {...formItemLayout}
            label='密码'
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请填写密码' }]
            })(
              <Input type='password' placeholder='请填写密码' />
            )}
          </FormItem>
        }
        {
          modalType !== 'pass' &&
          <FormItem
            {...formItemLayout}
            label='真实名'
          >
            {getFieldDecorator('realName', {
              initialValue: detail.realName || '',
              rules: [{ required: false, message: '请填写真实名' }]
            })(
              <Input placeholder='请填写真实名' />
            )}
          </FormItem>
        }
        {
          modalType !== 'pass' &&
          <FormItem
            {...formItemLayout}
            label='电话'
          >
            {getFieldDecorator('phone', {
              initialValue: detail.phone || '',
              rules: [{ required: false, message: '请填写电话' }]
            })(
              <Input placeholder='请填写电话' />
            )}
          </FormItem>
        }
        {
          modalType !== 'pass' &&
          <FormItem
            {...formItemLayout}
            label='邮件'
          >
            {getFieldDecorator('email', {
              initialValue: detail.email || '',
              rules: [{ required: false, message: '请填写邮件' }]
            })(
              <Input placeholder='请填写邮件' />
            )}
          </FormItem>
        }
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

UserModal.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(UserModal)

export default Modal
