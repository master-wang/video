import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Badge } from 'antd';
// import { useToolTip } from '../../hooks';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useOperateTable } from '@/hooks';
import style from './index.module.less';


const { confirm } = Modal;

export default observer(({ store }) => {
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (cardNumber) => {
    confirm({
      title: '删除车辆库，该库中所有车辆信息同步清空，是否确认删除？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        onDelete({ cardbId: store.cardbId, cardNumber, _queryDelay: true });
      },
      onCancel() {
      }
    });
  };
  // 展示编辑
  const showEdit = async (cardNumber) => {
    await store.getEditInfo({ cardNumber, cardbId: store.cardbId });
    store.update({ visible: true, action: 'edit', cardNumber });
  };
  const columns = [
    {
      dataIndex: 'faceStream',
      title: '',
      render: (url) => <img src={url} alt="" className={style['table-img']} />
    },
    {
      dataIndex: 'cardNumber',
      title: '车牌号码'
    },
    {
      dataIndex: 'carType',
      title: '车辆类型',
      render: (text) => _.get(ENUMS.CAR_TYPE.keyMap[text], 'name')
    },
    {
      dataIndex: 'colour',
      title: '车身颜色',
      render: (text) => <div>
        <span className={style['color-cube']} style={{ backgroundColor: _.get(ENUMS.CAR_COLOR.keyMap[text], 'color') }} />
        { _.get(ENUMS.CAR_COLOR.keyMap[text], 'name')}
      </div>
    },
    {
      dataIndex: 'creator',
      title: '添加人'
    },
    {
      dataIndex: 'timestamp',
      title: '添加时间'
    },
    {
      dataIndex: 'dbStatus',
      title: '入库状态',
      render: (text) => <Badge
        status={_.get(ENUMS.GARAGE_STATE.keyMap[text], 'type')}
        text={_.get(ENUMS.GARAGE_STATE.keyMap[text], 'name')}
      />
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { cardNumber }) => <>
        <Button type="link" onClick={() => showEdit(cardNumber)}>编辑</Button>
        <Button type="link" onClick={() => showDeleteConfirm(cardNumber)}>删除</Button>
      </>
    }
  ];
  return createTable({
    rowKey: 'faceid',
    columns
  });
});
