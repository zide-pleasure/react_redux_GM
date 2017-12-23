import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {Modal, Table} from 'antd'

export function info(data) {
  let dataSource = _.map(data, function(value, index, collection) {
    return {
      key: index,
      itemId: value.itemId,
      bagType: value.bagType,
      bagName: value.bagName,
      itemTemplateId: value.itemTemplateId,
      itemTemplateName: value.itemTemplateName,
      count: value.count,
      pos: value.pos,
      intensifyLevel: value.intensifyLevel,
      createTime: moment(value.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
  })

  const columns = [{
    title: '道具 ID',
    dataIndex: 'itemId',
    key: 'itemId'
  }, {
    title: '背包类型',
    dataIndex: 'bagType',
    key: 'bagType'
  }, {
    title: '背包名称',
    dataIndex: 'bagName',
    key: 'bagName'
  }, {
    title: '道具模板 ID',
    dataIndex: 'itemTemplateId',
    key: 'itemTemplateId'
  }, {
    title: '道具模板名称',
    dataIndex: 'itemTemplateName',
    key: 'itemTemplateName'
  }, {
    title: '数量',
    dataIndex: 'count',
    key: 'count'
  }, {
    title: 'pos',
    dataIndex: 'pos',
    key: 'pos'
  }, {
    title: '强化等级',
    dataIndex: 'intensifyLevel',
    key: 'intensifyLevel'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }]

  Modal.info({
    title: '查看背包道具信息',
    okText: '关闭',
    width: 1000,
    content: (
      <Table
        size='middle'
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 50
        }}
        // footer={() => {
        //   return <div>111</div>
        // }}
      />
    ),
    onOk() {}
  })
}
