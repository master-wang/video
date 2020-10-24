import React from 'react';
import Query from './query';
import Data from './data';
import styles from './index.module.less';

function facePage() {
  return (
    <div className={styles['facePage-wap']}>
      <div className={styles['facePage-left']}>
        <Query />
      </div>
      <div className={styles['facePage-right']}>
        <Data />
      </div>
    </div>
  );
}

export default facePage;
