import React from 'react';
import { inject, observer } from 'mobx-react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Routes from '@/routes';

const App = inject('app')(observer(({
  app: {
    routeArr
  }
}) => (
  <ConfigProvider locale={zhCN}>
    <Routes routes={routeArr} />
  </ConfigProvider>
)));

export default App;
