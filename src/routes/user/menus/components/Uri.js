import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, TreeSelect } from 'antd'
const FormItem = Form.Item

class UriModal extends Component {
  state = {
    currentItem: {},
    modalType: ''
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
        data.menuId = values.id
        data.permissionId = Number(values.permission)

        let posts = {
          form: data,
          handle: this.state.modalType
        }

        if (this.state.modalType === 'uri') {
          this.props.onUpdate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options } = this.props

    const detail = this.state.currentItem
    const check = this.state.modalType === 'uri'

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
          label='ID'
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
          label='权限'
        >
          {getFieldDecorator('permission', {
            initialValue: detail.permissionId && `${detail.permissionId}` || '',
            rules: [{ required: false, message: '请选择权限!' }]
          })(
            <TreeSelect
              treeData={options.uri.list}
              showSearch
              treeNodeFilterProp='label'
              placeholder='请选择权限'
              allowClear
              searchPlaceholder='请搜索权限'
              className='hoolai-gm-user-tree-select'
              dropdownStyle={{
                height: '20rem',
                overflowY: 'auto'
              }}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

UriModal.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onUpdate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(UriModal)

export default Modal
