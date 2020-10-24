/* eslint-disable no-self-compare */
import React, { forwardRef } from 'react';
import {
  Input, Select
} from 'antd';

const { Option } = Select;

// eslint-disable-next-line no-unused-vars
export default forwardRef(((props, ref) => {
  const { value, onChange } = props;

  const leftChange = (val) => {
    if (Number(val) !== Number(val)) {
      return;
    }
    const newVals = [...value];
    if (val > newVals[1]) {
      // eslint-disable-next-line prefer-destructuring
      newVals[0] = newVals[1];
      newVals[1] = val;
    } else {
      newVals[0] = val;
    }
    onChange(newVals);
  };
  const rigChange = (val) => {
    if (Number(val) !== Number(val)) {
      return;
    }
    const newVals = [...value];
    if (val < newVals[0]) {
      // eslint-disable-next-line prefer-destructuring
      newVals[1] = newVals[0];
      newVals[0] = val;
    } else {
      newVals[1] = val;
    }
    onChange(newVals);
  };
  const arr = Array.from(Array(100), (v, k) => k);

  return (
    <Input.Group compact>
      <Select
        onChange={leftChange}
        value={value[0]}
        style={{ width: '70px' }}
      >
        {arr.map((i) => <Option key={i} value={i}>
          {i}
          岁
        </Option>)}
      </Select>
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
          background: 'rgb(26, 35, 71)',
          zIndex: 1
        }}
        placeholder="~"
        disabled
      />
      <Select
        onChange={rigChange}
        value={value[1]}
        style={{ width: '70px' }}
      >
        {arr.map((i) => <Option key={i} value={i}>
          {i}
          岁
        </Option>)}
      </Select>
    </Input.Group>
  );
}));
