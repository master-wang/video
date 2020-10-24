import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Select } from 'antd';
import { useSearchForm } from '@/hooks';

const { Search } = Input;
const { Option } = Select;

const SearchForm = observer(({
  form,
  store
}) => {
  const { onSearch, createForm } = useSearchForm({ form, store });

  const formItems = [
    {
      key: 'keyWord',
      props: {
        label: '关键字'
      },
      component: <Search placeholder="输入关键字搜索" onSearch={onSearch} />
    },
    {
      key: 'status',
      props: {
        label: '用户状态'
      },
      component: <Select allowClear onChange={onSearch}>
        <Option value="ACTIVE">有效</Option>
        <Option value="UNACTIVE">冻结</Option>
      </Select>
    }
  ];

  return createForm({ formItems });
});

export default Form.create()(SearchForm);
