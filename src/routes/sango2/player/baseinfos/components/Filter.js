import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
import _ from 'lodash'
export class AdvancedSearchForm extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    initialFiler: PropTypes.object
  }

  onSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSearch(fieldsValue)
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, initialFiler, curd } = this.props
    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    const TwoColProps = {
      ...ColProps,
      xl: 96
    }

    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.onSearch}
        >
          {
            _.has(curd, '70201')
            ?
              <Row gutter={20}>
                <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
                  {getFieldDecorator('products', {
                    initialValue: initialFiler.value ? [this.props.initialFiler.value[0], this.props.initialFiler.value[1]] : [],
                    rules: [{ required: true, message: '必填!' }]
                  })(
                    <Cascader
                      showSearch
                      placeholder='请选择产品与服务器(必选)'
                      options={this.props.options}
                      expandTrigger='hover'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('nickname')(
                    <Input placeholder='玩家昵称' />
                  )}
                </Col>
                <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                  <Button type='primary' className='margin-right' htmlType='submit'>查询</Button>
                </Col>
              </Row>
            :
              ''
          }
        </Form>
      </div>
    )
  }
}

const Filter = Form.create({
  // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  // 把 props 转为对应的值，可用于把 Redux store 中的值读出 {...this.state.fields}
  mapPropsToFields(props) {
    return {
      nickname: {
        ...props.nickname
      },
      'products': {
        ...props.products
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(AdvancedSearchForm)

export default Filter
