import React from 'react';
import Routes from '@/routes';
import Header from './Header';
import style from './index.module.less';

function BasicLayout({
  routes
}) {
  return (
    <div className={style['basic-layout']}>
      <Header />
      <div className="g-mn">
        <Routes routes={routes} />
      </div>
    </div>
  );
}

export default BasicLayout;
