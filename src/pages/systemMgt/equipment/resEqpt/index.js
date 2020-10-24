import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useRouter } from '@/hooks';
import Node from './components/node';
import Eqpt from './components/eqpt';
import LocInfo from '../locInfo';
import style from './index.module.less';

const { TabPane } = Tabs;

export default function () {
  const { query, history } = useRouter();

  const onChange = useCallback((activeKey) => {
    history.replace(`/systemMgt/resEqpt?key=${activeKey}`);
  }, [history]);

  return (
    <div className={style['p-res-eqpt']}>
      <Tabs type="card" defaultActiveKey={query.key || 'node'} onChange={onChange}>
        <TabPane key="node" tab="服务节点管理">
          <Node />
        </TabPane>
        <TabPane key="eqpt" tab="视频设备管理">
          <Eqpt />
        </TabPane>
        <TabPane key="locInfo" tab="通道信息配置">
          <LocInfo />
        </TabPane>
      </Tabs>
    </div>
  );
}
