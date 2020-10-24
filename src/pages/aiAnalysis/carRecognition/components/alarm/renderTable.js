import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Badge } from 'antd';
import { useMount } from 'react-use';
import moment from 'moment';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useOperateTable } from '@/hooks';
import { useToolTip } from '../../hooks';
import style from './index.module.less';

const { confirm } = Modal;

export default observer(({ store }) => {
  // const { push } = useRouter();
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = ({ id }) => {
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

  const showModal = async ({ id }) => {
    await store.getDetail({ id });
    store.update({ visible: true, alarmId: id });
  };

  const columns = [
    {
      dataIndex: 'catchCar',
      title: '抓拍车辆',
      render: (url) => <img src={url} alt="" className={style['table-img']} />
    },
    {
      dataIndex: 'originCar',
      title: '布控车辆',
      render: (url) => <img src={url} alt="" className={style['table-img']} />
    },
    {
      dataIndex: 'originCardNumber',
      title: '车牌号码'
    },
    {
      dataIndex: 'carDbName',
      title: '所属车辆库'
    },
    {
      dataIndex: 'channelName',
      title: '抓拍通道',
      render: (text) => useToolTip({ title: text })
    },
    {
      dataIndex: 'catchTime',
      title: '抓拍时间'
    },
    {
      dataIndex: 'licenseCheck',
      title: '是否套牌车',
      render: (key) => _.get(ENUMS.COPY_CAR.keyMap[key], 'name')
    },
    {
      dataIndex: 'checkStatus',
      title: '审核状态',
      render: (key) => <Badge
        status={_.get(ENUMS.APPROL_STATE.keyMap[key], 'states')}
        text={_.get(ENUMS.APPROL_STATE.keyMap[key], 'name')}
      />
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { id }) => <>
        <Button type="link" onClick={() => showModal({ id })}>详情</Button>
        <Button type="link" onClick={() => showDeleteConfirm({ id })}>删除</Button>
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
    // rowKey: 'id',
    columns
  });
});
