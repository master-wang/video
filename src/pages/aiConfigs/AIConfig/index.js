/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 11:10:05
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-03-23 14:17:36
 */
import React from 'react';
import { Tabs } from 'antd';
// import { useRouter } from '@/hooks';
import Population from './components/population';
import PersonnelControl from './components/personnel-control';
import style from './index.module.less';

const { TabPane } = Tabs;

export default function () {
  return (
    <div className={style['ai-box']}>
      <Tabs type="card" defaultActiveKey="Population">
        <TabPane key="Population" tab="人口库管理">
          <Population />
        </TabPane>
        <TabPane key="PersonnelControl" tab="人员布控">
          <PersonnelControl />
        </TabPane>
      </Tabs>
    </div>
  );
}
