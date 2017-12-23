import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button } from 'antd'

class PermissionFilter extends Component {
  state = {
    select: true
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({handle: 'SEARCH'})
      }
    })
  }

  render() {
    const { options } = this.props

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(10401) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            }
          </Row>
        </Form>
      </div>
    )
  }
}

PermissionFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onSearch: PropTypes.func
}

PermissionFilter.contextTypes = {
  router: PropTypes.object
}

const Filter = Form.create()(PermissionFilter)

export default Filter
