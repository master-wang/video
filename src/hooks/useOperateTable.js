import React, { useCallback, useMemo } from 'react';
import { toJS } from 'mobx';
import { Table } from 'antd';
import _ from 'lodash';

export default function useOperateTable(store) {
  // 响应添加按钮点击事件
  const onAdd = useCallback(() => {
    store.update({ visible: true, action: 'add', entity: {} });
  }, [store]);

  // 响应编辑按钮点击事件
  const onEdit = useCallback(async (params) => {
    await store.queryEntity(params);
    store.update({ visible: true, action: 'edit' });
  }, [store]);

  // 响应删除按钮点击事件
  const onDelete = useCallback((params) => {
    let batch = false;
    // 第一个参数传true，认为批量删除
    if (params === true) {
      params = store.selectedRowKeys;
      batch = true;
    }
    // 判断是否查询列表的时候延迟查询
    const { _queryDelay = false } = params;
    const isArray = _.isArray(params);
    store.delete(params, () => {
      const fun = () => {
        if (batch) {
          // 批量删除
          store.update({ selectedRowKeys: [] });
          store.queryPaging({ pagination: { current: 1 } });
        } else {
          // 单个删除
          if (isArray) {
            const index = store.selectedRowKeys.indexOf(params[0]);
            if (index > -1) {
              store.selectedRowKeys.splice(index, 1);
            }
          }
          if (store.dataSource.length > 1 || store.pagination.current === 1) {
            store.queryPaging();
          } else {
            store.queryPaging({ pagination: { current: store.pagination.current - 1 } });
          }
        }
      };
      if (_queryDelay) {
        setTimeout(fun, 1000);
      } else {
        fun();
      }
    });
  }, [store]);

  // 响应表格change事件
  const onChange = useCallback((pagination) => {
    store.queryPaging({
      pagination: _.pick(pagination, ['current', 'pageSize'])
    });
  }, [store]);

  const { selectedRowKeys } = store;
  const rowSelection = useMemo(() => ({
    selectedRowKeys,
    onChange: (keys) => {
      store.update({ selectedRowKeys: keys });
    }
  }), [selectedRowKeys]);

  // 创建默认表格
  const createTable = ({
    checkable,
    ...rest
  }) => (
    <Table
      rowKey="id"
      tableLayout="fixed"
      loading={store.loading}
      dataSource={toJS(store.dataSource)}
      pagination={toJS(store.pagination)}
      onChange={onChange}
      // locale={{ emptyText: '暂无数据' }}
      rowSelection={checkable ? rowSelection : null}
      {...rest}
    />
  );

  return {
    onAdd,
    onEdit,
    onDelete,
    onChange,
    createTable
  };
}
