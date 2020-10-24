import React, { useCallback, useState } from 'react';
import {
  Collapse, Icon, Button, Form,
  Radio, DatePicker,
  Input, Select, message
} from 'antd';
import moment from 'moment';
import { observer } from 'mobx-react';
import { useCaptureWay } from '@/hooks';
import { genItems } from '@/utils/form';
import ENUMS from '../../constants/enums';
import styles from './index.module.less';

const { Panel } = Collapse;
const { Group, Button: RaButton } = Radio;
const { Option } = Select;

export default Form.create()(observer(({ store, form }) => {
  const { createWay, getChannelList } = useCaptureWay({ store });
  const [dataTime, setDataTime] = useState([moment('00:00:00', 'HH:mm:ss').subtract(2, 'days'), moment('23:59:59', 'HH:mm:ss')]);
  // 重置
  const reSet = useCallback(() => {
    form.resetFields();
    store.reset(['query', 'pagination']);
    store.queryPaging({
      query: {
        dbType: '1',
        startTime: moment('00:00:00', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment('23:59:59', 'HH:mm:ss').add(2, 'days').format('YYYY-MM-DD HH:mm:ss')
      }
    });
  }, [form, store]);

  // 查询
  const onSeach = useCallback(() => {
    const params = form.getFieldsValue();
    const { startTime, endTime, channelId } = params;
    const obj = {
      startTime: '',
      endTime: '',
      channelId: []
    };
    obj.startTime = startTime.format('YYYY-MM-DD HH:mm:ss');
    obj.endTime = endTime.format('YYYY-MM-DD HH:mm:ss');
    if (!channelId || !channelId.length) {
      delete obj.channelId;
      delete params.channelId;
    } else {
      obj.channelId = getChannelList(channelId);
    }
    const values = {
      ...params,
      ...obj,
      dbType: '1',
      pageInfo: {
        pageNumber: 1,
        pageSize: store.pagination.pageSize,
        total: null
      }
    };
    store.queryPaging({
      query: values,
      pagination: { current: 1 }
    });
  }, [store]);

  // radio 的控制时间的改变
  const onChange = (e) => {
    const days = e.target.value;
    const { setFieldsValue } = form;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(days, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    setFieldsValue({
      startTime, endTime
    });
  };

  const startTimeOnchange = (time, timeString) => {
    const endTime = dataTime[1];
    const nowTime = Date.parse(new Date(timeString));
    const preEndTime = Date.parse(new Date(endTime.format('YYYY-MM-DD HH:mm:ss')));
    const m1 = moment(timeString);
    const m2 = moment(endTime);
    const day = m2.diff(m1, 'day');
    if (day > 30 || day < -30) {
      message.error('选择的时间范围不能超过30天!');
      setDataTime(dataTime);
      return;
    }
    if (nowTime > preEndTime) {
      setDataTime([endTime, time]);
    } else {
      setDataTime([time, endTime]);
    }
  };

  const endTimeOnchange = (time, timeString) => {
    const startTime = dataTime[0];
    const nowTime = Date.parse(new Date(timeString));
    const preStartTime = Date.parse(new Date(startTime.format('YYYY-MM-DD HH:mm:ss')));
    const m1 = moment(timeString);
    const m2 = moment(startTime);
    const day = m2.diff(m1, 'day');
    if (day > 30 || day < -30) {
      message.error('选择的时间范围不能超过30天!');
      setDataTime(dataTime);
      return;
    }
    if (nowTime < preStartTime) {
      setDataTime([time, startTime]);
    } else {
      setDataTime([startTime, time]);
    }
  };

  const queryFormItems = [
    {
      key: 'title1',
      component: <span>快速查询</span>
    },
    {
      key: 'radioTime',
      decorator: {
        initialValue: 2
      },
      component: <Group onChange={onChange}>
        <RaButton value={0}>当天</RaButton>
        <RaButton value={2}>近三天</RaButton>
        <RaButton value={6}>近一周</RaButton>
      </Group>
    },
    {
      key: 'startTime',
      decorator: {
        initialValue: dataTime[0]
      },
      component: <DatePicker format="YYYY-MM-DD HH:mm:ss" onChange={startTimeOnchange} />
    },
    {
      key: 'endTime',
      decorator: {
        initialValue: dataTime[1]
      },
      component: <DatePicker format="YYYY-MM-DD HH:mm:ss" onChange={endTimeOnchange} />
    },
    {
      key: 'title2',
      component: <span>抓拍通道</span>
    },
    {
      key: 'channelId',
      component: createWay({ style: { width: 213 } })
    }
  ];

  const carFormItems = [
    {
      key: 'numberTitle',
      component: <span>车牌号</span>
    },
    {
      key: 'cardNumber',
      component: <Input placeholder="请输入车牌号" />
    },
    {
      key: 'typeTitle',
      component: <span>车辆类型</span>
    },
    {
      key: 'carType',
      component: <Select placeholder="请选择车辆类型">
        {
        ENUMS.CAR_TYPE.array.map(({ key, name }) =>
          <Option key={key} value={key}>{name}</Option>)
      }
      </Select>
    },
    {
      key: 'colorTitle',
      component: <span>车身颜色</span>
    },
    {
      key: 'colour',
      component: <Select
        placeholder="请选择车身颜色"
        dropdownClassName={styles['color-select-menu']}
      >
        {
          ENUMS.CAR_COLOR.array.map(({ key, name, color }) =>
            <Option key={key} value={key}>
              <span className={styles['color-cube']} style={{ backgroundColor: color }} />
              {name}
            </Option>)
        }
      </Select>
    }
  ];

  return (
    <div className={styles['indexLeft-wrap']}>
      <Form>
        <div className={styles['indexLeft-top']}>
          <Collapse
            defaultActiveKey="query"
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
          >
            <Panel header="查询条件" key="query">
              {genItems(queryFormItems, form)}
            </Panel>
            <Panel header="车辆特征" key="car">
              {genItems(carFormItems, form)}
            </Panel>
          </Collapse>
        </div>
        <div className={styles['indexLeft-botom']}>
          <Button onClick={reSet}>重置</Button>
          <Button onClick={onSeach}>查询</Button>
        </div>
      </Form>
    </div>
  );
}));
