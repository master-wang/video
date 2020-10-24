import React from 'react';
import Info from './info';
import store from './stores';
import styles from './index.module.less';

function inspection() {
  return (
    <div className={styles.warp}>
      <Info store={store} />
    </div>
  );
}

export default inspection;
