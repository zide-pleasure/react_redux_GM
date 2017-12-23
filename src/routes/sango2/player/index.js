import baseInfos from './baseinfos'

export default store => ({
  path: 'player',
  breadcrumbName: '玩家数据',
  childRoutes: [baseInfos(store)]
})
