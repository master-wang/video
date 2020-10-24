import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import Query from './query';
import Data from './data';
import Actionmodal from './Actionmodal';
import store from '../../stores/face';
import styles from './index.module.less';

export default observer(() => {
  useMount(() => {
    // 获取人口库列表
    store.getFacelibs();
  });

  return (
    <div className={styles['facePage-wap']}>
      <div className={styles['facePage-left']}>
        <Query store={store} />
      </div>
      <div className={styles['facePage-right']}>
        <Data store={store} />
      </div>
      <Actionmodal store={store} />
    </div>
  );
});
