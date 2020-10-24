import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { useSearchForm } from '@/hooks';

const { Search } = Input;

const SearchForm = observer(({
  form,
  store
}) => {
  const dataToEnd = useCallback(({ key, ...rest }) => ({
    ...rest,
    key
  }));
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });

  const formItems = [
    {
      key: 'key',
      component: <Search placeholder="输入关键字查询" onSearch={onSearch} />
    }
  ];
  return createForm({ formItems });
});

export default Form.create()(SearchForm);
