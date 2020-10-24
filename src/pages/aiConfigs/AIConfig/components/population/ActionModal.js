/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-24 16:12:41
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 16:31:56
 */
import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Form, Input, Select
} from 'antd';
// import _ from 'lodash';
import { useActionModal } from '@/hooks';
import style from './ActionModal.module.less';

const { TextArea } = Input;
const { Option } = Select;

const ThresholdInput = (props) => {
  const { value, onChange } = props;
  const inputProps = { value, onChange };
  return <div className="range">
    <Input {...inputProps} />
    <span className="separator">~</span>
    <Input disabled value="1" />
  </div>;
};

const ActionModal = inject('enums')(observer(({
  enums,
  form,
  store
}) => {
  const {
    entity
  } = store;

  const { POPULATION_TYPE: { array: POPULATION_TYPE } } = enums;

  const dataToEnd = useCallback(({ ...rest }) => ({
    facedbId: entity.facedbId,
    creator: entity.creator,
    ...rest
  }));

  const { createModal } = useActionModal({
    name: '人口库', form, store, dataToEnd
  });

  const formItems = [
    {
      key: 'facedbName',
      props: {
        label: '人口库名称'
      },
      decorator: {
        initialValue: entity.facedbName,
        rules: [
          { required: true, message: '请输所属单位' }
        ]
      },
      component: <Input />
    },
    {
      key: 'company',
      props: {
        label: '所属单位'
      },
      decorator: {
        initialValue: entity.company,
        rules: [
          { required: true, message: '请输所属单位' }
        ]
      }
    },
    {
      key: 'libType',
      props: {
        label: '库类型'
      },
      decorator: {
        initialValue: entity.libType,
        rules: [
          { required: true, message: '请输入库类型' }
        ]
      },
      component: <Select placeholder="选择库类型">
        {
          POPULATION_TYPE.map(item => <Option value={`${item.id}`}>{item.name}</Option>)
        }
      </Select>
    },
    {
      key: 'minValue',
      props: {
        label: '图片质量入库阈值'
      },
      decorator: {
        initialValue: entity.minValue || 0.5,
        rules: [
          { required: true, pattern: /^(1|0(\.8|.9)?)$/, message: '请输入大于等于0.8小于等于1的数值' }
        ]
      },
      component: <ThresholdInput />
    },
    {
      key: 'description',
      props: {
        label: '入库描述'
      },
      decorator: {
        initialValue: entity.description,
        rules: [
          { max: 50, message: '节点描述不能超过50个字符' }
        ]
      },
      component: <TextArea />
    }
  ];
  return createModal({
    modalProps: {
      width: 640,
      className: style['action-modal']
    },
    formProps: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    },
    formItems
  });
}));

export default Form.create()(ActionModal);
