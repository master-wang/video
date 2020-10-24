import React from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import RealTime from './components/dataInfo/realTime';
import Recored from './components/dataInfo/recored';
import styles from './index.module.less';

const { TabPane } = Tabs;

export default observer(({ store }) => (
  <div className={styles['data-wrap']}>
    <Tabs type="card">
      <TabPane key="realTime" tab="服务器实时巡检">
        <RealTime store={store} />
      </TabPane>
      <TabPane key="record" tab="告警历史记录">
        <Recored store={store} />
      </TabPane>
    </Tabs>
  </div>
));
