import React from 'react';
import Index from './components';
import styles from './index.module.less';

function rltmVideo() {
  return (
    <div className={styles['box-wrap']}>
      <h1 className={styles['box-header']}>智能巡检任务</h1>
      <Index />
    </div>
  );
}

export default rltmVideo;
