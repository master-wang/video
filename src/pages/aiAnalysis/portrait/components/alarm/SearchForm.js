import React from 'react';
// import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Select, Input, Radio,
  DatePicker, message
} from 'antd';
import { useMount } from 'react-use';
import moment from 'moment';
import { SearchForm } from '@/components/PageLayout';
import { useCaptureWay } from '@/hooks';
import style from './index.module.less';

const { Option } = Select;
const { Group, Button: RaButton } = Radio;
const { RangePicker } = DatePicker;


export default Form.create()(observer(({
  form,
  store
}) => {
  const { createWay } = useCaptureWay({ store });
  const { taskData: { list = [] }, faceLib } = store;
  useMount(() => {
    store.getTreeData({ id: 0 }).then((data) => {
      store.update({ treeData: data });
    });
    store.getFacelib();
    store.getTasklist({ pageNum: 1, pageSize: 100 });
    const { setFieldsValue } = form;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(3, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    setFieldsValue({
      time: [startTime, endTime]
    });
  });
  // radio 的控制时间的改变
  const onChange = (e) => {
    const { value } = e.target;
    const days = value === 1 ? 0
      : value === 2 ? 2
        : 29;
    const { setFieldsValue } = form;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(days, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    setFieldsValue({
      time: [startTime, endTime]
    });
  };
  const rangeDataChange = (dateMoment, dateString) => {
    const start = Date.parse(new Date(dateString[0]));
    const end = Date.parse(new Date(dateString[1]));
    const count = (end - start) / 1000 / 3600 / 24;
    if (count > 30) {
      message.info('日期范围不能超过30天！');
      const { setFieldsValue } = form;
      const startTime = moment('00:00:00', 'HH:mm:ss').subtract(30, 'days');
      const endTime = moment('23:59:59', 'HH:mm:ss');
      setFieldsValue({
        time: [startTime, endTime]
      });
    }
  };

  const formItems = [
    {
      key: 'timeType',
      props: {
        label: '抓拍时间'
      },
      decorator: {
        initialValue: 2
      },
      component: <Group onChange={onChange}>
        <RaButton value={1}>近一天</RaButton>
        <RaButton value={2}>近三天</RaButton>
        <RaButton value={3}>近一月</RaButton>
      </Group>
    },
    {
      key: 'time',
      component: <RangePicker className={style['time-rangePicker']} onChange={rangeDataChange} />
    },
    {
      key: '_placeholder', // 占位使用
      component: <></>
    },
    {
      key: 'channel',
      props: {
        label: '布控通道'
      },
      component: createWay()
    },
    {
      key: '_placeholder1',
      component: <></>
    },
    {
      key: '_placeholder2',
      component: <></>
    },
    {
      key: 'taskName',
      props: {
        label: '布控任务'
      },
      component: <Select placeholder="选择应用状态">
        {
          list.map(({ taskId, taskName }) =>
            <Option key={taskId} value={taskName}>{taskName}</Option>)
        }
      </Select>
    },
    {
      key: 'facecdbName',
      props: {
        label: '布控人口库'
      },
      component: <Select placeholder="选择应用状态">
        {
          faceLib.map(({ facedbId, facebdName }) =>
            <Option key={facedbId} value={facebdName}>{facebdName}</Option>)
        }
      </Select>
    },
    {
      key: 'name',
      props: {
        label: '姓名'
      },
      component: <Input placeholder="请输入姓名" />
    }
  ];

  const dataToEnd = (value) => {
    const { time, channel } = value;
    const obj = {
      startTime: '',
      endTime: '',
      channel: []
    };
    if (time) {
      obj.startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      obj.endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
    }
    delete value.time;
    if (!channel) {
      delete obj.channel;
      return {
        ...value,
        ...obj
      };
    }
    const { length } = channel;
    if (!length || !channel[length - 1].includes('NODE')) {
      obj.channel = channel.join(',');
    } else {
      const arr = channel[0].split(',');
      arr.pop();
      obj.channel = arr.join(',');
    }
    return {
      ...value,
      ...obj
    };
  };

  const resetFun = ({ form: myForm, store: myStore }) => {
    const { setFieldsValue } = myForm;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(3, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    setFieldsValue({
      time: [startTime, endTime]
    });
    myStore.update({
      query: {
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss')
      }
    });
  };

  return (
    <SearchForm
      form={form}
      store={store}
      formItems={formItems}
      dataToEnd={dataToEnd}
      resetFun={resetFun}
    />
  );
}));
