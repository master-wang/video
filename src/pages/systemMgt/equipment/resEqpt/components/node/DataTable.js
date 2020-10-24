import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import {
  Button, Divider, Badge, Popconfirm
} from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable } from '@/hooks';
import EllipsisCell from '@/components/EllipsisCell';
import store from '../../stores/node';

export default inject('enums')(observer(({
  enums
}) => {
  useMount(() => {
    store.queryPaging();
  });

  const router = useRouter();

  const { onEdit, onDelete, createTable } = useOperateTable(store);


  // 响应服务单元管理按钮点击事件
  const goUnitPage = ({ nodeCode }) => {
    router.push({
      path: '/systemMgt/resEqpt/unit',
      query: { nodeCode }
    });
  };

  const columns = [
    {
      dataIndex: 'nodeCode',
      title: '节点编码',
      width: 340
    },
    {
      dataIndex: 'nodeName',
      title: '节点名称',
      width: '15%'
    },
    {
      dataIndex: 'nodeIp',
      title: '节点IP',
      width: '15%'
    },
    {
      dataIndex: 'netStatus',
      title: '网络状态',
      width: '10%',
      render: (val) => {
        const item = _.get(enums.NET_STATUS.map, val);
        return (
          <Badge color={item.color} text={item.name} />
        );
      }
    },
    {
      dataIndex: 'description',
      title: '描述',
      className: 'ellipsis-col',
      render: (text) => <EllipsisCell text={text} />
    },
    {
      dataIndex: '',
      title: '操作',
      width: 220,
      render: ({ nodeCode }) => (
        <>
          <Button type="link" onClick={() => onEdit({ nodeCode })}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除该服务节点？"
            onConfirm={() => onDelete({ nodeCode })}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          <Divider type="vertical" />
          <Button type="link" onClick={() => goUnitPage({ nodeCode })}>服务单元管理</Button>
        </>
      )
    }
  ];

  return createTable({
    rowKey: 'nodeCode',
    columns
  });
}));
