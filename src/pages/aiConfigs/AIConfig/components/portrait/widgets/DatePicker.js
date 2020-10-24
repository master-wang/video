/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-04-09 18:33:34
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 11:11:56
 */
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

export default function (props) {
  const { onChange, birthDay } = props;
  const [time, setTime] = useState();
  const onChangeDate = (date) => {
    const dateValue = moment(date).format('YYYY-MM-DD');
    setTime(dateValue);
    onChange(dateValue);
  };

  useEffect(() => {
    const date = moment(birthDay).format('YYYY-MM-DD');
    setTime(date);
    onChange(date);
  }, [birthDay]);
  return <DatePicker
    onChange={onChangeDate}
    value={moment(time, 'YYYY-MM-DD')}
  />;
}
