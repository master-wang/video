import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Button, Divider, Popconfirm
} from 'antd';
import detailStore from '../../../store/detail';
import { useOperateTable, useRouter } from '@/hooks';

export default observer(({ store }) => {
  const { query } = useRouter();
  const { personid } = query;

  useMount(() => {
    store.queryPaging({
      query: { personid }
    });
  });

  const { onDelete, createTable } = useOperateTable(store);

  const goFace = ({ channelid, name }) => {
    detailStore.update({
      channelId: [channelid],
      name,
      tabVal: 'capture'
    });
    detailStore.queryPaging({
      query: { channelId: [channelid] },
      pagination: { current: 1 }
    });
  };

  const columns = [
    {
      dataIndex: 'name',
      title: '地点'
    },
    {
      dataIndex: 'num',
      title: '抓拍次数'
    },
    {
      dataIndex: '',
      title: '操作',
      width: 220,
      render: ({ channelid, name }) => (
        <>
          <Button type="link" onClick={() => goFace({ channelid, name })}>查看</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除此角色？"
            onConfirm={() => onDelete({ personid, channelids: [channelid] })}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  const dataList = store.dataSource.map((item, i) => {
    const id = i;
    return {
      ...item,
      id
    };
  });

  return createTable({
    rowKey: 'id',
    checkable: true,
    columns,
    dataSource: dataList
  });
});
