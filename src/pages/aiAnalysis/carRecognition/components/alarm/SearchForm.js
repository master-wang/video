import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Select, Input, Radio,
  DatePicker
} from 'antd';
import moment from 'moment';
// import _ from 'lodash';
import ENUMS from '../../constants/enums';
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
  const { createWay, getChannelList } = useCaptureWay({ store });
  const { taskList: { list = [] }, carLib } = store;
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
      key: 'radioTime',
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
      component: <Select placeholder="选择布控任务">
        {
          list.map(({ taskId, taskName }) =>
            <Option key={taskId} value={taskName}>{taskName}</Option>)
        }
      </Select>
    },
    {
      key: 'cardbName',
      props: {
        label: '布控车辆库'
      },
      component: <Select placeholder="选择布控车辆库">
        {
          carLib.map(({ cardbId, cardbName }) =>
            <Option key={cardbId} value={cardbName}>{cardbName}</Option>)
        }
      </Select>
    },
    {
      key: 'carNum',
      props: {
        label: '车牌号码'
      },
      component: <Input placeholder="请输入车牌号码" />
    },
    {
      key: 'checkStatus',
      props: {
        label: '审核状态'
      },
      component: <Select placeholder="选择审核状态">
        {
          ENUMS.APPROL_STATE.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    },
    {
      key: 'isLicense',
      props: {
        label: '是否套牌车'
      },
      component: <Select placeholder="选择是否套牌车">
        {
          ENUMS.COPY_CAR.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    }
  ];
  useMount(() => {
    // 获取通道信息
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
    store.getTask({ pageNum: 1, pageSize: 100 });
    store.getCarLib();
    const { setFieldsValue } = form;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(2, 'days');
    const endTime = moment('23:59:59', 'HH:mm:ss');
    setFieldsValue({
      time: [startTime, endTime]
    });
  });
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
    obj.channel = getChannelList(channel).join(',');
    return {
      ...value,
      ...obj
    };
  };

  const resetFun = ({ form: myForm, store: myStore }) => {
    const { setFieldsValue } = myForm;
    const startTime = moment('00:00:00', 'HH:mm:ss').subtract(2, 'days');
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
