/* global SANGO2_API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../components/notification'

// 默认配置
axios.defaults.withCredentials = true

// 添加一个请求拦截器
const requestFilter = instance => {
  instance.interceptors.request.use(
    config => {
      // console.log(config)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}

// 添加一个响应拦截器
const responseFilter = instance => {
  instance.interceptors.response.use(
    response => {
      return {
        data: response.data,
        status: response.status
      }
    },
    error => {
      if (error.response) {
        let result = {
          code: 0,
          status: error.response.status,
          message: error.response.data.tips
        }
        if (
          error.response.data.tips.includes('token失效') ||
          error.response.data.tips.includes('请重新登录')
        ) {
          result.code = 1
        }
        openNotificationWithIcon('error', result.status, result.message, 3)
        return Promise.resolve(result)
      } else {
        // 一些错误是在设置请求的时候触发
        return Promise.reject(error)
      }
    }
  )
}

let options = {
  headers: {
    adminUserId: JSON.parse(sessionStorage.getItem('sango2')).userId,
    Authorization: `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
  },
  baseURL: `${SANGO2_API_HOST}`
}

let ax = {
  init() {
    // 实例化
    let instance = axios.create(options)
    requestFilter(instance)
    responseFilter(instance)
    return instance
  },
  post(url, data = {}, config = {}) {
    return this.init().post(url, data)
  },
  put(url, data = {}, config = {}) {
    return this.init().put(url, data)
  },
  delete(url, config = {}) {
    return this.init().delete(url, config)
  },
  get(url, config = {}) {
    return this.init().get(url, config)
  }
}

export default ax
