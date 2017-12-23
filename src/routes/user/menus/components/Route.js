import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class RouteModal extends Component {
  state = {
    currentItem: {},
    modalType: ''
  }

  componentWillMount() {
    this.props.onRender({ renderState: false })
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        data.id = values.id
        data.route = values.route

        let posts = {
          form: { route: data.route },
          path: { permissionId: data.id },
          handle: this.state.modalType
        }

        if (this.state.modalType === 'route') {
          this.props.onUpdate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props

    const detail = this.state.currentItem
    const check = this.state.modalType === 'route'

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
        <FormItem
          {...formItemLayout}
          label='名称'
        >
          {getFieldDecorator('name', {
            initialValue: detail.name || '',
            rules: [{ required: true, message: '请填写名称!' }]
          })(
            <Input placeholder='请填写名称' disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='路由'
          key='route'
        >
          {getFieldDecorator('route', {
            initialValue: detail.route || '',
            rules: [{ required: true, message: '请填写路由!' }]
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

RouteModal.propTypes = {
  form: PropTypes.object,
  onUpdate: PropTypes.func,
  onRender: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(RouteModal)

export default Modal
