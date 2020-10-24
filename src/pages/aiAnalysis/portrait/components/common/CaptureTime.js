import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Radio, DatePicker, message } from 'antd';

import styles from './CaptureTime.module.less';

const { Group, Button: RadioBtn } = Radio;

function captureTime({ item, store }) {
  const { title } = item;
  const {
    ctDay,
    queryParams: {
      startTime = null,
      endTime = null
    }
  } = store;
  const [dataTime, setDataTime] = useState([moment('00:00:00', 'HH:mm:ss').subtract(3, 'days'), moment('23:59:59', 'HH:mm:ss')]);

  useEffect(() => {
    const { updateParams } = store;
    updateParams({
      startTime: dataTime[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: dataTime[1].format('YYYY-MM-DD HH:mm:ss')
    });
  }, [dataTime]);

  useEffect(() => {
    if (ctDay === null) {
      return;
    }
    setDataTime([
      moment('00:00:00', 'HH:mm:ss').subtract(ctDay, 'days'),
      moment('23:59:59', 'HH:mm:ss')
    ]);
  }, [ctDay]);

  const startTimeOnchange = (time, timeString) => {
    store.update({ ctDay: null });
    const { updateParams } = store;
    const nowTime = Date.parse(new Date(timeString));
    const preEndTime = Date.parse(new Date(endTime));
    const m1 = moment(timeString);
    const m2 = moment(endTime);
    const day = m2.diff(m1, 'day');
    if (day > 30 || day < -30) {
      message.error('选择的时间范围不能超过30天!');
      updateParams({ startTime, endTime });
      return;
    }
    if (nowTime > preEndTime) {
      updateParams({ startTime: endTime, endTime: timeString });
    } else {
      updateParams({ startTime: timeString });
    }
  };

  const endTimeOnchange = (time, timeString) => {
    store.update({ ctDay: null });
    const { updateParams } = store;
    const nowTime = Date.parse(new Date(timeString));
    const preStartTime = Date.parse(new Date(startTime));
    const m1 = moment(timeString);
    const m2 = moment(startTime);
    const day = m2.diff(m1, 'day');
    if (day > 30 || day < -30) {
      message.error('选择的时间范围不能超过30天!');
      updateParams({ startTime, endTime });
      return;
    }
    if (nowTime < preStartTime) {
      updateParams({ startTime: timeString, endTime: startTime });
    } else {
      updateParams({ endTime: timeString });
    }
  };

  const nearTime = (e) => {
    const days = e.target.value;
    store.update({ ctDay: days });
  };

  return (
    <div className={styles['wrap-main']}>
      <span>{title}</span>
      <div className={styles['cap-item']}>
        <Group value={ctDay} onChange={nearTime}>
          <RadioBtn value={0}>今天</RadioBtn>
          <RadioBtn value={3}>近3天</RadioBtn>
          <RadioBtn value={7}>近一周</RadioBtn>
        </Group>
      </div>
      <div className={styles['cap-item']}>
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          allowClear={false}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          onChange={startTimeOnchange}
          value={startTime ? moment(startTime) : null}
          placeholder="请选择开始时间"
        />
        <br />
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          allowClear={false}
          onChange={endTimeOnchange}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          value={endTime ? moment(endTime) : null}
          placeholder="请选择结束时间"
        />
      </div>
    </div>
  );
}

export default observer(captureTime);
