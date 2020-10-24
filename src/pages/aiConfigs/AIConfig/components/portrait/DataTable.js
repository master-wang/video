/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 15:52:57
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-01 17:33:19
 */
import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import {
  Button, Divider, Popconfirm, Badge
} from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable, useImgScale } from '@/hooks';
import store from '../../stores/portrait';

export default inject('enums')(observer(({
  enums
}) => {
  const { params: { id } } = useRouter();
  useMount(() => {
    store.queryPaging({
      query: { dbTableName: id }
    });
  });
  const { onEdit, onDelete, createTable } = useOperateTable(store);
  // 图片放大的弹窗
  const { createModal } = useImgScale({ store });

  // 图片的放大
  const showImgModal = (imgUrl) => {
    store.update({ imgUrl, imgVisible: true });
  };

  const columns = [
    {
      dataIndex: 'faceurl',
      title: '人像照片',
      render: item => <img style={{ width: '48px', height: '59px' }} src={item} alt={item} onClick={() => showImgModal(item)} />
    },
    {
      dataIndex: 'name',
      title: '姓名'
    },
    {
      dataIndex: 'male',
      title: '性别',
      render: val => (val === '1' ? '男' : '女')
    },
    {
      dataIndex: 'birthDay',
      title: '出生年月'
    },
    {
      dataIndex: 'facedbName',
      title: '所属人口库'
    },
    {
      dataIndex: 'addName',
      title: '添加人'
    },
    {
      dataIndex: 'timestamp',
      title: '添加时间'
    },
    {
      dataIndex: 'dbStatus',
      title: '入库状态',
      render: () => <Badge color="#26F197" text="成功" />
    },
    {
      dataIndex: 'featureStatus',
      title: '人像特征提取状态',
      width: 220,
      render: val => {
        const item = _.get(enums.PORTRAIT_FEATURE_TYPE.map, val, {});
        return <Badge color={item.color} text={item.name} />;
      }
    },
    {
      title: '',
      width: 220,
      render: ({ cardNumber }) => (
        <>
          <Button type="link" onClick={() => onEdit({ cardNumber, facedbId: id })}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除该人员的信息？"
            onConfirm={() => onDelete({ cardNumber, facedbId: id, _queryDelay: true })}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return <>
    {
    createTable({
      rowKey: 'faceid',
      columns
    })
}
    {/* 单张图片的弹窗 */}
    { createModal() }
  </>;
}));
