import React from 'react';
import Index from './components/alarm';
import style from './index.module.less';


export default () => <div className={style['box-wrap']}>
  <h1 className={style['box-header']}>布控事件分析</h1>
  <Index />
</div>;
