/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 15:52:57
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-21 15:43:50
 */
import React from 'react';
import { useMount } from 'react-use';
import { inject, observer } from 'mobx-react';
import {
  Button, Divider, Popconfirm
} from 'antd';
import _ from 'lodash';
import { useRouter, useOperateTable } from '@/hooks';
import EllipsisCell from '@/components/EllipsisCell';
import store from '../../stores/population';

export default inject('enums')(observer(({
  enums
}) => {
  useMount(() => {
    store.queryPaging();
  });

  const router = useRouter();

  const { onEdit, onDelete, createTable } = useOperateTable(store);
  const goToPortrait = (id) => {
    if (!id) {
      // 弹提示
      return;
    }
    router.push(`/aiConfig/portrait/${id}`);
  };
  const columns = [
    {
      dataIndex: 'facedbName',
      title: '人口库名称'
    },
    {
      dataIndex: 'company',
      title: '所属单位'
    },
    {
      dataIndex: 'libType',
      title: '人口库类型',
      render: (val) => {
        const item = _.get(enums.POPULATION_TYPE.map, val);
        return _.get(item, 'name', '--');
      }
    },
    {
      dataIndex: 'count',
      title: '人员数量'
    },
    {
      dataIndex: 'description',
      title: '库描述',
      className: 'ellipsis-col',
      render: (text) => <EllipsisCell text={text} />
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
      title: '操作',
      width: 220,
      render: ({ facedbId }) => (
        <>
          <Button type="link" onClick={() => goToPortrait(facedbId)}>人像管理</Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => onEdit({ facedbId })}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除该人口库？"
            onConfirm={() => onDelete({ facedbId })}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return createTable({
    rowKey: 'facedbId',
    columns
  });
}));
