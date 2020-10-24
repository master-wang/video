import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Select } from 'antd';
import styles from './ColorSelect.module.less';

import { colors } from '../../constants/index';

const { Option } = Select;


function ColorSelect({ item, store }) {
  const { title, colorSelectArr, fieldArr } = item;
  const values = _.at(store.queryParams, fieldArr);
  // sellect 变化时
  const selectChange = (val, index) => {
    const { updateParams } = store;
    const type = fieldArr[index];
    const obj = {};
    obj[type] = val;
    updateParams(obj);
  };

  return (
    <div className={styles['ColorSelect-wrap']}>
      <span>{title}</span>
      <div>
        {
          colorSelectArr.map(({ desc }, index) => (<div key={index} className={styles['color-select-item']}>
            {desc}
            :
            <span>
              <Select
                style={{ width: 170, height: 20, marginLeft: 10 }}
                dropdownClassName={styles['color-select-menu']}
                onSelect={(value) => selectChange(value, index)}
                value={values[index] || []}
                placeholder="请选择颜色"
              >
                {colors.map(({ desc: colorDesc, color }, i) => (
                  <Option key={i} value={i}>
                    <span className={styles['color-cube']} style={{ backgroundColor: color }} />
                    {colorDesc}
                  </Option>
                ))}
              </Select>
            </span>
          </div>))
        }
      </div>
    </div>
  );
}

export default observer(ColorSelect);
