import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { useSearchForm } from '@/hooks';

const { Search } = Input;

const SearchForm = observer(({
  form,
  store
}) => {
  const dataToEnd = useCallback(({ _nodeName, ...rest }) => ({
    ...rest,
    nodeName: _nodeName
  }));
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });

  const formItems = [
    {
      key: '_nodeName',
      component: <Search placeholder="搜索节点名称" onSearch={onSearch} />
    }
  ];
  return createForm({ formItems });
});

export default Form.create()(SearchForm);
