import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Radio } from 'antd';
import styles from './Cube.module.less';

const { Group, Button: RadioBtn } = Radio;

function Cube({ item, store }) {
  const { title, cubeArr, type } = item;
  const value = _.at(store.queryParams, type)[0];

  const onChange = (e) => {
    const { updateParams } = store;
    const obj = {};
    obj[type] = e.target.value;
    updateParams(obj);
  };

  return (
    <div className={styles['cube-wrap']}>
      <span>{title}</span>
      <div>
        <Group onChange={onChange} value={value || 0}>
          {
            cubeArr.map((cubeItem, index) => {
              const { icon, desc } = cubeItem;
              return (
                <RadioBtn value={index + 1} key={index}>
                  <div><span className={`iconfont ${icon}`}></span></div>
                  <div className={styles['cube-desc']}>{desc}</div>
                </RadioBtn>
              );
            })
          }
        </Group>
      </div>
    </div>
  );
}

export default observer(Cube);
