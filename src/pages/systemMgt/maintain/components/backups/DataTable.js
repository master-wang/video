import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Badge
} from 'antd';
import { useOperateTable } from '@/hooks';
import store from '../../stores/backups';

export default observer(() => {
  useMount(() => {
    // store.queryPaging();
  });

  const { createTable } = useOperateTable(store);

  const columns = [
    {
      dataIndex: 'userName',
      title: '序号'
    },
    {
      dataIndex: 'realName',
      title: '用户名'
    },
    {
      dataIndex: 'mobile',
      title: '操作内容'
    },
    {
      dataIndex: 'mail',
      title: '操作时间'
    },
    {
      dataIndex: 'ip',
      title: 'IP地址'
    },
    {
      dataIndex: 'userStatus',
      title: '操作状态',
      render: (text) => {
        if (text === 'ACTIVE') {
          return <>
            <Badge status="success" />
              成功
          </>;
        }
        return <>
          <Badge status="error" />
            失败
        </>;
      }
    }
  ];

  return createTable({
    rowKey: 'id',
    checkable: true,
    columns
  });
});
