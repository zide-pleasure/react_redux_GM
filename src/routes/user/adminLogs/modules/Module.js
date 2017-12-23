/* global API_HOST */
import axios from 'axios'
import openNotificationWithIcon from '../../../../components/notification'
// ------------------------------------
// Constants
// ------------------------------------
const RECEIVE_ADMINLOG = 'RECEIVE_ADMINLOG'
const REQUEST_ADMINLOG = 'REQUEST_ADMINLOG'
const CLEAR_ADMINLOG = 'CLEAR_ADMINLOG'

const ADMINLOG_REQUEST_ERR = 'ADMINLOG_REQUEST_ERR'

const RECEIVE_PERMISSIONMAP = 'RECEIVE_PERMISSIONMAP'
const RECEIVE_USERMAP = 'RECEIVE_USERMAP'
// const KEEP_INITIAL_ADMINLOG = 'KEEP_INITIAL_ADMINLOG'
// ------------------------------------
// Actions
// ------------------------------------

function requestAdminLog() {
  return {
    type: REQUEST_ADMINLOG
  }
}

function receiveAdminLog(data) {
  return {
    type: RECEIVE_ADMINLOG,
    payload: data
  }
}

function clearAdminLog() {
  return {
    type: CLEAR_ADMINLOG
  }
}

function requestErr(data) {
  return {
    type: ADMINLOG_REQUEST_ERR,
    payload: data
  }
}

// function keepInitial(data) {
//   return {
//     type: KEEP_INITIAL_ADMINLOG,
//     payload: data
//   }
// }

function fetchAdminLog(value) {
  return (dispatch, getState) => {
    // 验证从复提交
    if (getState().adminLog.fetching) {
      return
    }

    dispatch(requestAdminLog())
    let url = `${API_HOST}/admin/operations`
    return axios({
      method: 'GET',
      url: url,
      params: value,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveAdminLog(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function receiveUsermap(data) {
  return {
    type: RECEIVE_USERMAP,
    payload: data
  }
}

function fetchUsermap(value) {
  return (dispatch, getState) => {
    let url = `${API_HOST}/admin/usermap`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUsermap(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function receivePermissionmap(data) {
  return {
    type: RECEIVE_PERMISSIONMAP,
    payload: data
  }
}

function fetchPermissionmap(value) {
  return (dispatch, getState) => {
    let url = `${API_HOST}/admin/permissionmap`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePermissionmap(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestErr(error.response.data))
        openNotificationWithIcon('error', error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchPermissionmap,
  fetchUsermap,
  fetchAdminLog,
  clearAdminLog
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ADMINLOG]: (state) => {
    return ({
      ...state,
      fetching: true
    })
  },
  [RECEIVE_ADMINLOG]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      logs: action.payload ? action.payload.data : {}
    })
  },
  [CLEAR_ADMINLOG]: (state) => {
    return ({
      ...state,
      fetching: false,
      logs: {},
      error: null
    })
  },
  [ADMINLOG_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      error: { tips: action.payload.tips }
    })
  },
  [RECEIVE_USERMAP]: (state, action) => {
    return ({
      ...state,
      usermap: action.payload.data.domainObject || {}
    })
  },
  [RECEIVE_PERMISSIONMAP]: (state, action) => {
    return ({
      ...state,
      permissionmap: action.payload.data.domainObject || {}
    })
  }
  // [KEEP_INITIAL_ADMINLOG]: (state, action) => {
  //   return ({
  //     ...state,
  //     keeping: {
  //       ...state.keeping,
  //       ...action.payload
  //     }
  //   })
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  logs: {},
  usermap: {},
  permissionmap: {},
  error: null,
  keeping: {}
}

  export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
