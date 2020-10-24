import React from 'react';
// import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Radio
} from 'antd';
import { SearchForm } from '@/components/PageLayout';
import { SelectRange } from '@/hooks';
import SmartSearch from './smartSearch';

const { Group, Button: RaButton } = Radio;

export default Form.create()(observer(({
  form,
  store
}) => {
  const formItems = [
    {
      key: '_smart',
      props: {
        label: '智能搜索'
      },
      component: <SmartSearch store={store} />
    },
    {
      key: 'male',
      props: {
        label: '性别'
      },
      component: <Group>
        {/* <RaButton value={0}>全部</RaButton> */}
        <RaButton value={1}>男</RaButton>
        <RaButton value={2}>女</RaButton>
      </Group>
    },
    {
      key: 'age',
      props: {
        label: '年龄'
      },
      decorator: {
        initialValue: [18, 35]
      },
      component: <SelectRange />
    },
    {
      key: 'keys',
      props: {
        label: '实名'
      },
      component: <Group>
        <RaButton value={1}>全部</RaButton>
        <RaButton value={2}>实名</RaButton>
        <RaButton value={3}>未实名</RaButton>
      </Group>
    }
  ];
  // useMount(() => {
  //   store.getAppTypeList();
  // });

  const dataToEnd = ({ age, ...res }) => {
    const { key } = store;
    store.update({ fileList: [] });
    return {
      ...res,
      minAge: age[0],
      maxAge: age[1],
      key
    };
  };

  const resetFun = () => {
    store.update({ key: '' });
  };

  return (
    <SearchForm
      form={form}
      store={store}
      formItems={formItems}
      formNum={5}
      showExtend={false}
      dataToEnd={dataToEnd}
      resetFun={resetFun}
    />
  );
}));
