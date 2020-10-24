import React from 'react';
// import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Select, Input
} from 'antd';
import ENUMS from '../../constants/enums';
import { SearchForm } from '@/components/PageLayout';

const { Option } = Select;
const { Search } = Input;

export default Form.create()(observer(({
  form,
  store
}) => {
  const { garageList } = store;
  const formItems = [
    {
      key: 'cardbName',
      props: {
        label: '布控车辆库'
      },
      component: <Select placeholder="请选择布控车辆库">
        {
          garageList.map(({ cardbId, cardbName }) =>
            <Option key={cardbId} value={cardbName}>{cardbName}</Option>)
        }
      </Select>
    },
    {
      key: 'status',
      props: {
        label: '布控状态'
      },
      component: <Select placeholder="请选择布控状态">
        {
          ENUMS.CONTROL_STATE.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    },
    {
      key: 'key',
      props: {
        label: '关键字'
      },
      component: <Search placeholder="请输入关键字搜索" />
    }
  ];
  // useMount(() => {
  //   store.getAppTypeList();
  // });

  return (
    <SearchForm
      form={form}
      store={store}
      formItems={formItems}
    />
  );
}));
