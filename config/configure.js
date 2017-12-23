import _ from 'lodash'
// 配置后端API地址前缀
let ignore = ['index.js', 'PageNotFound', 'Home']

let arr = _.pullAll(__GLOB__, ignore)

_.map(arr, (elem, index) => {
  // 配置后端API地址前缀
  const PREFIX_API = '/admin/api/'
  const HOST = {
    LOCAL: 'http://192.168.130.13:8091',
    // LOCAL: 'http://192.168.140.99:8092',
    REMOTE: 'http://192.168.2.49:8091',
    RELEASE: `http://${__HOST__}`
  }

  const PLATFORM = {
    LOCAL: `${HOST.LOCAL}${PREFIX_API}${elem}`,
    REMOTE: `${HOST.REMOTE}${PREFIX_API}${elem}`,
    RELEASE: `${HOST.RELEASE}${PREFIX_API}${elem}`
  }

  let HOSTS, API_HOST, IP_HOST
  if (__DEV__) {
    IP_HOST = HOST.LOCAL
    HOSTS = PLATFORM.LOCAL
    API_HOST = `${IP_HOST}${PREFIX_API}`
    console.info(
      '  -->   sim/dev/本地开发，模拟api环境，【本地】接口. 接口常量：' +
        elem.toUpperCase() +
        'HOSTS; %s/...',
      HOSTS
    )
  } else if (__IP__ && __HOST__ !== null) {
    IP_HOST = HOST.RELEASE
    HOSTS = PLATFORM.RELEASE
    API_HOST = `${IP_HOST}${PREFIX_API}`
    // console.info('  -->   release/!!!正式发布环境. 接口常量：' + elem.toUpperCase() + '_API_HOST; %s/...', HOSTS)
  } else if (__PROD__) {
    IP_HOST = HOST.REMOTE
    HOSTS = PLATFORM.REMOTE
    API_HOST = `${IP_HOST}${PREFIX_API}`
    // console.info('  -->   prod/开发环境，【后台】接口. 接口常量：' + elem.toUpperCase() + '_API_HOST; %s/...', HOSTS)
  } else if (__TEST__) {
  }

  window['IP_HOST'] = IP_HOST
  window[elem.toUpperCase() + '_API_HOST'] = HOSTS
  window['API_HOST'] = API_HOST.slice(0, API_HOST.length - 1)
  // console.log(HOSTS, API_HOST)
})

module.exports = {
  arr
}

/**
IP_HOST
  "http://192.168.140.72:8091"

API_HOST
  "http://192.168.140.72:8091/admin/api"

SANGO2_API_HOST
  "http://192.168.140.72:8091/admin/api/sango2"
 */
