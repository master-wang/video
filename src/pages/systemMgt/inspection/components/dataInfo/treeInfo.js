/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useMount, useUnmount } from 'react-use';
import { Input, List } from 'antd';
import SvgIcon from '@/components/Icon/Svg';
import styles from './index.module.less';
import useInterval from '@/hooks/useInterval';

const { Search } = Input;

export default observer(({ store }) => {
  const [selectItem, setSelectItem] = useState(null);
  useMount(() => {
    // 获取通道信息
    store.getTreeData();
    store.queryUnits();
    store.update({ selectTreeId: '' });
  });

  const onSearch = (val) => {
    store.getTreeData({ deviceName: val });
    store.update({ device: null, DeviceInfo: {} });
    setSelectItem(null);
  };

  const { treeData } = store;
  const selectServer = useCallback((item) => {
    setSelectItem(item.deviceip);
    store.update({ device: item });
    store.getDeviceInfo({ deviceIp: item.deviceip });
  });
  // 循环请求
  const [con, setCon] = useState(1000);
  const rotateFun = () => {
    store.getDeviceInfo({ deviceIp: store.device.deviceip });
  };
  useInterval(() => {
    rotateFun();
  }, con);

  useEffect(() => {
    if (!store.device) {
      setCon(null);
    } else {
      setCon(2000);
    }
  }, [store.device, con]);
  useUnmount(() => {
    setCon(null);
  });
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
      <div className={styles['server-wrap']}>
        {
          treeData.length ? treeData.slice().map((item, index) => <div
            key={index}
            className={selectItem === item.deviceip ? styles['server-item-select'] : styles['server-item']}
            onClick={() => selectServer(item)}
          >
            <span className={styles['item-svg']}><SvgIcon name="server" /></span>
            <span className={styles['item-name']}>{item.deviceName}</span>
            <span className={!item.monitorStatus ? styles['item-badge-default'] : styles['item-badge']}></span>
          </div>)
            : <List dataSource={[]} />
        }
      </div>
    </div>
  );
});
