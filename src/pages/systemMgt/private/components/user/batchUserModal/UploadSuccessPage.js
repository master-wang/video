import React, { useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import {
  Table, Button, message
} from 'antd';
import checkIcon from '@/images/user-checkbox.svg';
import style from './UploadSuccessPage.module.less';

const UploadSuccessPage = observer(({ store }) => {
  const { createdUsers } = store;
  const handleClick = (record) => {
    copy(record.password || ' ');
    message.success('复制密码');
  };
  const [checkId, setCheckId] = useState(null);
  const handleCheck = (record) => {
    if (checkId) {
      setCheckId(null);
      return;
    }
    setCheckId(record.id);
  };
  const columns = [
    {
      dataIndex: 'userName',
      title: '用户名'
    },
    {
      dataIndex: 'userStatus',
      title: '状态',
      render: (text) => {
        if (text === 'ACTIVE') {
          return '有效';
        }
        return '冻结';
      }
    },
    {
      dataIndex: 'password',
      title: '密码',
      render: (text, record) => {
        const { id } = record;
        if (id === checkId) {
          return text;
        }
        return text ? _.repeat('*', text.length) : null;
      }
    },
    {
      dataIndex: '_action',
      title: '',
      render: (text, record) => (
        <>
          <Button
            style={{ marginRight: 10 }}
            type="link"
            onClick={() => { handleCheck(record); }}
          >
            {checkId === record.id ? '隐藏密码' : '查看密码'}
          </Button>
          <Button type="link" onClick={() => { handleClick(record); }}>复制密码</Button>
        </>
      )
    }
  ];
  return (
    <>
      <div>
        <img src={checkIcon} alt="" className={style.image} />
        <div className={style.text}>导入用户成功</div>
      </div>
      <Table
        rowKey="userName"
        columns={columns}
        dataSource={createdUsers.slice()}
        pagination={false}
      />
    </>
  );
});

export default UploadSuccessPage;
