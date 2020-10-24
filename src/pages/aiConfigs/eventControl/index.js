import React from 'react';
import Index from './components/alarm';
import style from './index.module.less';


export default () => <div className={style['box-wrap']}>
  <h1 className={style['box-header']}>事件布控</h1>
  <Index />
</div>;
