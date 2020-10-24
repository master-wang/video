import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Badge } from 'antd';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useToolTip } from '../../hooks';
import { useOperateTable } from '@/hooks';

const { confirm } = Modal;

export default observer(({ store }) => {
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (taskId) => {
    confirm({
      title: '删除任务，布控任务同步停止，是否确认删除？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ taskId });
      },
      onCancel() {
      }
    });
  };
  // 展示编辑
  const showEdit = async (taskId) => {
    await store.getEditInfo({ taskId });
    store.update({ visible: true, action: 'edit', taskId });
  };
  const columns = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'channelName',
      title: '视频源通道',
      render: (text) => useToolTip({ title: text })
    },
    {
      dataIndex: 'cardbInfo',
      title: '布控车辆库',
      render: (text) => {
        const arr = JSON.parse(text);
        const dbNameArr = [];
        arr.forEach(item => {
          dbNameArr.push(item.cardbName);
        });
        return useToolTip({ title: dbNameArr.join(',') });
      }
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
      dataIndex: 'status',
      title: '布控状态',
      render: (key) => <Badge
        status={_.get(ENUMS.CONTROL_STATE.keyMap[key], 'states')}
        text={_.get(ENUMS.CONTROL_STATE.keyMap[key], 'name')}
      />

    },
    {
      dataIndex: 'description',
      title: '任务描述'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { taskId }) => <>
        <Button type="link" onClick={() => showEdit(taskId)}>编辑</Button>
        <Button type="link" onClick={() => showDeleteConfirm(taskId)}>删除</Button>
      </>
    }
  ];
  return createTable({
    rowKey: 'taskId',
    columns
  });
});
