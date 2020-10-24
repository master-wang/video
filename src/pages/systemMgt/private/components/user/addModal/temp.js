import React, { useCallback, useState, useEffect } from 'react';
import {
  Form, Modal, TreeSelect, Input, Radio, Divider
} from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { utils } from '@common';
import Org from './org';
import style from './index.module.less';
import AddFinish from './AddFinish';

const { SHOW_ALL } = TreeSelect;

const { TextArea } = Input;

const { form: { genItems } } = utils;
const AddModal = observer(({ form, store }) => {
  const {
    visible, relateInsData, query, extendField
  } = store;
  const [finish, setFinish] = useState(false);
  const [userForm, setUserForm] = useState([]);
  useEffect(() => {
    if (visible && !relateInsData.length) {
      store.relateInstitute({ type: 'search', keyword: '' });
    }
  });

  const onOk = useCallback(() => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      setFinish(true);
      delete values.password;
      // 将扩展字段的值放到参数的 extendColumnMap key当中
      const { extendHidData, extendShowData } = store;
      const valsKey = Object.keys(values);
      const getDataObj = [];
      // 将扩展字段的值筛选出来
      extendShowData.forEach((item) => {
        if (valsKey.slice().includes(item.name)) {
          getDataObj.push({
            ...item,
            value: values[item.name]
          });
          delete values[item.name];
        }
      });
      const params = {
        ...values,
        extendColumn: [
          ...getDataObj,
          ...extendHidData
        ]
      };
      await store.createUser({ ...params, manageSource: 'INNER' });
      store.queryPaging(query);
    });
  }, [store, form]);
  const onCancel = useCallback(() => {
    store.update({ visible: false, createdUser: [] });
    setFinish(false);
  }, [store]);
  const validateCode = useCallback(_.debounce(async (rule, value, callback) => {
    if (!value) {
      callback('');
    } else {
      await store.checkUserName({ userName: value, tenant: store.context.tenantId });
      if (store.hasUser) {
        callback('该用户已存在');
      } else {
        callback();
      }
    }
  }, 500), [store.hasUser]);
  const modalProps = {
    destroyOnClose: true,
    width: 860,
    wrapClassName: style['action-modal'],
    title: '添加用户'
  };
  if (finish) {
    modalProps.footer = null;
  }
  const formProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };
  const formItems = [
    {
      key: 'userName',
      props: {
        label: '用户名'
      },
      decorator: {
        rules: [
          { required: true, message: '请输入用户名' },
          {
            pattern: /^[a-zA-Z\d]*$/,
            message: '用户名只能包含英文和数字'
          },
          { validator: validateCode }
        ]
      },
      component: <Input placeholder="请输入用户名" />
    },
    {
      key: 'realName',
      props: {
        label: '姓名'
      },
      decorator: {
        rules: [
          { required: true, message: '请输入姓名' }
        ]
      },
      component: <Input placeholder="请输入姓名" />
    },
    {
      key: 'mobile',
      props: {
        label: '手机号'
      },
      decorator: {
        rules: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号输入有误'
          }
        ]
      },
      component: <Input placeholder="请输入手机号" />
    },
    {
      key: 'mail',
      props: {
        label: '邮箱'
      },
      decorator: {
        rules: [
          { required: true, message: '请输入邮箱' },
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: '邮箱格式输入有误'
          }
        ]
      },
      component: <Input placeholder="请输入邮箱" />
    },
    {
      key: 'organizations',
      props: {
        label: '关联组织机构'
      },
      component: <TreeSelect
        dropdownClassName={style.tree}
        treeNodeFilterProp="title"
        allowClear
        showSearch
        treeData={toJS(relateInsData)}
        treeCheckable
        showCheckedStrategy={SHOW_ALL}
        placeholder="请选择关联组织机构"
      >
      </TreeSelect>
    },
    {
      key: 'password',
      props: {
        label: '密码'
      },
      component: <Input placeholder="密码随机生成" disabled />
    },
    {
      key: 'userStatus',
      props: {
        label: '用户状态'
      },
      decorator: {
        initialValue: 'ACTIVE',
        rules: [
          { required: true, message: '请选择用户状态' }
        ]
      },
      component: <Radio.Group>
        <Radio value="ACTIVE">有效</Radio>
        <Radio value="UNACTIVE">冻结</Radio>
      </Radio.Group>
    }
  ];
  const descItem = [
    {
      key: 'extra-001',
      extra: true,
      component: <Divider />
    },
    {
      key: 'description',
      props: {
        label: '备注',
        className: 'row-item',
        labelCol: { span: 3 },
        wrapperCol: { span: 20 }
      },
      component: <TextArea rows={4} placeholder="请填写备注信息" />
    }
  ];

  // 处理扩展字段
  useEffect(() => {
    if (!extendField) {
      descItem.forEach((item) => {
        formItems.push(item);
      });
      setUserForm(formItems);
      store.update({ extendShowData: [], extendHidData: [] });
      return;
    }
    const { extendColumnMap } = extendField;
    const extendShowData = [];
    const extendHidData = [];
    extendColumnMap.forEach((item) => {
      if (item.isDisplay) {
        extendShowData.push(item);
      } else {
        extendHidData.push(item);
      }
    });
    extendShowData.forEach(({
      displayName, name, value, length = 20
    }) => {
      formItems.push({
        key: name,
        props: {
          label: displayName
        },
        decorator: {
          initialValue: value,
          rules: [
            { max: length, message: `长度不超过${length}个字符` },
            { required: true, message: `请输入${displayName}` }
          ]
        },
        component: <Input placeholder={`请输入${displayName}`} />
      });
    });
    descItem.forEach((item) => {
      formItems.push(item);
    });
    setUserForm(formItems);
    store.update({ extendShowData, extendHidData });
  }, [extendField, relateInsData]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      {...modalProps}
    >
      {
      !finish ? (
        <Form autoComplete="off" {...formProps}>
          <Org store={store} />
          {genItems(userForm, form)}
        </Form>
      ) : (
        <AddFinish store={store} />
      )
    }
    </Modal>
  );
});


export default Form.create()(AddModal);
