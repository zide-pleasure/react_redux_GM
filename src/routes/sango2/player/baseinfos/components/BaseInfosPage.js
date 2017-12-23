import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class BaseInfosPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    baseinfo: PropTypes.object.isRequired,
    baseInfosSearchActionCreator: PropTypes.func.isRequired,
    baseInfosItemActionCreator: PropTypes.func.isRequired,
    receiveBaseInfos: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepBaseInfos: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      'products': this.props.baseinfo.keeping
    }
  }

  products = {
    value: []
  }

  // 双向数据绑定
  handleChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  // 搜索提交
  handleSearch = (data) => {
    // console.log('Search values of form: ', data)
    this.products.value = [
      data.products[0],
      data.products[1]
    ]
    this.props.baseInfosSearchActionCreator(data)
  }

  render() {
    const { login: {curd}, products: {options}, baseinfo: {keeping, list} } = this.props

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            curd={curd}
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
          <List
            curd={curd}
            data={list}
            products={this.products}
            handleUpdate={this.props.receiveBaseInfos}
            hanleInfo={this.props.baseInfosItemActionCreator}
          />
        </Card>
      </div>
    )
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.keepBaseInfos(this.state.fields.products)
  }
}
