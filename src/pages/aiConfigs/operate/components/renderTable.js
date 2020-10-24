import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Badge } from 'antd';
import _ from 'lodash';
import { useMount } from 'react-use';
import ENUMS from '../constants/enums';
import { useOperateTable } from '@/hooks';

const { confirm } = Modal;

const taskType = {
  1: 'cpu布控',
  2: '内存',
  3: '网络'
};

export default observer(({ store }) => {
  // const { push } = useRouter();
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (record) => {
    confirm({
      title: '确定删除此条巡检任务删除任务后无法恢复，你还要继续吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ deviceips: JSON.stringify([record.deviceip]) });
      },
      onCancel() {
      }
    });
  };

  const showModal = async (record) => {
    await store.getEntry({ deviceip: record.deviceip });
    store.update({ visible: true, action: 'edit', deviceip: record.deviceip });
  };

  const config = useCallback(async (record) => {
    await store.getEntry({ deviceip: record.deviceip });
    store.update({ configVisible: true });
  });

  const columns = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'taskType',
      title: '任务类型',
      render: (types) => {
        const typeArr = types.split(',');
        const strArr = [];
        typeArr.forEach(item => {
          strArr.push(taskType[item]);
        });
        return strArr.join(',');
      }
    },
    {
      dataIndex: 'deviceName',
      title: '设备名称'
    },
    {
      dataIndex: 'status',
      title: '状态',
      render: (key) => <Badge
        status={_.get(ENUMS.CONTROL_STATE.keyMap[key], 'states')}
        text={_.get(ENUMS.CONTROL_STATE.keyMap[key], 'name')}
      />
    },
    {
      dataIndex: 'startTime',
      title: '开始时间'
    },
    {
      dataIndex: 'endTime',
      title: '结束时间'
    },
    {
      dataIndex: 'intervals',
      title: '扫描间隔'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, record) => <>
        <Button type="link" onClick={() => config(record)}>阀值配置</Button>
        <Button type="link" onClick={() => showModal(record)}>编辑</Button>
        <Button type="link" onClick={() => showDeleteConfirm(record)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    store.queryPaging();
    store.getService();
  });
  return createTable({
    rowKey: 'deviceip',
    checkable: true,
    columns
  });
});
