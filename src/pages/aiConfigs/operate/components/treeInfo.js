/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { Input, Badge } from 'antd';
import { useCaptureWay } from '@/hooks';
import styles from './index.module.less';

const { Search } = Input;

export default observer(({ store }) => {
  const leafExtra = (channelName, item) => {
    const node = <>
      {channelName}
      <span style={{ marginLeft: '10px' }}>{item.status ? <Badge status="default" /> : <Badge status="success" />}</span>
    </>;
    return node;
  };
  const { createWay } = useCaptureWay({
    store, selectMore: false, type: 'Tree', leafExtra
  });

  useMount(() => {
    // 获取通道信息
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
    store.update({ selectTreeId: '' });
  });

  // 当点击树节点时查询服务器的状态
  useEffect(() => {
    if (!store.selectTreeId) {
      return;
    }
    console.log('store.selectTreeId', store.selectTreeId);
  }, [store.selectTreeId]);

  const onSearch = (val) => {
    console.log(val);
  };

  return (
    <div className={styles['tree-wrap']}>
      <div className={styles['tree-title']}>
        服务器列表
      </div>
      <div className={styles['tree-input']}>
        <Search
          placeholder="输入关键字搜索服务器"
          onSearch={onSearch}
        />
      </div>
      <div>
        { createWay() }
      </div>
    </div>
  );
});
