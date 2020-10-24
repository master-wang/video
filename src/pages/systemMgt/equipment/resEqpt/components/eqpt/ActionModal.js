import React, { useCallback, useMemo, useState } from 'react';
import { useMount } from 'react-use';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
  Divider, Form, Radio, Input, Select
} from 'antd';
import _ from 'lodash';
import { useActionModal } from '@/hooks';
import LocTreeSelect from '@/components/TreeSelect/Location';
import style from './ActionModal.module.less';

const { TextArea } = Input;

const { Group: RadioGroup } = Radio;

const { Option } = Select;

const ActionModal = inject('enums')(observer(({
  form,
  enums,
  store
}) => {
  useMount(() => {
    enums.queryEnums(['access_way', 'camera_type', 'manufacturers']);
  });

  const { action, entity } = store;

  const [batch, setBatch] = useState(false);

  const dataToEnd = useCallback((data) => {
    const params = { ...data };
    if (action === 'add') {
      params.batch = batch;
    }
    params.accessWay = toJS(_.get(enums, `access_way.map.${data.accessWay}`));
    params.manufacturers = toJS(_.get(enums, `manufacturers.map.${data.manufacturers}`));
    params.cameraType = toJS(_.get(enums, `camera_type.map.${data.cameraType}`));
    params.id = entity.id;
    return params;
  }, [enums, action, batch, entity]);

  const { createModal } = useActionModal({ form, store, dataToEnd });

  // const validateCode = useCallback(async (rule, value, callback) => {
  //   if (!value) {
  //     callback('请输入设备编码');
  //   } else {
  //     const isValid = await store.validateCode({ code: value });
  //     if (!isValid) {
  //       callback('该设备编码已存在');
  //     } else {
  //       callback();
  //     }
  //   }
  // });

  const title = useMemo(() => {
    if (action === 'add') {
      return (
        <>
          <div className="title-block">
            新增视频设备信息
          </div>
          <div className="extra-block">
            <RadioGroup value={batch} onChange={(e) => setBatch(e.target.value)}>
              <Radio value={false}>单个接入</Radio>
              <Radio value>批量接入</Radio>
            </RadioGroup>
          </div>
        </>
      );
    }
    return <div className="title-block">编辑视频设备信息</div>;
  }, [action, batch]);

  const formItems = [
    {
      key: 'accessWay',
      props: {
        label: '接入方式'
      },
      decorator: {
        initialValue: _.get(entity, 'accessWay.id'),
        rules: [
          { required: true, message: '请选择接入方式' }
        ]
      },
      component: <Select>
        { _.get(enums, 'access_way.array', []).map(item => (
          <Option key={item.id} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    },
    {
      key: 'extra-001',
      extra: true,
      component: <Divider />
    },
    {
      key: 'equipmentCode',
      props: {
        required: true,
        label: '设备编码'
      },
      decorator: {
        initialValue: entity.equipmentCode || new Date().getTime(),
        rules: [
          { required: true }
        ]
      }
    },
    {
      key: 'equipmentName',
      props: {
        label: '设备名称'
      },
      decorator: {
        initialValue: entity.equipmentName,
        rules: [
          { required: true, message: '请输入设备名称' }
        ]
      }
    },
    {
      key: 'equipmentIp',
      props: {
        label: `设备${batch ? '起始' : ''}IP`
      },
      decorator: {
        initialValue: entity.equipmentIp,
        rules: [
          { required: true, pattern: CST.REG_EXP.IP_V4, message: `请输入正确的设备${batch ? '起始' : ''}IP` }
        ]
      }
    },
    {
      key: 'endIp',
      hide: batch === false,
      props: {
        label: '设备结束IP'
      },
      decorator: {
        rules: [
          { required: true, pattern: CST.REG_EXP.IP_V4, message: '请输入正确的设备结束IP' }
        ]
      }
    },
    {
      key: 'equipmentPort',
      props: {
        label: '设备端口'
      },
      decorator: {
        initialValue: entity.equipmentPort,
        rules: [
          { required: true, pattern: CST.REG_EXP.PORT, message: '请输入0到65535的整数' }
        ]
      }
    },
    {
      key: 'user',
      props: {
        label: '用户名'
      },
      decorator: {
        initialValue: entity.user,
        rules: [
          { required: true, message: '请输入设备端口' }
        ]
      }
    },
    {
      key: 'password',
      props: {
        label: '密码'
      },
      decorator: {
        initialValue: entity.password,
        rules: [
          { required: true, message: '请输入密码' }
        ]
      },
      component: <Input type="password" />
    },
    {
      key: 'manufacturers',
      props: {
        label: '厂家'
      },
      decorator: {
        initialValue: _.get(entity, 'manufacturers.id'),
        rules: [
          { required: true, message: '请输入厂家' }
        ]
      },
      component: <Select>
        { _.get(enums, 'manufacturers.array', []).map(item => (
          <Option key={item.id} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    },
    {
      key: 'location',
      props: {
        label: '位置信息'
      },
      decorator: {
        rules: [
          { required: true, message: '请选择位置信息' }
        ]
      },
      component: <LocTreeSelect fullValue={toJS(entity.location)} />
    },
    {
      key: 'cameraType',
      props: {
        label: '摄像头类型'
      },
      decorator: {
        initialValue: _.get(entity, 'cameraType.id'),
        rules: [
          { required: true, message: '请选择摄像头类型' }
        ]
      },
      component: <Select>
        { _.get(enums, 'camera_type.array', []).map(item => (
          <Option key={item.id} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    },
    {
      key: 'extra-002',
      extra: true,
      component: <Divider />
    },
    {
      key: 'description',
      props: {
        label: '设备描述',
        className: 'eqpt-desc-item',
        labelCol: { span: 3 },
        wrapperCol: { span: 20 }
      },
      decorator: {
        initialValue: entity.description
      },
      component: <TextArea />
    }
  ];

  return createModal({
    modalProps: {
      destroyOnClose: true,
      wrapClassName: style['action-modal'],
      width: 860,
      title
    },
    formProps: {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    },
    formItems
  });
}));

export default Form.create()(ActionModal);
