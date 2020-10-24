import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from 'antd';
import { useMount } from 'react-use';
import { useOperateTable } from '@/hooks';

const { confirm } = Modal;

export default observer(({ store }) => {
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (id) => {
    confirm({
      title: '确定删除此条告警记录删除记录后无法恢复，你还要继续吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ id: JSON.stringify([id]) });
      },
      onCancel() {
      }
    });
  };

  // 展示编辑
  const showDetail = async (id) => {
    await store.getEntry({ id });
    store.update({ detailVisible: true });
  };
  const columns = [
    {
      dataIndex: 'alarmInfo',
      title: '告警内容'
    },
    {
      dataIndex: 'alarmTime',
      title: '告警时间'
    },
    {
      dataIndex: 'deviceName',
      title: '服务器名称'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { id }) => <>
        <Button type="link" onClick={() => showDetail(id)}>查看</Button>
        <Button type="link" onClick={() => showDeleteConfirm(id)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    store.queryPaging();
  });
  return createTable({
    rowKey: 'id',
    checkable: true,
    columns
  });
});
