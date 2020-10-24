import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useRouter } from '@/hooks';
import User from './components/user';
import Role from './components/role';
import style from './index.module.less';

const { TabPane } = Tabs;

export default function () {
  const { query, history } = useRouter();

  const onChange = useCallback((activeKey) => {
    history.replace(`/systemMgt/private?key=${activeKey}`);
  }, [history]);

  return (
    <div className={style['p-res-eqpt']}>
      <Tabs type="card" defaultActiveKey={query.key || 'user'} onChange={onChange}>
        <TabPane key="user" tab="用户管理">
          <User />
        </TabPane>
        <TabPane key="role" tab="角色管理">
          <Role />
        </TabPane>
      </Tabs>
    </div>
  );
}
