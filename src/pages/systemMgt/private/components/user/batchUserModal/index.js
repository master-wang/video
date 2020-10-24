/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Modal, Button, message, Form
} from 'antd';
import { observer } from 'mobx-react';
import UploadPage from './UploadPage';
import UploadSuccessPage from './UploadSuccessPage';

const BatchUserModal = observer(({ store, form }) => {
  const [
    confirmed,
    setConfirmed
  ] = useState(false);
  const {
    batchUserVisible, fileList, batchCreateUser
  } = store;
  const onCancel = () => {
    setConfirmed(false);
    store.update({
      batchUserVisible: false,
      fileList: [],
      errFileLise: [],
      batchUserRelateId: null,
      createdUsers: []
    });
  };
  const onOk = async () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      // 给其默认组织机构
      const { organization = 1 } = values;
      if (!fileList.length) {
        message.error('请先上传文件,且有正确格式的用户列表！');
        return;
      }
      const keys = Object.keys(values);
      const getList = { newList: [] };
      fileList.slice().forEach((user) => {
        const obj = {};
        keys.forEach((key) => {
          const [field, userName] = key.split('_');
          if (user.userName === userName) {
            obj[field] = values[key];
          }
        });
        getList.newList.push({
          ...user,
          ...obj
        });
      });
      const userList = [];
      getList.newList.forEach((userItem) => {
        // 将扩展字段的值放到参数的 extendColumnMap key当中
        const { extendHidData, extendShowData } = store;
        const getDataObj = [];
        // 将扩展字段的值筛选出来
        extendShowData.forEach((item) => {
          getDataObj.push({
            ...item,
            value: userItem[item.name]
          });
          delete userItem[item.name];
        });
        userList.push({
          ...userItem,
          extendColumn: [
            ...getDataObj,
            ...extendHidData
          ]
        });
      });

      const params = {
        userList,
        organization
      };
      await batchCreateUser(params);
      setConfirmed(true);
      store.queryPaging();
    });
  };
  // const handleDownloadCSV = () => {

  // };
  const handleClose = () => {
    store.update({
      batchUserVisible: false,
      fileList: [],
      errFileLise: [],
      batchUserRelateId: null
    });
    setConfirmed(false);
  };
  const FooterBtn = () => (
    <>
      {/* <Button
        onClick={handleDownloadCSV}
      >
      下载CSV文件
      </Button> */}
      <Button onClick={handleClose}>关闭</Button>
    </>
  );
  return (
    <div>
      <Modal
        title="批量导入用户"
        visible={batchUserVisible}
        width={1200}
        onCancel={onCancel}
        onOk={onOk}
        {...confirmed && { footer: <FooterBtn /> }}
      >
        {!confirmed ? <UploadPage store={store} form={form} />
          : <UploadSuccessPage store={store} />}
      </Modal>
    </div>
  );
});

export default Form.create()(BatchUserModal);
