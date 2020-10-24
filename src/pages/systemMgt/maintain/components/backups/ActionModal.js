import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Upload, Icon, message
} from 'antd';
import styles from './ActionModal.module.less';

const { Dragger } = Upload;

export default observer(({ store }) => {
  const handleCancel = () => {
    store.update({ visible: false });
  };
  const handleOk = () => {
    handleCancel();
  };
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  // 文件改变的回调函数
  const handleChange = async ({ file, fileList: fileLists }) => {
    const reg = RegExp(/.sql/);
    if (!reg.exec(file.name)) {
      message.error('你只能上传.sql格式的文件!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传的图片不能超过2MB!');
      return;
    }
    for (let i = 0; i < fileLists.length; i++) {
      const element = fileLists[i];
      element.thumbUrl = element.originFileObj
        // eslint-disable-next-line no-await-in-loop
        ? await getBase64(element.originFileObj) : element.url;
    }
    setFileList(fileLists);
  };
  // console.log(fileList);
  const props = {
    name: 'file',
    fileList,
    // multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    beforeUpload: () => false,
    // onRemove,
    onChange: handleChange
  };
  const stopEvents = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      title="系统还原"
      visible={store.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={650}
      className={styles['action-modal']}
    >
      <div onClick={stopEvents} className={styles['upload-wrap']}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="plus" />
          </p>
          <p className="ant-upload-text">点击或将sql脚本文件拖拽到这里上传</p>
          <p className="ant-upload-hint">
            支持扩展名：.sql
          </p>
        </Dragger>
      </div>
    </Modal>
  );
});
