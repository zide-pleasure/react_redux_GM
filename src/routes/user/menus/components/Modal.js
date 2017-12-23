import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class MenuModal extends Component {
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
        let modalType = this.state.modalType
        let data = {}
        if (values.id) data.id = Number(values.id)
        data.name = values.name
        data.parent = Number(values.parent)
        data.route = values.route

        let posts = {
          form: data,
          path: values.id ? { menuId: data.id } : { parentId: data.parent },
          handle: this.state.modalType
        }

        if (modalType === 'update') {
          this.props.onUpdate(posts)
        } else if (['create', 'child'].includes(modalType)) {
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
    const check = ['update', 'child'].includes(modalType)
    const update = this.state.modalType === 'update'
    const parent = update && detail.parent >= 0 && `${detail.parent}` || detail.id && `${detail.id}` || ''

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
          update &&
          <FormItem
            {...formItemLayout}
            label='id'
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
          label='名称'
        >
          {getFieldDecorator('name', {
            initialValue: update && detail.name || '',
            rules: [{ required: true, message: '请填写名称!' }]
          })(
            <Input placeholder='请填写名称' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='父级'
        >
          {getFieldDecorator('parent', {
            initialValue: parent,
            rules: [{ required: true, message: '请填写父级' }]
          })(
            <Input placeholder='请填写父级' disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='路由'
        >
          {getFieldDecorator('route', {
            initialValue: update && detail.route || '',
            rules: [{ required: false, message: '请填写路由' }]
          })(
            <Input placeholder='请填写路由' />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

MenuModal.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(MenuModal)

export default Modal
