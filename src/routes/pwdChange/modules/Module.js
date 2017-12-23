/* global API_HOST */
import axios from 'axios'
import { browserHistory } from 'react-router'
import openNotificationWithIcon from '../../../components/notification'
import { singOut } from '../../../modules/login'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_PWD = 'RECEIVE_PWD'
const REQUEST_PWD = 'REQUEST_PWD'
const CLEAR_PWD = 'CLEAR_PWD'

const PWD_REQUEST_ERR = 'PWD_REQUEST_ERR'
// ------------------------------------
// Actions
// ------------------------------------

function requestPwd() {
  return {
    type: REQUEST_PWD
  }
}

function receivePwd(data) {
  return {
    type: RECEIVE_PWD,
    payload: data
  }
}

function clearPwd() {
  return {
    type: CLEAR_PWD
  }
}

function requestErr(data) {
  return {
    type: PWD_REQUEST_ERR,
    payload: data
  }
}

function changePwd(value) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().pwdChange.fetching) {
      return
    }
    dispatch(requestPwd())
    let url = `${API_HOST}/admin/newpass`
    return axios({
      method: 'PUT',
      url: url,
      data: value,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePwd(response))
      openNotificationWithIcon('success', '密码修改成功', '密码修改成功，请重新登录!')
      browserHistory.push('/')
      dispatch(singOut())
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
        // browserHistory.push('/')
        // dispatch(singOut())
      } else {
        console.log('Error', error.message)
      }
    })
  }
}


export {
  changePwd,
  clearPwd
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_PWD]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_PWD]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      list: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_PWD]: (state) => {
    return ({
      ...state,
      fetching: false,
      list: {},
      error: null
    })
  },
  [PWD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  list: {},
  error: null
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
