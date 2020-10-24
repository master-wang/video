import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, message } from 'antd';
import { useMount } from 'react-use';
import _ from 'lodash';
import moment from 'moment';
import ENUMS from '../../constants/enums';
import { useOperateTable } from '@/hooks';
import { useToolTip } from '../../hooks';
import style from './index.module.less';

const { confirm } = Modal;

export default observer(({ store }) => {
  // const { push } = useRouter();
  const { createTable } = useOperateTable(store);

  const showDeleteConfirm = (id) => {
    confirm({
      title: '是否确认删该条抓拍记录？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await store.deleteItem({ id });
        store.queryPaging();
      },
      onCancel() {
      }
    });
  };

  const showDetail = async (id) => {
    message.info('正在获取更多人脸结果！');
    await store.getDetail({ id });
    store.update({ visible: true, detailLoading: true });
    await store.getMoreFaces({ id });
    store.update({ detailLoading: false });
  };

  const columns = [
    {
      dataIndex: 'catchFace',
      title: '抓拍人脸',
      render: (url) => <img src={url} alt="" className={style['table-img']} />
    },
    {
      dataIndex: 'originFace',
      title: '布控人脸',
      render: (url) => <img src={url} alt="" className={style['table-img']} />
    },
    {
      dataIndex: 'similarity',
      title: '相似度',
      render: (text) => {
        const str = `${text}`;
        return `${str.includes('.') ? str.split('.')[1] : Number(str) * 100}%`;
      }
    },
    {
      dataIndex: 'name',
      title: '姓名'
    },
    {
      dataIndex: 'cardType',
      title: '证件类型',
      render: (text) => _.get(ENUMS.CARDTYPE.keyMap[text], 'name')
    },
    {
      dataIndex: 'cardNumber',
      title: '证件号码'
    },
    {
      dataIndex: 'facedbName',
      title: '所属人口库'
    },
    {
      dataIndex: 'channelName',
      title: '抓拍通道',
      render: (text) => useToolTip({ title: text, limit: 12 })
    },
    {
      dataIndex: 'catchTime',
      title: '抓拍时间'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { id }) => <>
        <Button type="link" onClick={() => showDetail(id)}>查看详情</Button>
        <Button type="link" onClick={() => showDeleteConfirm(id)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(3, 'days');
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
