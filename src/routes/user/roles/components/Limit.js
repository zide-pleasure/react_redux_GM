import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, TreeSelect } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item

class LimitModal extends Component {

  static propTypes = {
    form: PropTypes.object,
    products: PropTypes.object,
    onLimit: PropTypes.func,
    onModalLoad: PropTypes.func,
    onSubmitting: PropTypes.func
  }

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
        let val = {
          handle: this.state.modalType,
          roleId: this.state.currentItem.id,
          productObj: {paramList: (values.productObj ? values.productObj : [])}
        }
        this.props.onLimit(val)
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, products } = this.props

    let pros = []
    _.map(products.options, (v, i) => {
      pros.push({
        value: v.value,
        label: v.label
      })
    })

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
          label='产品(多选)'
        >
          {getFieldDecorator('productObj', {
            rules: [{ required: false, message: '请选择产品' }]
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
                children: [...pros]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              searchPlaceholder='请选择产品'
              dropdownStyle={{height: 300}}
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

const Limit = Form.create()(LimitModal)

export default Limit
