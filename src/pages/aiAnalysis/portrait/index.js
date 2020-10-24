import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useRouter } from '@/hooks';
import Record from './components/record';
import Face from './components/face';
import Alarm from './components/alarm';
import styles from './index.module.less';

const { TabPane } = Tabs;

function ComplexQuery() {
  const { query, history } = useRouter();

  const onChange = useCallback((activeKey) => {
    history.replace(`/aiAnalysis/portrait?key=${activeKey}`);
  }, [history]);

  return (
    <div type="card" className={styles['p-complex-query']}>
      <Tabs type="card" defaultActiveKey={query.key || 'record'} onChange={onChange}>
        <TabPane key="record" tab="抓拍记录">
          <Record />
        </TabPane>
        <TabPane key="face" tab="人脸对比">
          <Face />
        </TabPane>
        <TabPane key="alarm" tab="布控告警">
          <Alarm />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ComplexQuery;
