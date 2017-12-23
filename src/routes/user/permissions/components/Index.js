import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

import Filter from './Filter'
import List from './List'

export default class Permissions extends Component {
  state = {
    fields: {},
    initials: {
      conf: {
        renderState: true,
        locale: false
      },
      map: {},
      enum: {}
    }
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.props.fetchPermissions()
    }
  }

  render() {
    const { permission, login } = this.props
    const options = {
      permission,
      login,
      authorize: login.authorize
    }
    const initials = this.state.initials
    console.log(options)
    console.log(this.props.login)

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            options={options}
            initials={initials}
            onSearch={this.onSearch}
          />
          <List
            options={options}
            initials={initials}
          />
        </Card>
      </div>
    )
  }
}

Permissions.propTypes = {
  permission: PropTypes.object.isRequired,
  login: PropTypes.object,
  fetchPermissions: PropTypes.func
}
