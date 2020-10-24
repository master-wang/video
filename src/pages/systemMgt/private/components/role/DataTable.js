import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Button, Divider, Popconfirm, Badge
} from 'antd';
import { useOperateTable } from '@/hooks';
import store from '../../stores/role';

export default observer(() => {
  useMount(() => {
    store.queryPaging();
  });

  const { onEdit, createTable } = useOperateTable(store);

  const config = (params) => {
    store.queryEntity(params);
    store.update({ configVisible: true });
  };

  const feelRole = async (params) => {
    await store.feelRole(params);
    store.queryPaging();
  };

  const columns = [
    {
      dataIndex: 'name',
      title: '角色名'
    },
    {
      dataIndex: 'createTime',
      title: '创建时间'
    },
    {
      dataIndex: 'status',
      title: '状态',
      render: (states) => (states ? <Badge
        status="success"
        text="启用"
      /> : <Badge
        status="default"
        text="冻结"
      />)
    },
    {
      dataIndex: 'description',
      title: '描述'
    },
    {
      dataIndex: '',
      title: '操作',
      width: 220,
      render: ({ id, status }) => (
        <>
          <Button type="link" onClick={() => onEdit({ id })}>查看</Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => config({ id })}>权限配置</Button>
          <Divider type="vertical" />
          <Popconfirm
            title={`是否${!status ? '启用' : '冻结'}此角色？`}
            onConfirm={() => feelRole({ id })}
          >
            <Button type="link">{!status ? '启用' : '冻结'}</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return createTable({
    rowKey: 'id',
    checkable: true,
    columns
  });
});
