import React from 'react'
import { notification } from 'antd'

export const openNotificationWithIcon = (type, message, description, time) => {
  notification[type]({
    message: message ? String(message) : '',
    description: description ? String(description) : '',
    duration: time || 3
  })
}
