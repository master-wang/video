import React, { useCallback } from 'react';
import { Row, Col, TimePicker } from 'antd';
import moment from 'moment';
import style from './TimeRange.module.less';

const TimePickerRange = ({
  onChange,
  value = {},
  disabled,
  ref
}) => {
  const [startTime, setStartTime] = React.useState(value.start || moment('00:00:00', 'HH:mm:ss'));
  const [endTime, setEndTime] = React.useState(value.end || moment('23:59:59', 'HH:mm:ss'));

  /* 定义时间数组 */
  const Hours = Array.from(Array(24), (v, k) => k);
  const Minutes = Array.from(Array(60), (v, k) => k);
  const Seconds = Array.from(Array(60), (v, k) => k);

  const triggerChange = useCallback(changedValue => {
    if (onChange) {
      onChange(
        { start: startTime, end: endTime, ...changedValue }
      );
    }
  }, [startTime, endTime]);

  /* 结束时间控制-hour */
  const disEndHouse = () => {
    if (startTime) {
      const h = startTime.hour();
      return Hours.slice(0, h);
    }
    return [];
  };

  /* 结束时间控制-minute） */
  const disEndMinute = h => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      const m = startTime.minute();
      return Minutes.slice(0, m);
    }
    return [];
  };

  /* 结束时间控制-second */
  const disEndSeconds = (h, m) => {
    if (startTime) {
      if (h > startTime.hour()) return [];
      if (m > startTime.minute()) return [];
      const s = startTime.second();
      return Seconds.slice(0, s);
    }
    return [];
  };

  /* 开始时间控制-hour */
  const disStartHouse = () => {
    if (endTime) {
      const h = endTime.hour();
      return Hours.slice(h + 1, Hours.length);
    }
    return [];
  };

  /* 开始时间控制-minute */
  const disStartMinute = h => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      const m = endTime.minute();
      return Minutes.slice(m + 1, Minutes.length);
    }
    return [];
  };

  /* 开始时间控制-second */
  const disStartSeconds = (h, m) => {
    if (endTime) {
      if (h < endTime.hour()) return [];
      if (m < endTime.minute()) return [];
      const s = endTime.second();
      return Seconds.slice(s, Seconds.length);
    }
    return [];
  };
  const startChange = (val) => {
    setStartTime(val);
    triggerChange({ start: val });
  };
  const endChange = (val) => {
    setEndTime(val);
    triggerChange({ end: val });
  };

  return (
    <Row ref={ref} className={style['renge-wrap']}>
      <Col span={10} className={style['first-time']}>
        <TimePicker
          allowClear={false}
          disabled={disabled}
          onChange={startChange}
          defaultValue={value.start || moment('00:00:00', 'HH:mm:ss')}
          disabledHours={disStartHouse}
          disabledMinutes={disStartMinute}
          disabledSeconds={disStartSeconds}
        />
      </Col>
      <Col span={2} className={style['middle-section']}>~</Col>
      <Col span={6} className={style['se-time']}>
        <TimePicker
          allowClear={false}
          disabled={disabled}
          onChange={endChange}
          defaultValue={value.end || moment('23:59:59', 'HH:mm:ss')}
          disabledHours={disEndHouse}
          disabledMinutes={disEndMinute}
          disabledSeconds={disEndSeconds}
        />
      </Col>
    </Row>
  );
};

export default TimePickerRange;
