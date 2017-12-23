import sango2 from '../axios/apiHost.js'
import {singOut} from './login'

// ------------------------------------
// Constants
// ------------------------------------

const SERVER_MAP_PRODUCT_REQUEST = 'SERVER_MAP_PRODUCT_REQUEST'
const SERVER_MAP_PRODUCT_RECEIVE = 'SERVER_MAP_PRODUCT_RECEIVE'

// ------------------------------------
// Actions
// ------------------------------------

function requestProductsMap() {
  return {
    type: SERVER_MAP_PRODUCT_REQUEST
  }
}

function receiveProductsMap(data) {
  return {
    type: SERVER_MAP_PRODUCT_RECEIVE,
    payload: data
  }
}

function fetchProductsMap(value) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestProductsMap())
    let url = '/products/server/options'
    let config = {
      params: {}
    }
    sango2
      .get(url, config)
      .then(result => {
        const {status, data, code} = result
        if (status >= 200 && status < 300) {
          dispatch(receiveProductsMap(data.domainObject))
        }

        if (code === 1) {
          dispatch(singOut())
        }
      })
      .catch(function(error) {
        if (error.response) {
          // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.header)
        } else {
          // 一些错误是在设置请求的时候触发
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  }
}

export {fetchProductsMap}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVER_MAP_PRODUCT_REQUEST]: state => {
    return {
      ...state,
      fetching: true
    }
  },
  [SERVER_MAP_PRODUCT_RECEIVE]: (state, action) => {
    return {
      ...state,
      fetching: false,
      options: action.payload.data.options
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  // 数据结构
  fetching: false,
  options: []
}

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
