import sango2 from '../../../../../axios/sango2'
import { info } from '../components/dialogAlert/DialogAlert'

import { singOut } from '../../../../../modules/login'
import { baseInfoXlsz } from './exportXlsz'

// ------------------------------------
// Constants
// ------------------------------------
const REQUEST_BASEINFOS = 'REQUEST_BASEINFOS'
const RECEIVE_BASEINFOS = 'RECEIVE_BASEINFOS'

const REQUEST_BASEINFOS_ITEM = 'REQUEST_BASEINFOS_ITEM'
const RECEIVE_BASEINFOS_ITEM = 'RECEIVE_BASEINFOS_ITEM'

const KEEPING_BASEINFOS = 'KEEPING_BASEINFOS'

// ------------------------------------
// Actions
// ------------------------------------

function requestBaseInfos() {
  return {
    type: REQUEST_BASEINFOS
  }
}
function receiveBaseInfos(data) {
  return {
    type: RECEIVE_BASEINFOS,
    list: data
  }
}

function requestBaseInfosItem() {
  return {
    type: REQUEST_BASEINFOS_ITEM
  }
}
function receiveBaseInfosItem() {
  return {
    type: RECEIVE_BASEINFOS_ITEM
  }
}
function keepBaseInfos(data) {
  return {
    type: KEEPING_BASEINFOS,
    payload: data
  }
}

function baseInfosSearchActionCreator(value = {}) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', value)
    dispatch(requestBaseInfos())
    let url = `/products/${value.products[0]}/servers/${value
      .products[1]}/players/baseinfo`
    let config = {
      params: {
        nickname: value.nickname
      }
    }
    sango2
      .get(url, config)
      .then(result => {
        const { status, data, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveBaseInfos(data.domainObject))
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

function baseInfosItemActionCreator(products, playerId, recordData, type) {
  return (dispatch, getState) => {
    let myState = getState()
    console.log('getState():', myState)
    console.log('Search values of form: ', products, playerId, recordData)
    dispatch(requestBaseInfosItem())
    let url = `/products/${products[0]}/servers/${products[1]}/players/${playerId}/items`
    sango2
      .get(url)
      .then(result => {
        const { status, data, code } = result
        if (status >= 200 && status < 300) {
          dispatch(receiveBaseInfosItem(data.domainObject))
          if (type) {
            info(data.domainObject)
          } else {
            baseInfoXlsz(data.domainObject, recordData)
          }
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

// function baseInfosSearchActionCreator(value = {}) {
//   return (dispatch, getState) => {
//     let myState = getState()
//     console.log('getState():', myState)
//     console.log('Search values of form: ', value)
//     dispatch(requestBaseInfos())
//     let url = `${SANGO2_API_HOST}/products/${value.products[0]}/servers/${value
//       .products[1]}/players/baseinfo?nickname=${value.nickname}`
//     axios({
//       method: 'get',
//       url: url,
//       headers: {
//         productId: value.products[0],
//         serverId: value.products[1],
//         adminUserId: JSON.parse(sessionStorage.getItem('sango2')).userId,
//         Authorization: `bearer ${JSON.parse(sessionStorage.getItem('sango2'))
//           .token}`
//       }
//     })
//       .then(data => {
//         dispatch(receiveBaseInfos(data.data.domainObject))
//       })
//       .catch(error => {
//         if (error.response) {
//           if (error.response.data.message === 'token异常，请重新登录。') {
//             openNotificationWithIcon(
//               'error',
//               '登录过期',
//               error.response.data.message,
//               3
//             )
//             dispatch(singOut())
//           }
//           if (error.response.data.error) {
//             openNotificationWithIcon(
//               'error',
//               error.response.data.status,
//               error.response.data.message,
//               10
//             )
//           }
//         } else if (error.request) {
//           console.log(error.request)
//         } else {
//           console.log('Error', error.message)
//         }
//       })
//   }
// }

// function baseInfosItemActionCreator(products, playerId, recordData, type) {
//   return (dispatch, getState) => {
//     let myState = getState()
//     console.log('getState():', myState)
//     console.log('Search values of form: ', products, playerId, recordData)
//     dispatch(requestBaseInfosItem())
//     let url = `${SANGO2_API_HOST}/products/${products[0]}/servers/${products[1]}/players/${playerId}/items`
//     axios({
//       method: 'get',
//       url: url,
//       headers: {
//         productId: products[0],
//         serverId: products[1],
//         adminUserId: JSON.parse(sessionStorage.getItem('sango2')).userId,
//         Authorization: `bearer ${JSON.parse(sessionStorage.getItem('sango2'))
//           .token}`
//       }
//     })
//       .then(data => {
//         dispatch(receiveBaseInfosItem(data.data.domainObject))
//         if (type) {
//           info(data.data.domainObject)
//         } else {
//           baseInfoXlsz(data.data.domainObject, recordData)
//         }
//       })
//       .catch(error => {
//         console.log(error)
//         if (error.response) {
//           if (error.response.data.message === 'token异常，请重新登录。') {
//             openNotificationWithIcon(
//               'error',
//               '登录过期',
//               error.response.data.message,
//               3
//             )
//             dispatch(singOut())
//           }
//           if (error.response.data.error) {
//             openNotificationWithIcon(
//               'error',
//               error.response.data.status,
//               error.response.data.message,
//               10
//             )
//           }
//         } else if (error.request) {
//           console.log(error.request)
//         } else {
//           console.log('Error:', error.message)
//         }
//       })
//   }
// }

export {
  baseInfosSearchActionCreator,
  baseInfosItemActionCreator,
  receiveBaseInfos,
  keepBaseInfos
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_BASEINFOS]: state => {
    return {
      ...state,
      fetching: true
    }
  },
  [RECEIVE_BASEINFOS]: (state, action) => {
    return {
      ...state,
      fetching: false,
      list: [...action.list]
    }
  },
  [REQUEST_BASEINFOS_ITEM]: state => {
    return {
      ...state,
      fetching: true
    }
  },
  [RECEIVE_BASEINFOS_ITEM]: state => {
    return {
      ...state,
      fetching: false
    }
  },
  [KEEPING_BASEINFOS]: (state, action) => {
    // console.log(action.payload)
    return {
      ...state,
      keeping: Object.assign({}, action.payload)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  list: [],
  keeping: {}
}
export default function mailsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
