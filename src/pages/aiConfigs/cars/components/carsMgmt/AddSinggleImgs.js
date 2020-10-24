import React, { useCallback } from 'react';
import {
  Upload, Modal, message, Icon
} from 'antd';
import { observer } from 'mobx-react';

export default observer(({ store }) => {
  const { fileList, previewVisible, previewImage } = store;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传照片</div>
    </div>
  );
  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const handleCancel = useCallback(() => store.update({ previewVisible: false }), [store]);
  // 文件改变的回调函数
  const handleChange = async ({ file, fileList: fileLists }) => {
    if (file.faceid) {
      return;
    }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传JPG/PNG格式的文件!');
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
    store.update({ fileList: fileLists });
  };

  const onRemove = async (promise) => {
    if (store.action === 'edit' && store.fileList.length <= 1) {
      message.info('最后主图不可删！');
      return false;
    }
    const { faceid: faceId, uid } = promise;
    if (faceId) {
      await store.deleteImg({
        faceId,
        cardbId: store.cardbId
      });
      const arr = [];
      store.fileList.forEach(item => {
        if (item.uid !== uid) {
          arr.push(item);
        }
      });
      store.update({ fileList: arr });
    }
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    store.update({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}
        beforeUpload={() => false}
      >
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
});
