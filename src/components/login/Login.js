import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Button} from 'antd'
const FormItem = Form.Item

class HorizontalLoginForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form layout='vertical' onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '输入用户名!'
              }
            ]
          })(
            <Input prefix={<Icon type='user' style={{fontSize: 13}} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '输入密码!'
              }
            ]
          })(
            <Input prefix={<Icon type='lock' style={{fontSize: 13}} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'>
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm)
export default WrappedHorizontalLoginForm
