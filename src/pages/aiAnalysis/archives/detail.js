import React, { useMemo } from 'react';
// import { Row, Col } from 'antd';
import store from './store/detail';
import Info from './components/detail/info';
import Record from './components/detail/record';
import Bread from '@/layouts/BasicLayout/Bread';

function archives() {
  const breadItems = useMemo(() => [
    { id: 1, name: '一人一档', path: '/aiAnalysis/archives' },
    { id: 2, name: '抓拍信息' }
  ]);
  return (
    <div>
      <Bread items={breadItems} />
      <Info store={store} />
      <Record store={store} />
    </div>
  );
}

export default archives;
