import React, { useCallback, useMemo, useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Divider, Form, Radio, Select, Input
} from 'antd';
import moment from 'moment';
import { useRouter, useActionModal } from '@/hooks';
import PicturesWall from './widgets/PicturesWall';
import DatePicker from './widgets/DatePicker';
import style from './ActionModal.module.less';

const { Option } = Select;
const { Group: RadioGroup, Button: RadioButton } = Radio;

const ActionModal = inject('enums', 'app')(observer(({
  enums,
  // app,
  form,
  store
}) => {
  const { params: { id: facedbId } } = useRouter();
  const {
    POPULATION_TYPE: { array: POPULATION_TYPE },
    NATION_LIST: { array: NATION_LIST }
  } = enums;
  const { action, entity } = store;
  const [batch, setBatch] = useState(false);
  const [cardType, setCardType] = useState(entity.cardType || 0);
  const dataToEnd = useCallback((data) => {
    const params = {
      facedbId,
      cardType,
      ...data,
      birthDay: moment(data.birthDay).format('YYYY-MM-DD')
    };
    return params;
  });
  const { createModal } = useActionModal({ form, store, dataToEnd });

  const title = useMemo(() => {
    if (action === 'add') {
      return (
        <>
          <div className="title-block">
            新增人像
          </div>
          <div className="extra-block">
            <RadioGroup value={batch} onChange={(e) => setBatch(e.target.value)}>
              <Radio value={false}>逐个新增</Radio>
              <Radio value>批量导入</Radio>
            </RadioGroup>
          </div>
        </>
      );
    }
    return <div className="title-block">编辑人像</div>;
  }, [action, batch]);

  const certificatesType = (
    <Select defaultValue="0" onChange={itemValue => setCardType(itemValue)}>
      <Option value="0">身份证</Option>
      <Option value="1">护照</Option>
    </Select>
  );

  const formItemsSingle = [
    {
      key: 'extra-01',
      extra: true,
      component: <div style={{ width: '100%', marginBottom: 32 }}>基本信息(必填)</div>
    },
    {
      key: 'name',
      props: {
        label: '姓名'
      },
      decorator: {
        initialValue: entity.name,
        rules: [
          { required: true, message: '请输入姓名' }
        ]
      }
    },
    {
      key: 'male',
      props: {
        label: '性别'
      },
      decorator: {
        initialValue: entity.male,
        rules: [
          { required: true, message: '请输选择性别' }
        ]
      },
      component: <RadioGroup defaultValue="a" buttonStyle="solid">
        <RadioButton value="1">男</RadioButton>
        <RadioButton value="2">女</RadioButton>
      </RadioGroup>
    },
    {
      key: 'cardNumber',
      props: {
        label: '证件号码',
        labelCol: { span: 3, offset: 0 },
        className: 'cid'
      },
      decorator: {
        initialValue: entity.cardNumber,
        rules: [
          { required: true, message: '请填写证件号码' }
        ]
      },
      component: <Input addonBefore={certificatesType} disabled={action === 'edit'} style={{ width: '100%' }} />
    },
    {
      key: 'facedbName',
      props: {
        label: '所属人口库',
        labelCol: { span: 3, offset: 0 },
        className: 'cid'
      },
      decorator: {
        initialValue: entity.facedbName,
        rules: [
          { required: true, message: '请选择人口库类型' }
        ]
      },
      component: <Select placeholder="请选择人口库类型">
        {
          POPULATION_TYPE.map(item => <Option value={`${item.id}`}>{item.name}</Option>)
        }
      </Select>
    },
    {
      key: 'faceImg',
      props: {
        label: '',
        className: 'pic'
      },
      decorator: {
        initialValue: entity.faceImg,
        rules: [
          { required: true, message: '请上传主图' }
        ]
      },
      component: <PicturesWall store={store} facedbId={facedbId} />
    },
    {
      key: 'extra-02',
      extra: true,
      component: <Divider />
    },
    {
      key: 'extra-03',
      extra: true,
      component: <div style={{ width: '100%', marginBottom: 32 }}>其他信息(选填)</div>
    },
    {
      key: 'nationality',
      props: {
        label: '民族',
        labelCol: { span: 3, offset: 0 },
        className: 'cid'
      },
      decorator: {
        initialValue: entity.nationality
      },
      component: <Select placeholder="请选择所属民族">
        {
          NATION_LIST.map(item => <Option value={`${item.id}`}>{item.name}</Option>)
        }
      </Select>
    },
    {
      key: 'birthDay',
      props: {
        label: '出生年月日',
        labelCol: { span: 3, offset: 0 },
        className: 'cid'
      },
      component: <DatePicker birthDay={entity.birthDay} />
    },
    {
      key: 'permanentAddress',
      props: {
        label: '户籍地址'
      },
      decorator: {
        initialValue: entity.permanentAddress
      }
    },
    {
      key: 'currentAddress',
      props: {
        label: '现住地址'
      },
      decorator: {
        initialValue: entity.currentAddress
      }
    },
    {
      key: 'organization',
      props: {
        label: '工作单位'
      },
      decorator: {
        initialValue: entity.organization
      }
    },
    {
      key: 'phoneNumber',
      props: {
        label: '手机号码'
      },
      decorator: {
        initialValue: entity.phoneNumber
      }
    }
  ];

  const formItemsBatch = [];

  const formItems = batch ? formItemsBatch : formItemsSingle;

  return createModal({
    modalProps: {
      destroyOnClose: true,
      wrapClassName: style['action-modal'],
      width: 900,
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
