import React from 'react';
import { observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import ENUMS from '../../constants/enums';
import { useSearchForm } from '@/hooks';

const { Option } = Select;
const { Search } = Input;

const SearchForm = (observer(({
  form,
  store
}) => {
  const { onSearch, createForm } = useSearchForm({ form, store });
  const formItems = [
    {
      key: 'libType',
      props: {
        label: '车辆库类型'
      },
      component: <Select placeholder="请选择车辆库类型" onChange={onSearch}>
        {
          ENUMS.GARAGE_TYPE.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
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
