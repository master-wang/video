import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Button, Badge, Modal,
  Form
} from 'antd';
import { useOperateTable } from '@/hooks';

const { confirm } = Modal;

export default Form.create()(observer(({
  store
}) => {
  const { createTable, onDelete } = useOperateTable(store);

  const showDeleteConfirm = (id) => {
    confirm({
      title: '确定删除选中的操作日志吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ ids: [id] });
      },
      onCancel() {
      }
    });
  };

  const columns = [
    {
      dataIndex: 'userName',
      title: '序号',
      render: (text, record, index) => `${index + 1}`
    },
    {
      dataIndex: 'name',
      title: '用户名'
    },
    {
      dataIndex: 'content',
      title: '操作内容'
    },
    {
      dataIndex: 'updateTime',
      title: '操作时间'
    },
    {
      dataIndex: 'ipAddress',
      title: 'IP地址'
    },
    {
      dataIndex: 'status',
      title: '操作状态',
      render: (status) => {
        if (status === 0) {
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
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showDeleteConfirm(record.id)}>删除</Button>
        </>
      )
    }
  ];
  useMount(() => {
    store.queryPaging();
  });
  return <>
    {createTable({
      columns,
      rowKey: 'id',
      checkable: true
    })}
  </>;
}));
