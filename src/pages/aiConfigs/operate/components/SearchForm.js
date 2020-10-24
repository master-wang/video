import React from 'react';
// import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, DatePicker, Input
} from 'antd';
import moment from 'moment';
import { SearchForm } from '@/components/PageLayout';

const { RangePicker } = DatePicker;
const { Search } = Input;

export default Form.create()(observer(({
  form,
  store
}) => {
  const dataToEnd = (value) => {
    const { time } = value;
    const obj = {
      startTime: '',
      endTime: ''
    };
    if (time) {
      obj.startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      obj.endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
    }
    delete value.time;
    return {
      ...value,
      ...obj
    };
  };
  const formItems = [
    {
      key: 'key',
      props: {
        label: '关键字'
      },
      component: <Search placeholder="请输入关键字搜索" />
    },
    {
      key: 'time',
      props: {
        label: '选择时间范围'
      },
      component: <RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')]
        }}
        // onChange={onChange}
      />
    }
  ];
  // useMount(() => {
  //   store.getAppTypeList();
  // });

  return (
    <SearchForm
      form={form}
      store={store}
      formItems={formItems}
      dataToEnd={dataToEnd}
      showExtend={false}
    />
  );
}));
