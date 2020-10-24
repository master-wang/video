import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import {
  Form, Input, Switch
} from 'antd';
import AddressUi from './AddressUi';
import { useActionModal, useToolTip } from '@/hooks';
import styles from './ActionModal.module.less';


const { TextArea } = Input;

const ActionModal = observer(({
  form,
  store
}) => {
  const { entity } = store;

  const dataToEnd = useCallback((data) => ({
    ...data,
    startStatus: data.startStatus ? 1 : 0,
    channelId: entity.channelId
  }), [entity]);

  const { createModal } = useActionModal({
    name: '通道',
    form,
    store,
    dataToEnd
  });

  const formItems = [
    {
      key: 'channelId',
      props: {
        label: '通道编码'
      },
      decorator: false,
      component: <span>{useToolTip({ title: entity.channelId })}</span>
    },
    {
      key: 'channelName',
      props: {
        label: '通道名称'
      },
      decorator: {
        initialValue: entity.channelName,
        rules: [
          { required: true, message: '请输入通道名称' }
        ]
      }
    },
    {
      key: 'longitude',
      props: {
        label: '经度'
      },
      decorator: {
        initialValue: entity.longitude,
        rules: [
          { required: true, message: '请输入经度' }
        ]
      }
    },
    {
      key: 'latitude',
      props: {
        label: '纬度'
      },
      decorator: {
        initialValue: entity.latitude,
        rules: [
          { required: true, message: '请输入纬度' }
        ]
      }
    },
    {
      key: 'description',
      props: {
        label: '通道位置'
      },
      decorator: {
        initialValue: entity.description
      },
      component: <TextArea />
    },
    {
      key: 'startStatus',
      props: {
        label: '是否启用'
      },
      decorator: {
        initialValue: !!entity.startStatus,
        valuePropName: 'checked'
      },
      component: <Switch />
    }
  ];

  return createModal({
    formProps: {
      labelCol: { span: 24 },
      wrapperCol: { span: 20 }
    },
    modalProps: {
      width: 860,
      className: styles['modal-wrap']
    },
    formItems,
    extraNode: <AddressUi form={form} store={store} />
  });
});

export default Form.create()(ActionModal);
