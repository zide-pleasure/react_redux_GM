import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import n2c from 'n2c'

export const RuleTransFrom = ({value}) => {
  const level = [
    {
      color: '#fff',
      background: 'rgb(6, 136, 184)'
    },
    {
      color: '#fff',
      background: 'rgb(13, 110, 22)'
    },
    {
      color: '#fff',
      background: 'rgb(221, 114, 3)'
    },
    {
      color: '#fff',
      background: 'rgb(204, 0, 66)'
    },
    {
      color: '#222',
      background: 'rgb(255, 222, 0)'
    }
  ]
  let len = (value + '').length
  let n2cString = ''
  let n2cStyle = level[0]
  let RE = /^\d+$/.test(_.toNumber(value))

  if (len <= 0) {
    n2cString = '缺少值'
  }

  if (len > 0 && len < 11) {
    n2cString = n2c(_.toNumber(value))
    n2cStyle = level[3]
  }

  // if (len > 3 && len < 7) {
  //   n2cString = n2c(_.toNumber(value))
  //   n2cStyle = level[1]
  // }
  //
  // if (len > 6 && len < 10) {
  //   n2cString = n2c(_.toNumber(value))
  //   n2cStyle = level[2]
  // }
  //
  // if (len > 9 && len < 13) {
  //   n2cString = n2c(_.toNumber(value))
  //   n2cStyle = level[3]
  // }

  if (len > 12) {
    n2cString = '别瞎填，找死啊'
    n2cStyle = level[4]
  }

  if (!RE) {
    n2cString = '不是数字。'
    n2cStyle = level[4]
  }

  return (<p>
    <span style={n2cStyle}>{n2cString}</span>
  </p>)
}

RuleTransFrom.propTypes = {
  value: PropTypes.number
}
