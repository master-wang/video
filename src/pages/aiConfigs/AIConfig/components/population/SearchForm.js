/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:55:03
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-01 10:53:31
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import { useSearchForm } from '@/hooks';

const { Option } = Select;
const { Search } = Input;

const SearchForm = inject('enums')(observer(({
  enums,
  form,
  store
}) => {
  const { POPULATION_TYPE: { array: POPULATION_TYPE } } = enums;
  const { onSearch, createForm } = useSearchForm({ form, store });
  const formItems = [
    {
      key: 'libType',
      props: {
        label: '人口类型'
      },
      component: <Select placeholder="请选择人口类型" onChange={onSearch}>
        {
          POPULATION_TYPE.map(item => <Option value={item.id}>{item.name}</Option>)
        }
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
