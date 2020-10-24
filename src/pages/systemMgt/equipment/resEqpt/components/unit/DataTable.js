import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import { Button, Badge } from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable } from '@/hooks';

export default inject('enums')(observer(({
  enums,
  store
}) => {
  const { query } = useRouter();

  useMount(() => {
    store.queryPaging({
      query: { nodeCode: query.nodeCode }
    });
  });

  const { onEdit, createTable } = useOperateTable(store);

  const columns = [
    {
      dataIndex: 'serverUnitName',
      title: '服务单元名称'
    },
    {
      dataIndex: 'serverUnitType',
      title: '服务单元类型'
    },
    {
      dataIndex: 'serverUnitPort',
      title: '服务单元端口'
    },
    {
      dataIndex: 'capacity',
      title: '负载数量'
    },
    {
      dataIndex: 'serverStatus',
      title: '状态',
      render: (val) => {
        const item = _.get(enums.NET_STATUS.map, val);
        return (
          <Badge color={item.color} text={item.name} />
        );
      }
    },
    {
      dataIndex: 'updateTime',
      title: '更新时间'
    },
    {
      dataIndex: '',
      title: '操作',
      width: 80,
      render: ({ serverUnitId }) => (
        <Button type="link" onClick={() => onEdit({ serverUnitId })}>编辑</Button>
      )
    }
  ];
  return createTable({
    rowKey: 'serverUnitId',
    columns
  });
}));
