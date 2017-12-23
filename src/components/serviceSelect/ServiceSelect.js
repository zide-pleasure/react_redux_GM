import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Cascader } from 'antd'


export class ServiceSelect extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  options = []

  onChange= (value) => {
    this.props.onChange(value)
  }

  displayRender= (label) => {
    return label[label.length - 1]
  }

  componentWillMount() {

  }
  componentDidMount() {

  }
  render() {
    // console.log(this.props)
    return (
      <div>
        <Cascader
          options={this.props.data}
          expandTrigger='hover'
          onChange={this.onChange}
        />
      </div>
    )
  }
}
