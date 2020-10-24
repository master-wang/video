import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, DatePicker } from 'antd';
import { useSearchForm } from '@/hooks';

const { RangePicker } = DatePicker;

const SearchForm = observer(({
  form,
  store
}) => {
  const dataToEnd = useCallback((params) => {
    const { time } = params;
    const getData = {
      startTime: '',
      endTime: ''
    };
    if (time && time.length) {
      const startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      const endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
      getData.startTime = startTime;
      getData.endTime = endTime;
    } else {
      delete getData.startTime;
      delete getData.endTime;
      const { query } = store;
      const newQuery = JSON.parse(JSON.stringify(query));
      delete newQuery.startTime;
      delete newQuery.endTime;
      store.update({
        query: newQuery
      });
    }

    const query = {
      ...params,
      ...getData
    };
    delete query.time;
    return query;
  });
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });

  const formItems = [
    {
      key: 'time',
      component: <RangePicker onChange={onSearch} />
    }
  ];

  return createForm({ formItems });
});

export default Form.create()(SearchForm);
