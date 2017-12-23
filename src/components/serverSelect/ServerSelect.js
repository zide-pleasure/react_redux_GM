import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Select} from 'antd'
const Option = Select.Option
import _ from 'lodash'

export class ServerSelect extends Component {

  static propTypes = {
    datas: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired
  }

  state = {
    product: '',
    server: '',
    obj: '请选择'
  }
  data = {}
  productChange = (key) => {
    let {handleSelect} = this.props
    let {serverData} = this.props.datas
    this.data.serverData = _.map(serverData[key], (value, index) => <Option key={index}>{value}</Option>)
    handleSelect({
      product: key,
      server: ''
    })
    this.setState({
      product: key,
      server: '',
      obj: '请选择'
    })
  }
  handleServerChange = (key) => {
    let {handleSelect} = this.props
    let {serverData} = this.props.datas
    handleSelect({
      product: this.state.product,
      server: key
    })
    this.setState({
      server: key,
      obj: serverData[this.state.product][key]
    })
  }
  componentWillMount() {
    if (this.props.datas.resolved) {
      let {productData} = this.props.datas
      this.data = {
        productData: _.map(productData, (value, index) => <Option key={index}>{value}</Option>)
      }
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Select defaultValue='请选择' style={{
          width: 90
        }} onChange={this.productChange}>
          {this.data.productData}
        </Select>
        <Select value={this.state.obj} style={{
          width: 90
        }} onChange={this.handleServerChange}>
          {this.data.serverData || []}
        </Select>
      </div>
    )
  }
}
