import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import {
  Button, Divider, Badge, Popconfirm
} from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable } from '@/hooks';
import EllipsisCell from '@/components/EllipsisCell';

export default inject('enums')(observer(({
  enums,
  store
}) => {
  const router = useRouter();

  const { onEdit, onDelete, createTable } = useOperateTable(store);

  useMount(() => {
    store.queryPaging();
  });

  const goChannelPage = ({ equipmentCode }) => {
    router.push({
      path: '/systemMgt/resEqpt/channel',
      query: { equipmentCode }
    });
  };

  const columns = [
    {
      dataIndex: 'equipmentCode',
      title: '设备编码',
      width: 140
    },
    {
      dataIndex: 'equipmentName',
      title: '设备名称'
    },
    {
      dataIndex: 'equipmentIp',
      title: 'IP',
      width: 160
    },
    {
      dataIndex: 'equipmentPort',
      title: '登录端口',
      width: 100
    },
    {
      dataIndex: 'organization',
      title: '位置信息',
      className: 'ellipsis-col',
      render: (text) => <EllipsisCell text={text} />
    },
    {
      dataIndex: 'equipmentServerName',
      title: '设备管理服务'
    },
    {
      dataIndex: 'mediaServerName',
      title: '媒体分发服务'
    },
    {
      dataIndex: 'netStatus',
      title: '网络状态',
      width: 100,
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
      dataIndex: 'channelNumber',
      title: '通道个数',
      width: 100,
      render: (text, record) => <Button type="link" onClick={() => goChannelPage(record)} style={{ width: '50px' }}>{text}</Button>
    },
    {
      dataIndex: '',
      title: '操作',
      width: 130,
      render: ({ id }) => (
        <>
          <Button type="link" onClick={() => onEdit({ id })}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除该服务节点？"
            onConfirm={() => onDelete([id])}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return createTable({ checkable: true, columns });
}));
