import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import _ from 'lodash'

import {genderMapKeys, jobMapKeys} from '../modules/Mapping'
import DropOption from './../../../../../components/DropOption/DropOption'

export default class List extends Component {
  static propTypes = {
    curd: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    products: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    hanleInfo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.columns = [
      {title: '玩家 ID', dataIndex: 'playerId', key: 'playerId'},
      {title: '玩家昵称', dataIndex: 'nickname', key: 'nickname'},
      {title: '等级', dataIndex: 'level', key: 'level'},
      {title: '性别', dataIndex: 'gender', key: 'gender'},
      {title: '职业', dataIndex: 'job', key: 'job'},
      {title: 'VIP等级', dataIndex: 'vipLevel', key: 'vipLevel'},
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record, index) => {
          const {curd} = this.props
          let menuOptions = []
          _.forEach(curd, (value, key, collection) => {
            switch (key) {
              case '70202':
                menuOptions.push({key: '1', name: '查看背包道具'})
                break
              case '70203':
                menuOptions.push({key: '2', name: '导出背包道具'})
                break
              default:
            }
          })
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={menuOptions}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }
    ]

    this.state = {
      dataSource: []
    }

    // 保留stroe的原始信息
    this.list = []
  }

  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      this.props.hanleInfo(
        this.props.products.value,
        record.playerId,
        this.list,
        true
      )
    }

    if (e.key === '2') {
      this.props.hanleInfo(
        this.props.products.value,
        record.playerId,
        record,
        false
      )
    }
  };

  getAsyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve({
            code: 200,
            msg: 'success',
            data: 'hello!'
          })
        },
        1000
      )
    })
  }

  render() {
    return (
      <div>
        <Table
          className='myTable'
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }

  // 初始化
  componentWillMount() {
    // console.log('componentWillMount--')
  }
  async componentDidMount() {
    // console.log('componentDidMount--')
    let data = await this.getAsyncData()
    console.log(data)
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
    const data = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        playerId: value.playerId,
        nickname: value.nickname,
        level: value.level,
        gender: genderMapKeys[value.gender],
        job: jobMapKeys[value.job],
        vipLevel: value.vipLevel
      }
    })
    this.setState({
      dataSource: data
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    this.list = nextProps.data // or this.props.data
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
  }

  // 销毁
  componentWillUnmount() {
    console.log('componentWillUnmount')
    this.props.handleUpdate([])
  }
}
