import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Button, Divider, Popconfirm, Badge, Modal,
  Form
} from 'antd';
import EditUserModal from './addModal/EditUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import { useOperateTable } from '@/hooks';

export default Form.create()(observer(({
  store, form
}) => {
  const { freezeUser, editVisible, userDetail } = store;

  const { createTable } = useOperateTable(store);

  const showEdit = ({ userId }) => {
    store.update({ editVisible: true });
    store.getUser({ userId });
  };

  const handleEditOk = async () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      const orgs = [];
      const { organizations = [] } = values;
      organizations.forEach((item) => {
        orgs.push(item.value);
      });
      const data = {
        ...userDetail,
        ...values,
        organizations: orgs,
        userDetailId: userDetail.id,
        userId: userDetail.id
      };
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
        ...data,
        extendColumn: [
          ...getDataObj,
          ...extendHidData
        ]
      };
      await store.editUser(params);
      store.queryPaging();
      store.update({
        editVisible: false,
        orgData: []
      });
    });
  };
  const handleEditCancel = () => {
    store.update({
      editVisible: false,
      orgData: []
    });
  };
  const modalProps = {
    destroyOnClose: true,
    width: 860,
    title: '编辑用户信息',
    visible: editVisible,
    onOk: handleEditOk,
    onCancel: handleEditCancel
  };

  const resetPwd = ({ userId }) => {
    store.getUser({ userId });
    store.update({ resetPasswordVisible: true });
  };

  const columns = [
    {
      dataIndex: 'userName',
      title: '用户名'
    },
    {
      dataIndex: 'realName',
      title: '姓名'
    },
    {
      dataIndex: 'mobile',
      title: '手机号',
      render: (text) => {
        let number = Number(text);
        if (Number.isNaN(number) || `${number}`.length !== 11) {
          return text;
        }
        const reg = /^(\d{3})\d{4}(\d{4})$/;
        number = `${number}`.replace(reg, '$1****$2');
        return number;
      }
    },
    {
      dataIndex: 'mail',
      title: '邮箱',
      render: (text) => {
        if (!text) {
          return null;
        }
        const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
        if (!reg.test(text)) {
          return text;
        }
        const arr = _.split(text, '@', 2);
        let str = arr[0];
        if (str) {
          str = _.repeat('*', str.length);
        }
        return (`${str}@${arr[1]}`);
      }
    },
    {
      dataIndex: 'userStatus',
      title: '状态',
      render: (text) => {
        if (text === 'ACTIVE') {
          return <>
            <Badge status="success" />
              有效
          </>;
        }
        return <>
          <Badge status="error" />
            冻结
        </>;
      }
    },
    {
      dataIndex: '_action',
      title: '操作',
      render: (text, record) => {
        if (record.userType === 'ADMIN') {
          return null;
        }
        return (
          <>
            <Popconfirm
              title={record.userStatus === 'ACTIVE' ? '是否冻结当前用户？' : '是否启用当前用户？'}
              onConfirm={() => freezeUser({ userId: record.id, freeze: record.userStatus === 'ACTIVE' ? 'UNACTIVE' : 'ACTIVE' }, () => { store.queryPaging(); })}
            >
              <Button type="link">{record.userStatus === 'ACTIVE' ? '冻结' : '启用'}</Button>
            </Popconfirm>
            <Divider type="vertical" />
            <Button type="link" onClick={() => showEdit({ userId: record.id })}>编辑</Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => resetPwd({ userId: record.id })}>重置密码</Button>
          </>
        );
      }
    }
  ];
  useMount(() => {
    store.getExtend();
    store.queryPaging({
      query: {
        page: 1,
        pageSize: 20,
        sort: { orders: [{ property: 'id', direction: 'DESC' }] }
      }
    });
  });
  return <>
    {createTable({
      columns
    })}
    <Modal
      {...modalProps}
    >
      <EditUserModal form={form} store={store} />
    </Modal>
    <ResetPasswordModal store={store} />
  </>;
}));
