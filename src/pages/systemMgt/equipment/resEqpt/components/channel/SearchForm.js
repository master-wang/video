import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { useSearchForm } from '@/hooks';

const { Search } = Input;

const SearchForm = observer(({
  form,
  store
}) => {
  const { onSearch, createForm } = useSearchForm({ form, store });

  const formItems = [
    {
      key: 'channelName',
      component: <Search placeholder="搜索通道名称" onSearch={onSearch} />
    }
  ];

  return createForm({
    formProps: {
      style: { marginTop: '28px' }
    },
    formItems
  });
});

export default Form.create()(SearchForm);
