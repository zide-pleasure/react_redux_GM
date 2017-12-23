/* global API_HOST */
import axios from 'axios'
import _ from 'lodash'
import openNotificationWithIcon from '../../../../components/notification'

// ------------------------------------
// Constants
// ------------------------------------
const USERS_REQUEST = 'USERS_REQUEST'
const USERS_REQUEST_ERR = 'USERS_REQUEST_ERR'
const USERS_RECEIVE = 'USERS_RECEIVE'
const USERS_CLEAR = 'USERS_CLEAR'

const USER_ADD_REQUEST = 'USER_ADD_REQUEST'
const USER_ADD_REQUEST_ERR = 'USER_ADD_REQUEST_ERR'
const USER_ADD_RECEIVE = 'USER_ADD_RECEIVE'

const USER_MOD_REQUEST = 'USER_MOD_REQUEST'
const USER_MOD_REQUEST_ERR = 'USER_MOD_REQUEST_ERR'
const USER_MOD_RECEIVE = 'USER_MOD_RECEIVE'

const USER_DEL_REQUEST = 'USER_DEL_REQUEST'
const USER_DEL_REQUEST_ERR = 'USER_DEL_REQUEST_ERR'
const USER_DEL_RECEIVE = 'USER_DEL_RECEIVE'

const USER_PASS_REQUEST = 'USER_PASS_REQUEST'
const USER_PASS_REQUEST_ERR = 'USER_PASS_REQUEST_ERR'
const USER_PASS_RECEIVE = 'USER_PASS_RECEIVE'

const USER_ROLE_REQUEST = 'USER_ROLE_REQUEST'
const USER_ROLE_REQUEST_ERR = 'USER_ROLE_REQUEST_ERR'
const USER_ROLE_RECEIVE = 'USER_ROLE_RECEIVE'

const ROLES_REQUEST = 'ROLES_REQUEST'
const ROLES_REQUEST_ERR = 'ROLES_REQUEST_ERR'
const ROLES_RECEIVE = 'ROLES_RECEIVE'
const ROLES_CLEAR = 'ROLES_CLEAR'

const ROLE_MENUS_REQUEST = 'ROLE_MENUS_REQUEST'
const ROLE_MENUS_REQUEST_ERR = 'ROLE_MENUS_REQUEST_ERR'
const ROLE_MENUS_RECEIVE = 'ROLE_MENUS_RECEIVE'
const ROLE_MENUS_CLEAR = 'ROLE_MENUS_CLEAR'

const ROLE_MENU_REQUEST = 'ROLE_MENU_REQUEST'
const ROLE_MENU_REQUEST_ERR = 'ROLE_MENU_REQUEST_ERR'
const ROLE_MENU_RECEIVE = 'ROLE_MENU_RECEIVE'

const ROLE_ADD_REQUEST = 'ROLE_ADD_REQUEST'
const ROLE_ADD_REQUEST_ERR = 'ROLE_ADD_REQUEST_ERR'
const ROLE_ADD_RECEIVE = 'ROLE_ADD_RECEIVE'

const ROLE_MOD_REQUEST = 'ROLE_MOD_REQUEST'
const ROLE_MOD_REQUEST_ERR = 'ROLE_MOD_REQUEST_ERR'
const ROLE_MOD_RECEIVE = 'ROLE_MOD_RECEIVE'

const ROLE_DEL_REQUEST = 'ROLE_DEL_REQUEST'
const ROLE_DEL_REQUEST_ERR = 'ROLE_DEL_REQUEST_ERR'
const ROLE_DEL_RECEIVE = 'ROLE_DEL_RECEIVE'

const MENUS_REQUEST = 'MENUS_REQUEST'
const MENUS_REQUEST_ERR = 'MENUS_REQUEST_ERR'
const MENUS_RECEIVE = 'MENUS_RECEIVE'
const MENUS_CLEAR = 'MENUS_CLEAR'

const MENU_ADD_REQUEST = 'MENU_ADD_REQUEST'
const MENU_ADD_REQUEST_ERR = 'MENU_ADD_REQUEST_ERR'
const MENU_ADD_RECEIVE = 'MENU_ADD_RECEIVE'

const MENU_MOD_REQUEST = 'MENU_MOD_REQUEST'
const MENU_MOD_REQUEST_ERR = 'MENU_MOD_REQUEST_ERR'
const MENU_MOD_RECEIVE = 'MENU_MOD_RECEIVE'

const MENU_DEL_REQUEST = 'MENU_DEL_REQUEST'
const MENU_DEL_REQUEST_ERR = 'MENU_DEL_REQUEST_ERR'
const MENU_DEL_RECEIVE = 'MENU_DEL_RECEIVE'

const MENU_ROUTE_REQUEST = 'MENU_ROUTE_REQUEST'
const MENU_ROUTE_REQUEST_ERR = 'MENU_ROUTE_REQUEST_ERR'
const MENU_ROUTE_RECEIVE = 'MENU_ROUTE_RECEIVE'

const MENU_PERMISSION_REQUEST = 'MENU_PERMISSION_REQUEST'
const MENU_PERMISSION_REQUEST_ERR = 'MENU_PERMISSION_REQUEST_ERR'
const MENU_PERMISSION_RECEIVE = 'MENU_PERMISSION_RECEIVE'

const PERMISSIONS_REQUEST = 'PERMISSIONS_REQUEST'
const PERMISSIONS_REQUEST_ERR = 'PERMISSIONS_REQUEST_ERR'
const PERMISSIONS_RECEIVE = 'PERMISSIONS_RECEIVE'

const LIMIT_REQUEST = 'LIMIT_REQUEST'
const LIMIT_REQUEST_ERR = 'LIMIT_REQUEST_ERR'
const LIMIT_RECEIVE = 'LIMIT_RECEIVE'

const PERMISSION_KEEPING = 'PERMISSION_KEEPING'

// ------------------------------------
// Actions
// ------------------------------------

function requestUsers() {
  return {
    type: USERS_REQUEST
  }
}

function requestUsersErr(data) {
  return {
    type: USERS_REQUEST_ERR,
    payload: data
  }
}

function receiveUsers(data) {
  return {
    type: USERS_RECEIVE,
    payload: data
  }
}

function clearUsers() {
  return {
    type: USERS_CLEAR
  }
}

function requestUserAdd() {
  return {
    type: USER_ADD_REQUEST
  }
}

function requestUserAddErr(data) {
  return {
    type: USER_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveUserAdd(data) {
  return {
    type: USER_ADD_RECEIVE,
    payload: data
  }
}

function requestUserMod() {
  return {
    type: USER_MOD_REQUEST
  }
}

function requestUserModErr(data) {
  return {
    type: USER_MOD_REQUEST_ERR,
    payload: data
  }
}

function receiveUserMod(data) {
  return {
    type: USER_MOD_RECEIVE,
    payload: data
  }
}

function requestUserDel() {
  return {
    type: USER_DEL_REQUEST
  }
}

function requestUserDelErr(data) {
  return {
    type: USER_DEL_REQUEST_ERR,
    payload: data
  }
}

function receiveUserDel(data) {
  return {
    type: USER_DEL_RECEIVE,
    payload: data
  }
}

function requestUserPass() {
  return {
    type: USER_PASS_REQUEST
  }
}

function requestUserPassErr(data) {
  return {
    type: USER_PASS_REQUEST_ERR,
    payload: data
  }
}

function receiveUserPss(data) {
  return {
    type: USER_PASS_RECEIVE,
    payload: data
  }
}

function requestUserRole() {
  return {
    type: USER_ROLE_REQUEST
  }
}

function requestUserRoleErr(data) {
  return {
    type: USER_ROLE_REQUEST_ERR,
    payload: data
  }
}

function receiveUserRole(data) {
  return {
    type: USER_ROLE_RECEIVE,
    payload: data
  }
}

function requestRoles() {
  return {
    type: ROLES_REQUEST
  }
}

function requestRolesErr(data) {
  return {
    type: ROLES_REQUEST_ERR,
    payload: data
  }
}

function receiveRoles(data) {
  return {
    type: ROLES_RECEIVE,
    payload: data
  }
}

function clearRoles() {
  return {
    type: ROLES_CLEAR
  }
}

function requestRoleMenus() {
  return {
    type: ROLE_MENUS_REQUEST
  }
}

function requestRoleMenusErr(data) {
  return {
    type: ROLE_MENUS_REQUEST_ERR,
    payload: data
  }
}

function receiveRoleMenus(data) {
  return {
    type: ROLE_MENUS_RECEIVE,
    payload: data
  }
}

function clearRoleMenus() {
  return {
    type: ROLE_MENUS_CLEAR
  }
}

function requestRoleMenu() {
  return {
    type: ROLE_MENU_REQUEST
  }
}

function requestRoleMenuErr(data) {
  return {
    type: ROLE_MENU_REQUEST_ERR,
    payload: data
  }
}

function receiveRoleMenu(data) {
  return {
    type: ROLE_MENU_RECEIVE,
    payload: data
  }
}

function requestRoleAdd() {
  return {
    type: ROLE_ADD_REQUEST
  }
}

function requestRoleAddErr(data) {
  return {
    type: ROLE_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveRoleAdd(data) {
  return {
    type: ROLE_ADD_RECEIVE,
    payload: data
  }
}

function requestRoleMod() {
  return {
    type: ROLE_MOD_REQUEST
  }
}

function requestRoleModErr(data) {
  return {
    type: ROLE_MOD_REQUEST_ERR,
    payload: data
  }
}

function receiveRoleMod(data) {
  return {
    type: ROLE_MOD_RECEIVE,
    payload: data
  }
}

function requestRoleDel() {
  return {
    type: ROLE_DEL_REQUEST
  }
}

function requestRoleDelErr(data) {
  return {
    type: ROLE_DEL_REQUEST_ERR,
    payload: data
  }
}

function receiveRoleDel(data) {
  return {
    type: ROLE_DEL_RECEIVE,
    payload: data
  }
}

function requestMenus() {
  return {
    type: MENUS_REQUEST
  }
}

function requestMenusErr(data) {
  return {
    type: MENUS_REQUEST_ERR,
    payload: data
  }
}

function receiveMenus(data) {
  return {
    type: MENUS_RECEIVE,
    payload: data
  }
}

function clearMenus() {
  return {
    type: MENUS_CLEAR
  }
}

function requestMenuAdd() {
  return {
    type: MENU_ADD_REQUEST
  }
}

function requestMenuAddErr(data) {
  return {
    type: MENU_ADD_REQUEST_ERR,
    payload: data
  }
}

function receiveMenuAdd(data) {
  return {
    type: MENU_ADD_RECEIVE,
    payload: data
  }
}

function requestMenuMod() {
  return {
    type: MENU_MOD_REQUEST
  }
}

function requestMenuModErr(data) {
  return {
    type: MENU_MOD_REQUEST_ERR,
    payload: data
  }
}

function receiveMenuMod(data) {
  return {
    type: MENU_MOD_RECEIVE,
    payload: data
  }
}

function requestmenuDel() {
  return {
    type: MENU_DEL_REQUEST
  }
}

function requestmenuDelErr(data) {
  return {
    type: MENU_DEL_REQUEST_ERR,
    payload: data
  }
}

function receivemenuDel(data) {
  return {
    type: MENU_DEL_RECEIVE,
    payload: data
  }
}

function requestMenuRoute() {
  return {
    type: MENU_ROUTE_REQUEST
  }
}

function requestMenuRouteErr(data) {
  return {
    type: MENU_ROUTE_REQUEST_ERR,
    payload: data
  }
}

function receiveMenuRoute(data) {
  return {
    type: MENU_ROUTE_RECEIVE,
    payload: data
  }
}

function requestMenuPermission() {
  return {
    type: MENU_PERMISSION_REQUEST
  }
}

function requestMenuPermissionErr(data) {
  return {
    type: MENU_PERMISSION_REQUEST_ERR,
    payload: data
  }
}

function receiveMenuPermission(data) {
  return {
    type: MENU_PERMISSION_RECEIVE,
    payload: data
  }
}

function requestPermissions() {
  return {
    type: PERMISSIONS_REQUEST
  }
}

function requestPermissionsErr(data) {
  return {
    type: PERMISSIONS_REQUEST_ERR,
    payload: data
  }
}

function receivePermissions(data) {
  return {
    type: PERMISSIONS_RECEIVE,
    payload: data
  }
}

function keepPermission(data) {
  return {
    type: PERMISSION_KEEPING,
    payload: data
  }
}

function requestLimitErr(data) {
  return {
    type: LIMIT_REQUEST_ERR,
    payload: data
  }
}

function requestLimit() {
  return {
    type: LIMIT_REQUEST
  }
}
function receiveLimit(data) {
  return {
    type: LIMIT_RECEIVE,
    payload: data
  }
}

function fetchUsers() {
  return (dispatch) => {

    dispatch(requestUsers())
    let url = `${API_HOST}/userRoles/users`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUsers(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestUsersErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createUser(data) {
  return (dispatch) => {

    dispatch(requestUserAdd())
    let url = `${API_HOST}/userRoles/user`
    return axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUserAdd(response))
      openNotificationWithIcon('success', '添加用户操作完成！')
      dispatch(fetchUsers())
    }).catch(error => {
      if (error.response) {
        dispatch(requestUserAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateUser(data) {
  return (dispatch) => {

    dispatch(requestUserMod())
    let url = `${API_HOST}/userRoles/user/${data.path.userId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUserMod(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestUserModErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteUser(data) {
  return (dispatch) => {

    dispatch(requestUserDel())
    let url = `${API_HOST}/userRoles/user/${data.path.userId}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUserDel(response))
      openNotificationWithIcon('success', '删除用户操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestUserDelErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateUserPass(data) {
  return (dispatch) => {

    dispatch(requestUserPass())
    let url = `${API_HOST}/userRoles/user/${data.path.userId}/pass`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUserPss(response))
      openNotificationWithIcon('success', '修改密码操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestUserPassErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateUserRole(data) {
  return (dispatch) => {

    dispatch(requestUserRole())
    let url = `${API_HOST}/userRoles/user/${data.path.userId}/bindRole`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveUserRole(response))
      openNotificationWithIcon('success', '分配角色操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestUserRoleErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchRoles(data) {
  return (dispatch) => {

    dispatch(requestRoles())
    let url = `${API_HOST}/userRoles/role`
    return axios({
      method: 'GET',
      // params: data.params,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoles(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRolesErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createRole(data) {
  return (dispatch) => {

    dispatch(requestRoleAdd())
    let url = `${API_HOST}/userRoles/role`
    return axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoleAdd(response))
      openNotificationWithIcon('success', '添加角色操作完成！')
      dispatch(fetchRoles())
    }).catch(error => {
      if (error.response) {
        dispatch(requestRoleAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateRole(data) {
  return (dispatch) => {

    dispatch(requestRoleMod())
    let url = `${API_HOST}/userRoles/role/${data.path.roleId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoleMod(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRoleModErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchRoleMenus(data) {
  return (dispatch) => {

    dispatch(requestRoleMenus())
    let url = `${API_HOST}/userRoles/role/${data.path.roleId}/permission`
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoleMenus(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRoleMenusErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateRoleMenu(data) {
  return (dispatch) => {

    dispatch(requestRoleMenu())
    let url = `${API_HOST}/userRoles/role/${data.path.roleId}/permission`
    return axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoleMenu(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRoleMenuErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteRole(data) {
  return (dispatch) => {

    dispatch(requestRoleDel())
    let url = `${API_HOST}/userRoles/role/${data.path.roleId}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveRoleDel(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestRoleDelErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchMenus() {
  return (dispatch) => {

    dispatch(requestMenus())
    let url = `${API_HOST}/permissions/menuList`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMenus(response))
    }).catch(error => {
      if (error.response) {
        dispatch(requestMenusErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function createMenu(data) {
  return (dispatch) => {

    dispatch(requestMenuAdd())
    let url = `${API_HOST}/permissions/menu/${data.path.parentId}`
    axios({
      method: 'POST',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMenuAdd(response))
      openNotificationWithIcon('success', '添加菜单操作完成！')
      dispatch(fetchMenus())
    }).catch(error => {
      if (error.response) {
        dispatch(requestMenuAddErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateMenu(data) {
  return (dispatch) => {

    dispatch(requestMenuMod())
    let url = `${API_HOST}/permissions/menus/${data.path.menuId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMenuMod(response))
      openNotificationWithIcon('success', '修改菜单操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestMenuModErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function deleteMenu(data) {
  return (dispatch) => {

    dispatch(requestmenuDel())
    let url = `${API_HOST}/permissions/menus/${data.path.menuId}`
    axios({
      method: 'DELETE',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivemenuDel(response))
      openNotificationWithIcon('success', '操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestmenuDelErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateMenuRoute(data) {
  return (dispatch) => {

    dispatch(requestMenuRoute())
    let url = `${API_HOST}/permissions/menuRoute/${data.path.permissionId}`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMenuRoute(response))
      openNotificationWithIcon('success', '操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestMenuRouteErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateMenuPermit(data) {
  return (dispatch) => {

    dispatch(requestMenuPermission())
    let url = `${API_HOST}/permissions/permissions/uri`
    axios({
      method: 'PUT',
      data: data.form,
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveMenuPermission(response))
      openNotificationWithIcon('success', '操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestMenuPermissionErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function fetchPermissions() {
  return (dispatch) => {

    dispatch(requestPermissions())
    let url = `${API_HOST}/permissions/permissionList`
    axios({
      method: 'GET',
      url: url,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receivePermissions(response))
      // openNotificationWithIcon('success', '拉取权限列表操作完成！')
    }).catch(error => {
      if (error.response) {
        dispatch(requestPermissionsErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

function updateLimit(value) {
  return (dispatch) => {

    dispatch(requestLimit())
    let url = `${API_HOST}/userRoles/role/${value.roleId}/permission/limit`
    axios({
      method: 'PUT',
      url: url,
      data: value.productObj,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      }
    }).then(response => {
      dispatch(receiveLimit(response))
      openNotificationWithIcon('success', '修改限制产品成功！')
      dispatch(fetchRoles())
      dispatch(fetchMenus())
    }).catch(error => {
      if (error.response) {
        dispatch(requestLimitErr(error.response.data))
        openNotificationWithIcon('error', error.response.status, error.response.data.tips)
      } else {
        console.log('Error', error.message)
      }
    })
  }
}

export {
  fetchUsers,
  clearUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserPass,
  updateUserRole,
  fetchRoles,
  clearRoles,
  createRole,
  updateRole,
  fetchRoleMenus,
  clearRoleMenus,
  updateRoleMenu,
  deleteRole,
  fetchMenus,
  clearMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  updateMenuRoute,
  updateMenuPermit,
  fetchPermissions,
  keepPermission,
  updateLimit
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      users: []
    })
  },
  [USERS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [USERS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      users: action.payload.data.userList || []
    })
  },
  [USERS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      users: []
    })
  },
  [USER_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      userAdd: {}
    })
  },
  [USER_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [USER_ADD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      userAdd: action.payload.data.user
    })
  },
  [USER_MOD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      userMod: {}
    })
  },
  [USER_MOD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [USER_MOD_RECEIVE]: (state, action) => {
    const users = [...state.users]
    const user = action.payload.data.user
    _.map(users, (val, index) => {
      if (user.id && val.id === user.id) {
        Object.assign(val, user)
      }
    })
    return ({
      ...state,
      fetching: false,
      users: [...users],
      userMod: user
    })
  },
  [USER_DEL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      userDel: {}
    })
  },
  [USER_DEL_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [USER_DEL_RECEIVE]: (state, action) => {
    const user = action.payload.data.user
    const users = state.users.filter((option, index) => {
      return option.id !== user.id
    })
    return ({
      ...state,
      fetching: false,
      users: users,
      userDel: user
    })
  },
  [USER_PASS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      userPass: {}
    })
  },
  [USER_PASS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [USER_PASS_RECEIVE]: (state, action) => {
    const users = [...state.users]
    const user = action.payload.data
    _.map(users, (val, index) => {
      if (user.id && val.id === user.id) {
        Object.assign(val, user)
      }
    })
    return ({
      ...state,
      fetching: false,
      users: [...users],
      userPass: user
    })
  },
  [USER_ROLE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      userRole: {}
    })
  },
  [USER_ROLE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [USER_ROLE_RECEIVE]: (state, action) => {
    const users = [...state.users]
    const data = action.payload.data
    const user = _.omit(data.user, ['roleIdList'])
    Object.assign(user, {roleIdList: data.roleIdList})

    _.map(users, (val, index) => {
      if (user.id && val.id === user.id) {
        Object.assign(val, user)
      }
    })
    return ({
      ...state,
      fetching: false,
      users: [...users],
      userRole: user
    })
  },
  [ROLES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roles: []
    })
  },
  [ROLES_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [ROLES_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      roles: action.payload.data.roles || []
    })
  },
  [ROLES_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      roles: []
    })
  },
  [ROLE_MENUS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleMenus: []
    })
  },
  [ROLE_MENUS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [ROLE_MENUS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      roleMenus: action.payload.data.roleMenus
    })
  },
  [ROLE_MENUS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleMenus: []
    })
  },
  [ROLE_MENU_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleMenu: {}
    })
  },
  [ROLE_MENU_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: { tips: action.payload.response.data.tips }
    })
  },
  [ROLE_MENU_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      roleMenu: action.payload.data
    })
  },
  [ROLE_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleAdd: {}
    })
  },
  [ROLE_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ROLE_ADD_RECEIVE]: (state, action) => {
    const roles = state.roles
    const role = action.payload.data.role
    return ({
      ...state,
      fetching: false,
      roles: [...roles, role],
      roleAdd: role
    })
  },
  [ROLE_MOD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleMod: {}
    })
  },
  [ROLE_MOD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ROLE_MOD_RECEIVE]: (state, action) => {
    const roles = [...state.roles]
    const role = action.payload.data.role
    _.map(roles, (val, index) => {
      if (role.id && val.id === role.id) {
        Object.assign(val, role)
      }
    })
    return ({
      ...state,
      fetching: false,
      roles: [...roles],
      roleMod: role
    })
  },
  [ROLE_DEL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      roleDel: {}
    })
  },
  [ROLE_DEL_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [ROLE_DEL_RECEIVE]: (state, action) => {
    const role = action.payload.data.role
    const roles = state.roles.filter((option, index) => {
      return option.id !== role.id
    })
    return ({
      ...state,
      fetching: false,
      roles: roles,
      roleDel: role
    })
  },
  [MENUS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menus: []
    })
  },
  [MENUS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENUS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      menus: action.payload.data.menus || []
    })
  },
  [MENUS_CLEAR]: (state) => {
    return ({
      ...state,
      fetching: false,
      err: false,
      errMes: {},
      menus: []
    })
  },
  [MENU_ADD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menuAdd: {}
    })
  },
  [MENU_ADD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENU_ADD_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      menuAdd: action.payload.data.menu
    })
  },
  [MENU_MOD_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menuMod: {}
    })
  },
  [MENU_MOD_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENU_MOD_RECEIVE]: (state, action) => {
    const menus = [...state.menus]
    const menu = action.payload.data.permission
    _.map(menus, (val, index) => {
      if (menu.id && val.id === menu.id) {
        Object.assign(val, menu)
      }
    })
    return ({
      ...state,
      fetching: false,
      menus: [...menus],
      menuMod: menu
    })
  },
  [MENU_DEL_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menuDel: {}
    })
  },
  [MENU_DEL_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENU_DEL_RECEIVE]: (state, action) => {
    const menu = action.payload.data.menu
    const menus = state.menus.filter((option, index) => {
      return option.id !== menu.id
    })
    return ({
      ...state,
      fetching: false,
      menus: [...menus],
      menuDel: menu
    })
  },
  [MENU_ROUTE_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menuRoute: {}
    })
  },
  [MENU_ROUTE_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENU_ROUTE_RECEIVE]: (state, action) => {
    const menu = action.payload.data.menu
    const menus = state.menus.filter((option, index) => {
      return option.id !== menu.id
    })
    return ({
      ...state,
      fetching: false,
      menus: [...menus],
      menuRoute: menu
    })
  },
  [MENU_PERMISSION_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      menuPermit: {}
    })
  },
  [MENU_PERMISSION_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [MENU_PERMISSION_RECEIVE]: (state, action) => {
    const menus = [...state.menus]
    const menu = action.payload.data.menu
    _.map(menus, (val, index) => {
      if (menu.id && val.id === menu.id) {
        Object.assign(val, menu)
      }
    })
    return ({
      ...state,
      fetching: false,
      menus: [...menus],
      menuPermit: menu
    })
  },
  [PERMISSIONS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      permissions: []
    })
  },
  [PERMISSIONS_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  },
  [PERMISSIONS_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      permissions: action.payload.data.permissionList || []
    })
  },
  [PERMISSION_KEEPING]: (state, action) => {
    return ({
      ...state,
      keeping: {
        ...state.keeping,
        ...action.payload
      }
    })
  },
  [LIMIT_REQUEST]: (state, action) => {
    return ({
      ...state,
      fetching: true,
      err: false,
      errMes: {},
      limit: {}
    })
  },
  [LIMIT_RECEIVE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      limit: action.payload.data.permissionList || []
    })
  },
  [LIMIT_REQUEST_ERR]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      err: true,
      errMes: action.payload ? { tips: action.payload.response.data.tips } : {}
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { // 数据结构
  fetching: false,
  err: false,
  errMes: {},
  users: [],
  userAdd: {},
  userMod: {},
  userDel: {},
  userPass: {},
  userRole: {},
  roles: [],
  roleMenus: [],
  roleMenu: {},
  roleAdd: {},
  roleMod: {},
  roleDel: {},
  menus: [],
  menuAdd: {},
  menuMod: {},
  menuDel: {},
  menuRoute: {},
  menuPermit: {},
  permissions: [],
  limit: {},
  keeping: {}
}

export default function(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
