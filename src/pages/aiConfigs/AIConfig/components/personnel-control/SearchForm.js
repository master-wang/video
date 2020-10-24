/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:55:03
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-02 10:36:45
 */
import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import { useMount } from 'react-use';
import { useSearchForm } from '@/hooks';

const { Option } = Select;
const { Search } = Input;

const SearchForm = inject('enums')(observer(({
  form,
  store
}) => {
  useMount(() => {
    store.queryPaging();
  });
  const dataToEnd = useCallback(({ ...rest }) => ({ ...rest }));
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });
  const formItems = [
    {
      key: 'libName',
      props: {
        label: '布控状态'
      },
      component: <Select placeholder="请选择布控状态" onSearch={onSearch}>
        <Option value="one">1</Option>
        <Option value="two">2</Option>
      </Select>
    },
    {
      key: 'key',
      component: <Search placeholder="请输入关键字搜索" onSearch={onSearch} />
    }
  ];
  return createForm({ formItems });
}));

export default Form.create()(SearchForm);
