import React from 'react';
import {
  Upload, Button, message, Form,
  Radio
} from 'antd';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';
import ENUMS from '../../constants/enums';
import { genItems } from '@/utils/form';

const { Group } = Radio;

const formProps = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
};

export default observer(({ store, form }) => {
  const { fileList } = store;
  const beforeUpload = (file, filesList) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传JPG/PNG格式的文件!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传的图片不能超过2MB!');
      return false;
    }
    if (filesList.length > 2) {
      message.error('你只能上传两张图片！');
      return false;
    }
    store.update({ fileList: filesList });
    return isJpgOrPng && isLt2M;
  };

  const props = {
    listType: 'picture',
    defaultFileList: [...fileList],
    beforeUpload,
    customRequest: ({
      filename, file
    }) => {
      const formData = new FormData();
      formData.append(filename, file);
      // eslint-disable-next-line no-console
      // console.log(formData);
      // eslint-disable-next-line no-console
      // console.log('customRequest', toJS(fileList));
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name}文件上传成功.`);
        if (info.file.response) {
          store.update({
            fileList: info.file.response || []
          });
          return;
        }
        store.update({
          fileList: []
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}文件上传失败.`);
      }
    }
  };
  const props2 = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // eslint-disable-next-line no-console
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  const formItems = [
    {
      key: 'key',
      props: {
        label: '导入方式'
      },
      decorator: {
        initialValue: 'LOCAL',
        rules: [
          { required: true, message: '请选择导入方式' }
        ]
      },
      component: <Group>
        {
          ENUMS.REQUERE_FILE.array.map(({ key, name }) =>
            <Radio key={key} value={key}>{name}</Radio>)
        }
      </Group>
    },
    {
      key: 'key1',
      props: {
        label: '车辆信息'
      },
      decorator: {
        rules: [
          { required: true, message: '请选择车辆信息' }
        ]
      },
      component: <div>
        <Button type="link" href="" download>下载模板</Button>
        <Upload {...props2}>
          <Button icon="plus" type="primary">上传文件</Button>
        </Upload>
      </div>
    },
    {
      key: 'key2',
      props: {
        label: '车辆图片'
      },
      decorator: {
        rules: [
          { required: true, message: '请选择车辆图片' }
        ]
      },
      component: <div>
        <Upload {...props}>
          <Button icon="plus" type="primary">上传图片</Button>
        </Upload>
      </div>
    }
  ];

  return (
    <div className="clearfix">
      <Form {...formProps}>
        {genItems(formItems, form)}
      </Form>
    </div>
  );
});
