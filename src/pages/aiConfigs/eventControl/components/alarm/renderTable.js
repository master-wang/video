import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Badge } from 'antd';
import { useMount } from 'react-use';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useOperateTable } from '@/hooks';
import { useToolTip } from '../../hooks';

const { confirm } = Modal;

export default observer(({ store }) => {
  // const { push } = useRouter();
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (record) => {
    confirm({
      title: '删除任务，布控任务同步停止，是否确认删除？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ taskId: record.taskId });
      },
      onCancel() {
      }
    });
  };

  const showModal = async (record) => {
    await store.getDetail({ taskId: record.taskId });
    store.update({ visible: true, action: 'edit', taskId: record.taskId });
  };

  const columns = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'eventType',
      title: '任务类型',
      render: (text) => _.get(ENUMS.TASK_TYPE.keyMap[text], 'name')
    },
    {
      dataIndex: 'channelName',
      title: '视频源通道',
      render: (text) => useToolTip({ title: text })
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
      title: '审核状态',
      render: (key) => <Badge
        status={_.get(ENUMS.CONTROL_STATE.keyMap[key || '0'], 'states')}
        text={_.get(ENUMS.CONTROL_STATE.keyMap[key || '0'], 'name')}
      />
    },
    {
      dataIndex: 'description',
      title: '任务描述'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, record) => <>
        <Button type="link" onClick={() => showModal(record)}>编辑</Button>
        <Button type="link" onClick={() => showDeleteConfirm(record)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    store.queryPaging();
  });
  return createTable({
    rowKey: 'taskId',
    columns
  });
});
