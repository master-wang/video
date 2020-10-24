/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-04-09 18:33:34
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-09 18:43:33
 */
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
export default function (props) {
  const { onChange, entity: { startTime, endTime } } = props;
  const [time, setTime] = useState([]);
  const onChangeDate = (date) => {
    const dateList = [
      moment(date[0]).format('YYYY-MM-DD'),
      moment(date[1]).format('YYYY-MM-DD')
    ];
    setTime(dateList);
    onChange(dateList);
  };

  useEffect(() => {
    const dateList = startTime && endTime ? [
      moment(startTime).format('YYYY-MM-DD'),
      moment(endTime).format('YYYY-MM-DD')
    ] : [
      moment().format('YYYY-MM-DD'),
      moment().add(3, 'years').format('YYYY-MM-DD')
    ];
    setTime(dateList);
    onChange(dateList);
  }, [startTime, endTime]);
  return <RangePicker
    onChange={onChangeDate}
    value={[
      moment(time[0], 'YYYY-MM-DD'),
      moment(time[1], 'YYYY-MM-DD')
    ]}
  />;
}
