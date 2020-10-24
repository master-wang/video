import React, { useCallback } from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Input
} from 'antd';
import { useActionModal } from '@/hooks';
import style from './ActionModal.module.less';


const ActionModal = observer(({
  form,
  store
}) => {
  useMount(() => {

  });

  const {
    entity, action
  } = store;

  const dataToEnd = useCallback(({ ...rest }) => ({
    ...rest
  }));

  const { createModal } = useActionModal({
    name: '添加角色', form, store, dataToEnd
  });

  const checkName = useCallback(async (rule, value, callback) => {
    if (!value) {
      callback('请输入角色名称');
    } else {
      // 防止从编辑过来不修改也校验
      if (store.entity.name === value && store.action === 'edit') {
        callback();
        return;
      }
      await store.checkName({ name: value }).then((data) => {
        if (!data) {
          callback('该角色已存在!');
        } else {
          callback();
        }
      });
    }
  });

  const formItems = [
    {
      key: 'name',
      // hide: action === 'add',
      props: {
        label: '角色名称'
      },
      decorator: {
        validateTrigger: 'onBlur',
        initialValue: entity.name,
        rules: [
          { validator: checkName },
          { required: true }
        ]
      },
      component: <Input disabled={action === 'edit'} />
    },
    {
      // key不能为nodeName, 有冲突会报错，保存的时候需要替换回nodeName
      key: 'description',
      props: {
        label: '角色描述'
      },
      decorator: {
        initialValue: entity.description,
        rules: [
          { required: true, message: '角色描述' },
          { max: 30, message: '长度不超过30个字符' }
        ]
      },
      component: <Input disabled={action === 'edit'} />
    }
  ];

  const footer = {};
  if (action === 'edit') {
    footer.footer = <></>;
  }
  return createModal({
    modalProps: {
      width: 640,
      className: style['action-modal'],
      ...footer
    },
    formProps: {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 }
    },
    formItems
  });
});


export default Form.create()(ActionModal);
