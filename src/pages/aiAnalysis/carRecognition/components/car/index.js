import React from 'react';
import { useMount } from 'react-use';
import Query from './query';
import Data from './data';
import store from '../../stores/car';
import styles from './index.module.less';

function facePage() {
  useMount(() => {
    // 获取通道信息
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
  });

  return (
    <div className={styles['facePage-wap']}>
      <div className={styles['facePage-left']}>
        <Query store={store} />
      </div>
      <div className={styles['facePage-right']}>
        <Data store={store} />
      </div>
    </div>
  );
}

export default facePage;
