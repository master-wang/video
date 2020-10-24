/* eslint-disable no-unused-vars */

import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, InputNumber
} from 'antd';
import { useMount } from 'react-use';

import { genItems } from '@/utils/form';
import style from './index.module.less';

const formProps = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 }
};

export default Form.create()(observer(({ form, store }) => {
  const {
    configVisible, info
  } = store;
  // 布控事件类型的改变

  const handleCancel = () => {
    store.update({
      configVisible: false
    });
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      await store.updateTask({
        ...info,
        ...values
      });
      store.queryPaging();
      handleCancel();
    });
  };

  const topItem = [
    {
      key: 'cputhreshold',
      props: {
        label: 'CPU使用率上限（%）'
      },
      decorator: {
        initialValue: info.cputhreshold || 70,
        rules: [
          { required: true, message: '请输入CPU使用率上限' }
        ]
      },
      component: <InputNumber
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
      />
    },
    {
      key: 'memthreshold',
      props: {
        label: '内存使用率上限（%）'
      },
      decorator: {
        initialValue: info.memthreshold || 75,
        rules: [
          { required: true, message: '请输入内存使用率上限' }
        ]
      },
      component: <InputNumber
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
      />
    },
    {
      key: 'netthreshold',
      props: {
        label: '网卡使用率上限（%）'
      },
      decorator: {
        initialValue: info.netthreshold || 60,
        rules: [
          { required: true, message: '请输入网卡使用率上限' }
        ]
      },
      component: <InputNumber
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
      />
    }
  ];

  useMount(() => {

  });
  return (
    <Modal
      title="阀值配置"
      visible={configVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      destroyOnClose
      className={style['modal-wrap']}
    >
      <Form {...formProps}>
        {genItems(topItem, form)}
      </Form>
    </Modal>
  );
}));
