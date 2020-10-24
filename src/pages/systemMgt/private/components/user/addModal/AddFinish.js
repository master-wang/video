import React, { useState } from 'react';
import {
  Table, Button, message
} from 'antd';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import checkIcon from '@/images/user-checkbox.svg';
import style from './AddFinish.module.less';

export default observer(({ store }) => {
  const { createdUser } = store;

  const [checkId, setCheckId] = useState(null);

  const handleClick = (record) => {
    copy(record.password || ' ');
    message.success('复制密码');
  };
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
            type="link"
            onClick={() => { handleCheck(record); }}
            style={{ marginRight: 10 }}
          >
            {checkId === record.id ? '隐藏密码' : '查看密码'}
          </Button>
          <Button type="link" onClick={() => { handleClick(record); }}>复制密码</Button>
        </>
      )
    }
  ];
  return (
    <div>
      <div>
        <img src={checkIcon} alt="" className={style.image} />
        <div className={style.text}>添加用户成功</div>
      </div>
      <Table
        rowKey="id"
        dataSource={[toJS(createdUser)]}
        columns={columns}
        pagination={false}
      />
    </div>
  );
});
