import React from 'react';
import { observer } from 'mobx-react';
import {
  Button, Table, message, Input
} from 'antd';
import moment from 'moment';
import { useCaptureWay } from '@/hooks';
import RangeTimePicker from '../../hooks/TimeRange';
import style from './index.module.less';

export default observer(({ store }) => {
  const { ControlAreaList, action } = store;
  const { createWay, getChennels } = useCaptureWay({ store, selectMore: false });
  // 显示划分区域的弹窗
  const showModal = ({
    id, channelId: channelSelect, regions, channelName
  }) => {
    if (!channelSelect) {
      message.info('请选择通道！');
      return;
    }
    // 跟新画图相关信息
    store.update({
      ereaVisible: true,
      id,
      channelId: channelSelect,
      regions,
      channelName
    });
  };
  // 通道select的改变
  const channelOnchange = (channelId, id) => {
    const obj = { id, field: ['channelId', 'channelName'], val: [] };
    const arr = getChennels();
    arr.forEach(item => {
      if (item.channelId === channelId) {
        obj.val = [channelId, item.channelName];
        store.updateControlArea(obj);
      }
    });
  };

  // 时间得改变
  const dataChange = ({ id, times }) => {
    store.updateControlArea({ id, field: ['timeRange'], val: [times] });
  };
  const columns = [
    {
      title: '布控通道',
      dataIndex: 'channelId',
      render: (text, { id, channelId: channelSelect, channelName }) => (action === 'edit' ? <Input disabled value={channelName} /> : createWay({
        Props: {
          onChange: (channelId) => channelOnchange(channelId, id),
          treeCheckable: false,
          value: channelSelect || null
        }
      }))
    },
    {
      title: '布控时间点',
      dataIndex: 'timeRange',
      render: (text, { id, timeRange }) => <RangeTimePicker
        onChange={(times) => {
          dataChange({ id, times });
        }}
        value={timeRange || null}
      />
    },
    {
      title: '',
      dataIndex: '_area',
      render: (text, {
        id, channelId: channelSelect, regions, channelName
      }) =>
        <span
          className={style['eare-click']}
          onClick={() => showModal({
            id, channelId: channelSelect, regions, channelName
          })}
        >
        设置区域边界
        </span>
    }
  ];

  const addItem = () => {
    const lastItem = ControlAreaList[ControlAreaList.length - 1];
    const newItem = {
      id: lastItem ? lastItem.id + 1 : 0,
      channelId: null,
      channelName: '',
      timeRange: { start: moment('00:00:00', 'HH:mm:ss'), end: moment('23:59:59', 'HH:mm:ss') },
      regions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ]
    };
    store.update({
      ControlAreaList: [...ControlAreaList, newItem]
    });
  };
  const deleteItem = () => {
    const newList = ControlAreaList.slice(0, ControlAreaList.length - 1);
    store.update({
      ControlAreaList: newList
    });
  };

  return (
    <div className={style['control-area']}>
      <Table
        dataSource={ControlAreaList.slice()}
        columns={columns}
        scroll={{ y: 300 }}
        rowKey="id"
        pagination={false}
      />
      <div style={{ marginTop: 10 }}>
        <Button type="primary" style={{ marginRight: 5 }} icon="plus" onClick={addItem} />
        <Button type="primary" icon="minus" disabled={ControlAreaList.length < 1} onClick={deleteItem} />
      </div>
    </div>
  );
});
