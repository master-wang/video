import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
import OneFrame from './OneFrame';

function VideoCon() {
  return (
    <div className={styles['con-wrap']}>
      <OneFrame />
    </div>
  );
}

export default observer(VideoCon);
