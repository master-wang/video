import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useRouter } from '@/hooks';
import Car from './components/car';
import Alarm from './components/alarm';
import styles from './index.module.less';

const { TabPane } = Tabs;

function ComplexQuery() {
  const { query, history } = useRouter();

  const onChange = useCallback((activeKey) => {
    history.replace(`/aiAnalysis/carRecognition?key=${activeKey}`);
  }, [history]);

  return (
    <div type="card" className={styles['p-complex-query']}>
      <Tabs type="card" defaultActiveKey={query.key || 'cars'} onChange={onChange}>
        <TabPane key="cars" tab="车辆识别">
          <Car />
        </TabPane>
        <TabPane key="alarm" tab="布控车辆告警">
          <Alarm />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ComplexQuery;
