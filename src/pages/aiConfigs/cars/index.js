import React from 'react';
import { Tabs } from 'antd';
import Garage from './components/garage';
import VehicleControl from './components/vehicleControl';
import style from './index.module.less';

const { TabPane } = Tabs;


export default () => <div className={style['car-box']}>
  <Tabs type="card" defaultActiveKey="garage">
    <TabPane key="garage" tab="车辆库管理">
      <Garage />
    </TabPane>
    <TabPane key="vehicleControl" tab="车辆布控">
      <VehicleControl />
    </TabPane>
  </Tabs>
</div>;
