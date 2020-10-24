import React from 'react';
import Routes from '@/routes';
import styles from './index.module.less';

function BasicLayout({
  routes
}) {
  return (
    <div className={styles['user-layout']}>
      <div className={styles['user-container']}>
        <div className={styles['user-login-bg']}>
          <div className={styles['user-login-text-welcome']}>欢迎！</div>
          <div className={styles['user-login-text-content']}>
              智能管控平台。
          </div>
        </div>
        <div className={styles['user-container-bg']}>
          <Routes routes={routes} />
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
