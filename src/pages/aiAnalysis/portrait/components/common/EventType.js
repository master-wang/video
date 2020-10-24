import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Radio, Icon } from 'antd';
import styles from './EventType.module.less';

const { Group } = Radio;

const events = [
  '全部',
  '区域入侵侦测',
  '越界侦测',
  '进入区域侦测',
  '离开区域侦测',
  '徘徊侦测',
  '虚焦侦测',
  '场景变更侦测',
  '人员聚集侦测',
  '快速移动侦测',
  '停车侦测',
  '物品遗留侦测',
  '物品拿取侦测'
];

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

function eventType({ item, store }) {
  const { title } = item;
  const { queryParams: { eventType: typeSelct } } = store;

  const [eventVal, setEventVal] = useState(0);
  const [limitConut, setLimitConut] = useState(8);
  const [iconClick, setIconClick] = useState(false);

  useEffect(
    () => {
      const { updateParams } = store;
      const { type } = item;
      const obj = {};
      obj[type] = eventVal;
      updateParams(obj);
    },
    [eventVal]
  );

  // 控制展开和收起的函数 初始展开8条单选框
  const expend = () => {
    setIconClick(!iconClick);
    setLimitConut(limitConut === events.length ? 8 : events.length);
  };

  return (
    <div className={styles['box-wrap']}>
      <span>{title}</span>
      <div>
        <Group onChange={(e) => setEventVal(e.target.value)} value={typeSelct || 0}>
          {
            events.map((val, i) => (
              i <= limitConut ? <Radio style={radioStyle} value={i} key={i}>
                {val}
              </Radio> : i === limitConut + 1 ? <span onClick={expend} key={i} className={styles['radio-expend']}>
                <Icon type="caret-right" rotate={iconClick ? -90 : 90} />
                {iconClick ? '收起' : '展开'}
              </span> : <span key={i}></span>
            ))
          }
        </Group>
      </div>
    </div>
  );
}

export default observer(eventType);
