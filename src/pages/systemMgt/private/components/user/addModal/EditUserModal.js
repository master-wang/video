import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Form, Input, Radio, Divider
} from 'antd';
import style from './EditUserModal.module.less';
import { genItems } from '@/utils/form';

// const { SHOW_ALL } = TreeSelect;

const { TextArea } = Input;

export default observer(({ store, form }) => {
  const { userDetail, relateInsData } = store;
  const formProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };

  const [userForm, setUserForm] = useState([]);

  const treeVal = [];
  userDetail.organizations && userDetail.organizations.forEach((item, i) => {
    treeVal.push({ label: userDetail.organizationName[i], value: item });
  });

  const formItems = [
    {
      key: 'userName',
      props: {
        label: '用户名'
      },
      decorator: {
        initialValue: userDetail.userName,
        rules: [
          { required: true, message: '请输入用户名' }
        ]
      },
      component: <Input placeholder="请输入用户名" disabled />
    },
    {
      key: 'realName',
      props: {
        label: '姓名'
      },
      decorator: {
        initialValue: userDetail.realName,
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
        initialValue: userDetail.mobile,
        rules: [
          {
            required: true,
            pattern: /^1\d{10}$/,
            message: '请输入手机号且格式正确'
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
        initialValue: userDetail.mail,
        rules: [
          {
            required: true,
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: '请输入邮箱且格式正确'
          }
        ]
      },
      component: <Input placeholder="请输入邮箱" />
    }
    // {
    //   key: 'organizations',
    //   props: {
    //     label: '关联组织机构'
    //   },
    //   decorator: {
    //     initialValue: treeVal
    //   },
    //   component: <TreeSelect
    //     treeNodeFilterProp="title"
    //     allowClear
    //     showSearch
    //     dropdownStyle={{ maxHeight: 200, maxWidth: 300 }}
    //     showCheckedStrategy={SHOW_ALL}
    //     treeData={relateInsData}
    //     treeCheckable
    //     treeCheckStrictly
    //     {...{ treeCheckable: true, placeholder: '' }}
    //   />
    // }
  ];
  const descItem = [
    {
      key: 'userStatus',
      props: {
        label: '用户状态'
      },
      decorator: {
        initialValue: userDetail.userStatus
      },
      component: <Radio.Group>
        <Radio value="ACTIVE">有效</Radio>
        <Radio value="UNACTIVE">冻结</Radio>
      </Radio.Group>
    },
    {
      key: 'extra-001',
      extra: true,
      component: <Divider />
    },
    {
      key: 'description',
      props: {
        label: '用户备注'
      },
      decorator: {
        initialValue: userDetail.description
      },
      component: <TextArea rows={4} />
    }

  ];

  // 处理扩展字段
  useEffect(() => {
    if (!userDetail.extendColumn || !userDetail.extendColumn.length) {
      descItem.forEach((item) => {
        formItems.push(item);
      });
      setUserForm(formItems);
      return;
    }
    const { extendShowData } = store;
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
  }, [userDetail, relateInsData]);

  return (
    <div className={style['form-wrap']}>
      <Form autoComplete="off" {...formProps}>
        {genItems(userForm, form)}
      </Form>
    </div>
  );
});
