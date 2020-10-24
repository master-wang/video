import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useRouter } from '@/hooks';
import Record from './components/record';
// import Backups from './components/backups';
import style from './index.module.less';

const { TabPane } = Tabs;

export default function () {
  const { query, history } = useRouter();

  const onChange = useCallback((activeKey) => {
    history.replace(`/systemMgt/maintain?key=${activeKey}`);
  }, [history]);

  return (
    <div className={style['p-res-eqpt']}>
      <Tabs type="card" defaultActiveKey={query.key || 'record'} onChange={onChange}>
        <TabPane key="record" tab="系统操作日志">
          <Record />
        </TabPane>
        {/* <TabPane key="backups" tab="系统备份还原">
          <Backups />
        </TabPane> */}
      </Tabs>
    </div>
  );
}
