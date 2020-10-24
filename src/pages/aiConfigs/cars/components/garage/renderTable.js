import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from 'antd';
import { useMount } from 'react-use';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useToolTip } from '../../hooks';
import { useOperateTable, useRouter } from '@/hooks';

const { confirm } = Modal;

export default observer(({ store }) => {
  const { push } = useRouter();
  const { createTable, onDelete } = useOperateTable(store);
  const showDeleteConfirm = (cardbId) => {
    confirm({
      title: '删除车辆库，该库中所有车辆信息同步清空，是否确认删除？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await onDelete({ cardbId });
      },
      onCancel() {
      }
    });
  };
  // 调整到车辆管理
  const goCarsMgmt = (id) => {
    const path = {
      path: '/aiconfigs/cars/carsMgmt',
      query: {
        id
      }
    };
    push(path);
  };
  // 展示编辑
  const showEdit = async (cardbId) => {
    await store.getGarageInfo({ cardbId });
    store.update({ garageVisible: true, action: 'edit', garageId: cardbId });
  };
  const columns = [
    {
      dataIndex: 'cardbName',
      title: '车辆库名称'
    },
    {
      dataIndex: 'company',
      title: '所属单位'
    },
    {
      dataIndex: 'libType',
      title: '车辆库类型',
      render: (key) => _.get(ENUMS.GARAGE_TYPE.keyMap[key], 'name')
    },
    {
      dataIndex: 'count',
      title: '车辆数量'
    },
    {
      dataIndex: 'description',
      title: '库描述',
      render: (text) => useToolTip({ title: text })
    },
    {
      dataIndex: 'creator',
      title: '创建人'
    },
    {
      dataIndex: 'createTime',
      title: '创建时间'
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, { cardbId }) => <>
        <Button type="link" onClick={() => goCarsMgmt(cardbId)}>车辆管理</Button>
        <Button type="link" onClick={() => showEdit(cardbId)}>编辑</Button>
        <Button type="link" onClick={() => showDeleteConfirm(cardbId)}>删除</Button>
      </>
    }
  ];
  useMount(() => {
    store.queryPaging();
  });
  return createTable({
    rowKey: 'cardbId',
    columns
  });
});
