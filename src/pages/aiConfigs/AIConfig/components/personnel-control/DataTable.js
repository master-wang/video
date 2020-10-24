/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 15:52:57
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-08 15:13:44
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button, Divider, Popconfirm
} from 'antd';
import _ from 'lodash';
import { useOperateTable } from '@/hooks';
import EllipsisCell from '@/components/EllipsisCell';
import store from '../../stores/personnel-control';

export default inject('enums')(observer(({
  enums
}) => {
  const { onEdit, onDelete, createTable } = useOperateTable(store);

  const columns = [
    {
      dataIndex: 'taskName',
      title: '任务名称'
    },
    {
      dataIndex: 'channelName',
      title: '视频源通道'
    },
    {
      dataIndex: 'facedbName',
      title: '布控人口库'
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
      render: (val) => {
        const item = _.get(enums.DISRTBUTION_TYPE.map, val);
        return _.get(item, 'name', '--');
      }
      // render: (item) => <Badge color="#26F197" text={item.name} />
    },
    {
      dataIndex: 'description',
      title: '库描述',
      className: 'ellipsis-col',
      render: (text) => <EllipsisCell text={text} />
    },
    {
      title: '',
      width: 220,
      render: ({ taskId }) => (
        <>
          <Button type="link" onClick={() => onEdit({ taskId })}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="是否确认删除该布控任务？"
            onConfirm={() => onDelete({ taskId })}
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
