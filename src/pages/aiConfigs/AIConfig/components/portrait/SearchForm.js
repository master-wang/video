/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:55:03
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 15:58:26
 */
import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Form, Select, Input, Divider
} from 'antd';
import { useRouter, useSearchForm } from '@/hooks';
import populationStore from '../../stores/population';
import styles from './index.module.less';

const { Option } = Select;
// const { Search } = Input;

const certificatesSelector = (
  <Select style={{ width: 80 }} defaultValue="id">
    <Option value="id">身份证</Option>
    <Option value="hz">护照</Option>
  </Select>
);

const LibraryList = (props) => {
  const { value, onChange } = props;
  return <div className={styles.searchTop}>
    <Select defaultValue={value} onChange={onChange}>
      {/* <Option value="">全部</Option> */}
      {
        populationStore
        && populationStore.dataSource
        && populationStore.dataSource.map(
          item => <Option value={item.facedbId}>{item.facedbName}</Option>
        )
      }
    </Select>
    {/* <Button onClick={() => routerPush('/aiConfig')}>返回</Button> */}
  </div>;
};

const SearchForm = inject('enums')(observer(({
  enums,
  form,
  store
}) => {
  const { PORTRAIT_FEATURE_TYPE: { array: PORTRAIT_FEATURE_TYPE_ARRAY } } = enums;
  const PORTRAIT_FEATURE_TYPE = [
    { id: '', name: '全部' },
    ...PORTRAIT_FEATURE_TYPE_ARRAY
  ];
  const dataToEnd = useCallback(({ ...rest }) => ({ ...rest }));
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });
  const { match: { params: { id: facedbId } }, push } = useRouter();
  const formItems = [
    {
      key: 'dbTableName',
      // extra: true,
      props: {
        className: 'extraTop'
      },
      decorator: {
        initialValue: facedbId
      },
      component: <LibraryList onChange={onSearch} routerPush={push} />
    },
    {
      key: 'extra-01',
      extra: true,
      component: <Divider />
    },
    {
      key: 'name',
      props: {
        label: '姓名'
      },
      component: <Input placeholder="请输入关键字搜索" onChange={onSearch} />
    },
    {
      key: 'cardNumber',
      props: {
        label: '身份证号码'
      },
      component: <Input addonBefore={certificatesSelector} placeholder="请输入关键字搜索" onChange={onSearch} />
    },
    {
      key: 'age',
      props: {
        label: '年龄'
      },
      component: <div className="range">
        <Input />
        <span className="separator">~</span>
        <Input />
      </div>
    },
    {
      key: 'male',
      props: {
        label: '性别'
      },
      component: <Select defaultValue="" onChange={onSearch}>
        <Option value="">全部</Option>
        <Option value="1">男</Option>
        <Option value="2">女</Option>
      </Select>
    },
    {
      key: 'dbStatus',
      props: {
        label: '入库状态'
      },
      component: <Select defaultValue="" onChange={onSearch}>
        <Option value="">全部</Option>
        <Option value="1">成功</Option>
        <Option value="2">失败</Option>
      </Select>
    },
    {
      key: 'featureStatus',
      props: {
        label: '人像特征提取状态'
      },
      component: <Select placeholder="请选择人像特征提取状态" onChange={onSearch}>
        {
          PORTRAIT_FEATURE_TYPE.map(item => <Option value={item.id}>{item.name}</Option>)
        }
      </Select>
    }
  ];
  return createForm({
    formProps: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    },
    formItems
  });
}));

export default Form.create()(SearchForm);
