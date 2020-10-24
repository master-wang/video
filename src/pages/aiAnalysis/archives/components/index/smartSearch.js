/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Input, Icon, Menu, Dropdown, Upload, message
} from 'antd';
import styles from './index.module.less';

const { Dragger } = Upload;

export default observer(forwardRef(({ store }, ref) => {
  const { key, query, fileList } = store;
  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  // 文件改变的回调函数
  const handleChange = async ({ file, fileList: fileLists }) => {
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
    let lastFile = [];
    if (fileLists.length > 1) {
      lastFile.push(fileLists[fileLists.length - 1]);
    } else {
      lastFile = fileLists;
    }
    store.update({ fileList: lastFile });
    if (lastFile.length === 0) {
      return;
    }
    await store.update({
      query: {
        scriptFile: lastFile[0].thumbUrl
      }
    });
    store.getDataByImg();
  };

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

  const menu = (
    <Menu
      className={styles['menu-wrap']}
    >
      <Menu.Item key="0">
        <div onClick={stopEvents}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">拖拽图片到此处\选择文件</p>
            <p className="ant-upload-hint">
              图片格式支持：jpg、png
            </p>
          </Dragger>
        </div>
      </Menu.Item>
    </Menu>
  );
  const suffix = (<Dropdown
    overlay={menu}
    trigger={['click']}
    className={styles['drop-wrap']}
  >
    <Icon type="camera" className={styles['smart-icon']} />
  </Dropdown>);
  const onChange = (e) => {
    store.update({
      key: e.target.value,
      query: {
        ...query,
        key: e.target.value
      }
    });
  };

  return (
    <div className={styles['smart-wrap']}>
      {/* 智能搜索： */}
      <Input
        value={key}
        placeholder="输入关键字查询"
        style={{ width: '230px', marginLeft: '5px' }}
        suffix={suffix}
        onChange={(e) => {
          e.persist();
          onChange(e);
        }}
      />
    </div>
  );
}));
