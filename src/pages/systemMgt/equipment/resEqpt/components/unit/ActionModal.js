import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, Input } from 'antd';
import { useActionModal } from '@/hooks';

const ActionModal = observer(({
  form,
  store
}) => {
  const { node, entity } = store;

  const dataToEnd = useCallback((data) => ({
    ...data,
    nodeCode: node.nodeCode,
    serverUnitId: entity.serverUnitId
  }), [node, entity]);

  const { createModal } = useActionModal({
    name: '服务单元',
    form,
    store,
    dataToEnd
  });

  const formItems = [
    {
      key: 'serverUnitName',
      props: {
        label: '服务单元名称'
      },
      decorator: {
        initialValue: entity.serverUnitName && entity.serverUnitName.replace(`${node.nodeIp}_`, ''),
        rules: [
          { required: true, message: '请输入服务单元名称' }
        ]
      },
      component: <Input addonBefore={`${entity.outerNet}_`} />
    },
    {
      key: 'serverUnitPort',
      props: {
        label: '服务单元端口'
      },
      decorator: {
        initialValue: entity.serverUnitPort || 0,
        rules: [
          { required: true, pattern: CST.REG_EXP.PORT, message: '请输入0到65535的整数' }
        ]
      }
    },
    {
      key: 'outerNet',
      props: {
        label: '外网IP'
      },
      decorator: {
        initialValue: entity.outerNet,
        rules: [
          { required: true, pattern: CST.REG_EXP.IP_V4, message: '请输入正确的IP地址' }
        ]
      }
    },
    {
      key: 'outerPort',
      props: {
        label: '外网端口'
      },
      decorator: {
        initialValue: entity.outerPort,
        rules: [
          { required: true, pattern: CST.REG_EXP.PORT, message: '请输入0到65535的整数' }
        ]
      }
    },
    {
      key: 'capacity',
      props: {
        label: '负载数量'
      },
      decorator: {
        initialValue: entity.capacity || 50,
        rules: [
          { required: true, pattern: /^[1-9]\d*/, message: '请输入大于0的正整数' }
        ]
      }
    }
  ];

  return createModal({
    formProps: {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    },
    formItems
  });
});

export default Form.create()(ActionModal);
