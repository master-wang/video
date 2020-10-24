/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-04-09 17:33:59
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-21 17:34:57
 */
import React, { Component } from 'react';
import {
  Upload, Modal, Icon, message, Popover
} from 'antd';

const content = (
  <div>
    <p>请添加人像主图为正脸图片</p>
    <p>剩余一张主图不能删除</p>
    <p>上传图片为.JPG/.JPEG格式</p>
  </div>
);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class extends Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      isInitPropsStatus: false,
      previewImage: '',
      fileList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { initialValue } = nextProps['data-__meta'];
    const { isInitPropsStatus } = this.state;
    if (initialValue && initialValue.length && !isInitPropsStatus) {
      const arr = [];
      for (let i = 0; i < initialValue.length; i++) {
        const element = initialValue[i];
        if (element.isMain === '1') {
          arr.unshift({
            uid: element.faceid,
            name: element.faceid,
            url: `data:image/jpeg;base64,${element.inputStream}`,
            // url: this.getBase64(element.inputStream),
            status: 'done',
            isOnline: true,
            ...element
          });
        } else {
          arr.push({
            uid: element.faceid,
            name: element.faceid,
            url: `data:image/jpeg;base64,${element.inputStream}`,
            // url: this.getBase64(element.inputStream),
            status: 'done',
            isOnline: true,
            ...element
          });
        }
      }
      this.setState({
        fileList: arr,
        isInitPropsStatus: true
      });
    }
  }

  // 图片url转为base64
  getBase64(url) {
    const getBase64Image = (img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
      const dataURL = canvas.toDataURL(`image/${ext}`);
      return dataURL;
    };
    const image = new Image();
    image.crossOrigin = '';
    image.src = url;
    image.onload = function () {
      return getBase64Image(image);
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({ file, fileList }) => {
    const { onChange, store, facedbId } = this.props;
    const { fileList: oldFileList } = this.state;
    let list = [...fileList];
    if (file.status === 'removed') {
      if (fileList.length === 0) {
        list = [...oldFileList];
        message.error('仅剩一张主图,不能删除');
      } else if (file.isOnline && file.uid) {
        await store.deleteFace({ facedbId, faceId: file.uid }, () => {
          // 删除成功提示
        }, () => {
          // 删除失败提示 且保留原来的数据
          list = [...oldFileList];
        });
      }
    } else if (file.status === 'error') {
      list.pop();
      list = [...list, { ...file, status: 'done' }];
    }

    this.setState({ fileList: list }, () => {
      setTimeout(async () => {
        const arr = [];
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          const { originFileObj } = element;
          let thumbUrl = '';
          if (originFileObj) {
            // eslint-disable-next-line
            thumbUrl = await getBase64(element.originFileObj);
          }
          if (element.faceid) {
            arr.push({
              faceid: element.faceid,
              scriptFile: element.inputStream || thumbUrl,
              isMain: i === 0 ? '1' : '0'
            });
          } else {
            arr.push({
              scriptFile: element.inputStream || thumbUrl,
              isMain: i === 0 ? '1' : '0'
            });
          }
        }
        onChange && onChange(arr);
      }, 100);
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div style={{ color: '#666' }}>
        <Icon type="plus" style={{ fontSize: 20 }} />
        <div className="ant-upload-text">上传人像</div>
      </div>
    );
    return (
      <div className="clearfix">
        <div className="explain">
          人像图片
          <Popover content={content} title="人像图片说明" trigger="hover">
            <Icon type="question-circle" />
          </Popover>
        </div>
        <Upload
          listType="picture-card"
          accept="image/jpeg"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={() => false}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
