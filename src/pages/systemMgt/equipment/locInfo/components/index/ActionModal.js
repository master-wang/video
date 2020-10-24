import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, Input
} from 'antd';
import { genItems } from '@/utils/form';
import store from '../../stores';

const { TextArea } = Input;

const ActionModal = observer(({
  form
}) => {
  const {
    loc, visible, action
  } = store;

  const title = useMemo(() => (`${action === 'add' ? '新增' : '编辑'}位置信息`), [action]);

  // const validateCode = useCallback(async (rule, value, callback) => {
  //   if (!value) {
  //     callback('请输入组织编码');
  //   } else {
  //     if (action === 'edit' && value === loc.code) {
  //       return callback();
  //     }
  //     const isValid = await store.validateCode({ code: value });
  //     if (!isValid) {
  //       callback('该组织编码已存在');
  //     } else {
  //       callback();
  //     }
  //   }
  // });

  const onCancel = useCallback(() => {
    store.update({ visible: false });
    form.resetFields();
  });

  const onOk = useCallback(() => {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      const params = {
        ...values,
        id: loc.id,
        pid: loc.pid
      };
      store.save(params, () => {
        onCancel();
      });
    });
  });

  const formItems = genItems([
    {
      key: 'pname',
      props: {
        label: '上级组织'
      },
      decorator: false,
      component: <span>{loc.pname || '--'}</span>
    },
    {
      key: 'code',
      props: {
        required: true,
        label: '组织编码'
      },
      decorator: {
        initialValue: loc.code || new Date().getTime(),
        validateTrigger: 'onBlur',
        rules: [
          // { validator: validateCode }
          { required: true }
        ]
      }
    },
    {
      key: 'name',
      props: {
        label: '组织名称'
      },
      decorator: {
        initialValue: loc.name,
        rules: [
          { required: true, message: '请输入组织名称' }
        ]
      }
    },
    {
      key: 'description',
      props: {
        label: '组织描述'
      },
      decorator: {
        initialValue: loc.description
      },
      component: <TextArea />
    }
  ], form);

  return (
    <Modal
      width="640px"
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
        {formItems}
      </Form>
    </Modal>
  );
});


export default Form.create()(ActionModal);
