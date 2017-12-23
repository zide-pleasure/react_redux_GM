import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, Cascader, DatePicker } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const { RangePicker } = DatePicker

export class RanksFilter extends Component {

  state = {
    fields: {
      usermap: {},
      permissionmap: {},
      times: {}
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let values = {}
        if (fieldsValue.usermap && fieldsValue.usermap.length > 0) {
          values.adminUserId = fieldsValue.usermap[0]
        }
        if (fieldsValue.permissionmap && fieldsValue.permissionmap.length > 0) {
          values.permissionId = fieldsValue.permissionmap[1]
        }
        values.startTime = fieldsValue.times[0].format('YYYY-MM-DD HH:mm:ss')
        values.endTime = fieldsValue.times[1].format('YYYY-MM-DD HH:mm:ss')
        values.pageNum = 1
        values.pageSize = 50

        this.props.onSearch(values)
        this.props.onChange(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { curd, adminLog } = this.props

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

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择起止日期' }],
      initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
      // initialValue: [moment('00:00:00', 'HH:mm:ss').subtract({days: 1}), moment('00:00:00', 'HH:mm:ss')]
    }

    let usermapOpt = []
    _.map(adminLog.usermap, (val, idx) => {
      usermapOpt.push({
        value: idx,
        label: `${val}(${idx})`
      })
    })

    let permissionmapOpt = []
    _.map(adminLog.permissionmap, (val, idx) => {
      let menu = {}
      menu = {
        value: val.id,
        label: val.name,
        children: []
      }
      _.map(val.subPermission, (v, k) => {
        menu.children.push({
          value: v.id,
          label: v.name
        })
      })
      permissionmapOpt.push(menu)
    })

    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          {
            _.has(curd, '110101')
            ?
              <Row gutter={20}>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('usermap', {
                    rules: [{ required: false, message: '请选择管理员列表' }]
                  })(
                    <Cascader
                      showSearch
                      options={usermapOpt}
                      placeholder='请选择管理员列表'
                      expandTrigger='hover'
                      popupClassName='cascaderMenu'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('permissionmap', {
                    rules: [{ required: false, message: '请选择权限' }]
                  })(
                    <Cascader
                      options={permissionmapOpt}
                      placeholder='请选择权限'
                      showSearch
                      expandTrigger='hover'
                      popupClassName='cascaderMenu'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('times', rangeConfig)(
                    <RangePicker
                      showTime
                      format='YYYY-MM-DD HH:mm:ss'
                    />
                  )}
                </Col>
                <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='primary' className='margin-right' htmlType='submit'>查询</Button>
                  </div>
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

RanksFilter.propTypes = {
  curd: PropTypes.object.isRequired,
  adminLog: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onChange: PropTypes.func
}

const Filter = Form.create()(RanksFilter)

export default Filter
