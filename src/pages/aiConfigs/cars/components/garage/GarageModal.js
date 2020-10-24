import React, { useEffect, useCallback } from 'react';
import {
  Modal, Form, Input, Select
} from 'antd';
import { observer } from 'mobx-react';
import ENUMS from '../../constants/enums';
import { genItems } from '@/utils/form';

const { TextArea } = Input;
const { Option } = Select;
const formProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const ActionModal = observer(({ store, form }) => {
  const { garageVisible, editGarageInfo } = store;

  const handleCancel = () => {
    store.reset(['garageVisible']);
  };

  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      if (store.action === 'add') {
        await store.addGarage(values);
      } else {
        const params = {
          ...values,
          cardbId: store.garageId
        };
        await store.addGarage(params);
      }
      store.queryPaging();
      handleCancel();
    });
  };

  const checkName = useCallback(async (rule, value, callback) => {
    if (!value) {
      callback('请输入车辆库名称');
    } else {
      // 防止从编辑过来不修改车辆库也校验
      if (store.editGarageInfo.cardbName === value) {
        callback();
        return;
      }
      await store.checkName({ cardbName: value });
      const { isValid } = store;
      if (!isValid) {
        callback('该车辆库已存在!');
      } else {
        callback();
      }
    }
  });

  const formItems = [
    {
      key: 'cardbName',
      props: {
        label: '车辆库名称'
      },
      decorator: {
        validateTrigger: 'onBlur',
        rules: [
          { validator: checkName },
          { required: true }
        ]
      },
      component: <Input placeholder="请输入车辆库名称" />
    },
    {
      key: 'company',
      props: {
        label: '所属单位'
      },
      decorator: {
        rules: [
          { required: true, message: '请输入所属单位' }
        ]
      },
      component: <Input placeholder="请输入所属单位" />
    },
    {
      key: 'libType',
      props: {
        label: '库类型'
      },
      decorator: {
        rules: [
          { required: true, message: '请选择库类型' }
        ]
      },
      component: <Select placeholder="请选择库类型">
        {
        ENUMS.GARAGE_TYPE.array.map(({ key, name }) =>
          <Option key={key} value={key}>{name}</Option>)
      }
      </Select>
    },
    {
      key: 'description',
      props: {
        label: '库描述'
      },
      component: <TextArea rows={4} placeholder="请输入库描述" />
    }
  ];

  // 在挂载的时候判断是新增还是编辑,是编辑则回显信息
  useEffect(() => {
    if (store.action === 'edit') {
      const { setFieldsValue } = form;
      setFieldsValue(editGarageInfo);
    }
  }, [editGarageInfo]);

  return (
    <Modal
      title={store.action === 'add' ? '新增车辆库' : '编辑车辆库'}
      visible={garageVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={640}
      destroyOnClose
    >
      <Form {...formProps}>
        {genItems(formItems, form)}
      </Form>
    </Modal>
  );
});

export default Form.create()(ActionModal);
