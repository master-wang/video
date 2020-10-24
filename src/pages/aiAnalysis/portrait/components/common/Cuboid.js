import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Radio } from 'antd';
import styles from './Cuboid.module.less';

const { Group, Button: RadioBtn } = Radio;

function Cuboid({ item, store }) {
  // isInZreo 判断是不是发型，是的话，单选框的值从0开始
  const { title, cuboidArr, type } = item;
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
        <Group onChange={onChange} value={value}>
          {
            cuboidArr.map((cubeItem, index) => {
              const { desc } = cubeItem;
              return (
                <RadioBtn value={type === 'hair' ? index : index + 1} key={index}>
                  {desc}
                </RadioBtn>
              );
            })
          }
        </Group>
      </div>
    </div>
  );
}

export default observer(Cuboid);
