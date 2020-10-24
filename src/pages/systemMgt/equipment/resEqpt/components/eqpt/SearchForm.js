import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { useSearchForm } from '@/hooks';
import LocTreeSelect from '@/components/TreeSelect/Location';

const { Search } = Input;

const SearchForm = observer(({
  form,
  store
}) => {
  const { onSearch, createForm } = useSearchForm({ form, store });

  const formItems = [
    {
      key: 'location',
      props: {
        label: '位置信息'
      },
      component: <LocTreeSelect allowClear onChange={onSearch} />
    },
    {
      key: 'ipOrName',
      component: <Search placeholder="请输入设备名称或IP" onSearch={onSearch} />
    }
  ];

  return createForm({ formItems });
});

export default Form.create()(SearchForm);
