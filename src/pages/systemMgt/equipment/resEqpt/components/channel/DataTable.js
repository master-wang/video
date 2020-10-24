/* eslint-disable no-unused-vars */
import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import { Button, Badge, Tag } from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable } from '@/hooks';
import style from './DataTable.module.less';

export default inject('enums')(observer(({
  enums,
  store
}) => {
  const { query } = useRouter();

  useMount(() => {
    store.queryPaging({ query });
  });

  const { onEdit, createTable } = useOperateTable(store);

  const columns = [
    {
      dataIndex: 'channelId',
      title: '通道编码'
    },
    {
      dataIndex: 'channelName',
      title: '通道名称'
    },
    {
      dataIndex: 'channelNumber',
      title: '通道号',
      width: 120
    },
    {
      dataIndex: 'channelStatus',
      title: '通道状态',
      width: 120,
      render: (val) => {
        const item = _.get(enums.NET_STATUS.map, val, {});
        return (
          <Badge color={item.color} text={item.name} />
        );
      }
    },
    {
      dataIndex: 'videoStatus',
      title: '录像状态',
      width: 120,
      render: (val) => {
        const item = _.get(enums.VIDEO_STATUS.map, val, {});
        return <Tag className={`video-status-tag-${item.id}`}>{item.name}</Tag>;
      }
    },
    {
      dataIndex: 'startStatus',
      title: '是否启用',
      width: 120,
      render: (val) => {
        const item = _.get(enums.IS_NOT.map, val, {});
        return <span style={{ color: item.color }}>{item.name}</span>;
      }
    },
    {
      dataIndex: '',
      title: '操作',
      width: 80,
      render: ({ channelId }) => (
        <Button type="link" onClick={() => onEdit({ channelId })}>编辑</Button>
      )
    }
  ];
  return createTable({
    rowKey: 'channelId',
    className: style['data-table'],
    columns
  });
}));
