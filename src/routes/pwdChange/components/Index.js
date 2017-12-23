import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Input, Button } from 'antd'

class Pwd extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        if (fieldsValue.pwd === fieldsValue.confirm) {
          this.props.changePwd({ newpass: fieldsValue.pwd })
        }
      }
    })
  }

  onVerify = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value !== getFieldValue('pwd')) {
      callback('两次输入不一致！请再次输入密码')
    }
    callback()
  }

  componentWillUnmount() {
    this.props.clearPwd()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const ColProps = {
      labelCol: {
        xs: 24,
        sm: 6
      },
      wrapperCol: {
        xs: 24,
        sm: 8
      },
      style: {
        marginBottom: 6
      }
    }

    return (
      <Card style={{marginBottom: 6}}>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          <Form.Item {...ColProps} label='请输入新密码'>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: '必填！不能使用汉字和空格', pattern: /^[^((\u4e00-\u9fa5)\s)]+$/ }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...ColProps} label='确认新密码'>
            {getFieldDecorator('confirm', {
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '两次输入不一致！请再次输入密码', validator: this.onVerify }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...ColProps}>
            <Button type='primary' className='margin-right' htmlType='submit'>修改</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

}

Pwd.propTypes = {
  changePwd: PropTypes.func,
  clearPwd: PropTypes.func,
  form: PropTypes.object
}

const PwdChange = Form.create()(Pwd)

export default PwdChange
