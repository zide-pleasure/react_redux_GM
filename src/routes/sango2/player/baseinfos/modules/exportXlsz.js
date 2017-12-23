import _ from 'lodash'
import js2excel from 'js2excel'
import moment from 'moment'

function baseInfoXlsz (itemData, recordData) {
  // console.log(itemData, recordData)
  let columns = [
    {
      name: '道具 ID',
      prop: 'itemId'
    },
    {
      name: '背包类型',
      prop: 'bagType'
    },
    {
      name: '背包名称',
      prop: 'bagName'
    },
    {
      name: '道具模板 ID',
      prop: 'itemTemplateId'
    },
    {
      name: '道具模板名称',
      prop: 'itemTemplateName'
    },
    {
      name: '数量',
      prop: 'count'
    },
    {
      name: 'pos',
      prop: 'pos'
    },
    {
      name: '强化等级',
      prop: 'intensifyLevel'
    },
    {
      name: '创建时间',
      prop: 'createTime'
    }
  ]

  let rows = []

  _.map(itemData, (value, index, collection) => {
    rows.push({
      itemId: value.itemId,
      bagType: value.bagType,
      bagName: value.bagName,
      itemTemplateId: value.itemTemplateId,
      itemTemplateName: value.itemTemplateName,
      count: value.count,
      pos: value.pos,
      intensifyLevel: value.intensifyLevel,
      createTime: moment(value.createTime).format('YYYY-MM-DD HH:mm:ss')
    })
  })

  try {
    js2excel(columns, rows, `${recordData.nickname}-${recordData.playerId}-背包道具`)
  } catch (e) {
    console.error('export error')
  }
}

export {
  baseInfoXlsz
}
