import React from 'react';
import { observer } from 'mobx-react';
import {
  Form, Input, DatePicker
} from 'antd';
import { useSearchForm } from '@/hooks';

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchForm = (observer(({
  form,
  store
}) => {
  const dataToEnd = (params) => {
    const { time } = params;
    const getData = {
      startTime: '',
      endTime: ''
    };
    if (time || time.length) {
      const startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      const endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
      getData.startTime = startTime;
      getData.endTime = endTime;
    }

    const query = {
      ...params,
      ...getData
    };
    delete query.time;
    return query;
  };

  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });

  const formItems = [
    {
      key: 'key',
      component: <Search placeholder="请输入关键字搜索" onSearch={onSearch} />
    },
    {
      key: 'time',
      component: <RangePicker onChange={onSearch} />
    }
  ];
  return createForm({ formItems });
}));

export default Form.create()(SearchForm);
