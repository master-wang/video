import React from 'react';
import { observer } from 'mobx-react';
import { Form, Select, Input } from 'antd';
import ENUMS from '../../constants/enums';
import { SearchForm } from '@/components/PageLayout';
import styles from './index.module.less';

const { Option } = Select;

const MyForm = observer(({
  form,
  store
}) => {
  const formItems = [
    {
      key: 'carType',
      props: {
        label: '车辆类型'
      },
      component: <Select placeholder="请选择车辆类型">
        {
          ENUMS.CAR_TYPE.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    },
    {
      key: 'colour',
      props: {
        label: '车身颜色'
      },
      component: <Select
        placeholder="请选择车身颜色"
        dropdownClassName={styles['color-select-menu']}
      >
        {
        ENUMS.CAR_COLOR.array.map(({ key, name, color }) =>
          <Option key={key} value={key}>
            <span className={styles['color-cube']} style={{ backgroundColor: color }} />
            {name}
          </Option>)
      }
      </Select>
    },
    {
      key: 'dbStatus',
      props: {
        label: '入库状态'
      },
      component: <Select placeholder="请选择入库状态">
        {
          ENUMS.GARAGE_STATE.array.map(({ key, name }) =>
            <Option key={key} value={key}>{name}</Option>)
        }
      </Select>
    },
    {
      key: 'cardNumber',
      props: {
        label: '车辆号码'
      },
      component: <Input placeholder="请车辆号码" />
    }
  ];
  const resetFun = ({ store: mystore }) => {
    mystore.update({ query: { dbTableName: mystore.cardbId } });
  };

  return (
    <SearchForm
      form={form}
      store={store}
      formItems={formItems}
      resetFun={resetFun}
    />
  );
});

export default Form.create()(MyForm);
