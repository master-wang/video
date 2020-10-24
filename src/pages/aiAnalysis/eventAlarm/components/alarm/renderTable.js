import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Badge } from 'antd';
import { useMount } from 'react-use';
import moment from 'moment';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useOperateTable } from '@/hooks';
import { useToolTip } from '../../hooks';

const { confirm } = Modal;

export default observer(({ store }) => {
  // const { push } = useRouter();
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (id) => {
    confirm({
      title: '是否确认删该条告警记录？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ id });
      },
      onCancel() {
      }
    });
  };

  const showModal = async (record) => {
    await store.getDetail({ id: record.id });
    store.update({ visible: true, id: record.id });
  };

  const columns = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'eventType',
      title: '事件类型',
      render: (text) => _.get(ENUMS.TASK_TYPE.keyMap[text], 'name')
    },
    {
      dataIndex: 'channelName',
      title: '告警通道',
      render: (text) => useToolTip({ title: text })
    },
    {
      dataIndex: 'alarmTime',
      title: '告警时间'
    },
    {
      dataIndex: 'checkStatus',
      title: '审核状态',
      render: (key) => <Badge
        status={_.get(ENUMS.APPROL_STATE.keyMap[key || '0'], 'states')}
        text={_.get(ENUMS.APPROL_STATE.keyMap[key || '0'], 'name')}
      />
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, record) => <>
        <Button type="link" onClick={() => showModal(record)}>详情</Button>
        <Button type="link" onClick={() => showDeleteConfirm(record.id)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(2, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    store.queryPaging({
      query: {
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
      }
    });
  });
  return createTable({
    rowKey: 'id',
    columns
  });
});
