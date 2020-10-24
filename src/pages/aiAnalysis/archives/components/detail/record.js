import React from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import AddressUi from './AddressUi';
import OutRoutes from './OutRoutes';
import CatchInfo from './CatchInfo';
import traveStore from '../../store/detailTrave';
import styles from './index.module.less';

const { TabPane } = Tabs;

export default observer(({ store }) => {
  const { tabVal } = store;
  const onChange = (val) => {
    store.update({ tabVal: val });
  };
  return (
    <div className={styles['record-wrap']}>
      <Tabs type="card" activeKey={tabVal} onChange={onChange}>
        <TabPane key="capture" tab="抓拍信息">
          <CatchInfo store={store} />
        </TabPane>
        <TabPane key="travel" tab="出行规律分析">
          <OutRoutes store={traveStore} />
        </TabPane>
        <TabPane key="trail" tab="轨迹分析">
          <AddressUi store={store} />
        </TabPane>
      </Tabs>
    </div>
  );
});
