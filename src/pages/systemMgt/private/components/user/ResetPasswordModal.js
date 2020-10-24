import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import copy from 'copy-to-clipboard';
import { observer } from 'mobx-react';

export default observer(({ store }) => {
  const {
    resetPasswordVisible, userDetail, password
  } = store;
  const [finish, setFinish] = useState(false);
  const handleResetPasswordOk = async () => {
    await store.resetPassword({ userId: userDetail.id });
    setFinish(true);
  };
  const handleResetPasswordCancel = () => {
    store.update({
      resetPasswordVisible: false,
      password: null
    });
    setFinish(false);
  };
  const resetPasswordProps = {
    destroyOnClose: true,
    width: 500,
    title: '重置密码',
    visible: resetPasswordVisible,
    onOk: handleResetPasswordOk,
    onCancel: handleResetPasswordCancel
  };
  if (finish) {
    resetPasswordProps.footer = null;
  }
  const handleClick = () => {
    copy(password || ' ');
    message.success('复制密码成功！');
  };
  return (
    <Modal {...resetPasswordProps}>
      {!finish ? <div>
        确定重置密码？
      </div> : <div style={{ height: '50px' }}>
        该密码已经重置
        <span style={{ marginLeft: '10px' }}>
          {password}
        </span>
        <Button type="link" onClick={() => { handleClick(); }}>复制密码</Button>
      </div>}
    </Modal>
  );
});
