import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, TreeSelect } from 'antd'
const FormItem = Form.Item

class RoleModal extends Component {
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
        data.id = values.id
        data.paramList = (values.roleList.filter(opt => opt)).map(opt => Number(opt))

        let posts = {
          form: data,
          path: { userId: data.id },
          handle: this.state.modalType
        }

        if (this.state.modalType === 'role') {
          this.props.onUpdate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options } = this.props

    const detail = this.state.currentItem
    detail.roleList = detail.roleIdList.map(opt => {
      return `${opt}`
    })
    const check = this.state.modalType === 'role'

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
          label='账号'
        >
          {getFieldDecorator('name', {
            initialValue: detail.name || '',
            rules: [{ required: true, message: '请填写账号!' }]
          })(
            <Input placeholder='请填写账号' disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='角色'
          key='roleList'
        >
          {getFieldDecorator('roleList', {
            initialValue: detail.roleList || [],
            rules: [{ type: 'array', required: true, message: '请选择角色!' }]
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
                children: options.role.list
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll={false}
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              placeholder='请选择权限'
              searchPlaceholder='请选择角色'
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

RoleModal.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onUpdate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(RoleModal)

export default Modal
