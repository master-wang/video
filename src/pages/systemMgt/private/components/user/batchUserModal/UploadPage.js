import React, { useEffect, useCallback, useState } from 'react';
import {
  Form, Button, Table, Upload, Icon, message,
  Input
} from 'antd';
import { observer } from 'mobx-react';
import api from '../../../services/user';
import style from './UploadPage.module.less';

const { PUBLIC_URL } = process.env;
const { Item: FormItem } = Form;
// const { SHOW_ALL } = TreeSelect;

const UploadPage = observer(({ store, form }) => {
  const {
    fileList, errFileLise,
    extendField
  } = store;
  const { getFieldDecorator } = form;

  const [userForm, setUserForm] = useState([]);
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
      title: '手机号'
    },
    {
      dataIndex: 'mail',
      title: '邮箱'
    },
    {
      dataIndex: 'userStatus',
      title: '状态',
      render: (statu) => (statu === 'ACTIVE' ? <span style={{ color: '#26FF4A' }}>成功</span>
        : <span style={{ color: '#E94A4A' }}>失败</span>)
    }
  ];

  const props = {
    name: 'file',
    customRequest: ({
      filename, file, onSuccess, onError
    }) => {
      const formData = new FormData();
      formData.append(filename, file);
      api.excelUpload(formData)
        .then((res) => {
          onSuccess(res, file);
        })
        .catch(onError);
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name}文件上传成功.`);
        if (info.file.response) {
          const uList = info.file.response.activeUsers.map((item) => ({
            ...item,
            extendColumn: {}
          }));
          const errList = info.file.response.unactiveUsers.map((item) => ({
            ...item,
            failed: true
          }));
          store.update({
            fileList: uList,
            errFileLise: errList || []
          });
          return;
        }
        store.update({
          fileList: [],
          errFileLise: []
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}文件上传失败.`);
      }
    }
  };

  const getUploadUsers = useCallback(() => {
    const arr = errFileLise.slice().concat(fileList.slice());
    return arr;
  }, [fileList, errFileLise]);


  const formProps = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 }
  };
  // const inputChange = ({ userName, val, field }) => {
  //   const { updateRule } = store;
  //   updateRule({
  //     userName, field: [field], val: [val], listField: 'fileList'
  //   });
  // };


  // 处理扩展字段
  useEffect(() => {
    if (!extendField) {
      setUserForm(columns);
      return;
    }
    const { extendColumnMap } = extendField;
    extendColumnMap.forEach((item) => {
      if (item.isDisplay) {
        columns.push({
          dataIndex: item.name,
          title: item.displayName,
          render: (text, { userName, failed }) => (failed ? null : <FormItem>
            {getFieldDecorator(`${item.name}_${userName}`, {
              rules: [
                {
                  required: true,
                  message: `请输入${item.displayName}`
                },
                { max: item.length, message: `长度不超过${item.length}个字符` }
              ]
            })(<Input placeholder={`请输入${item.displayName}`} style={{ width: '150px' }} />)}
          </FormItem>)
        });
      }
    });
    setUserForm(columns);
  }, [extendField]);

  return (
    <div className={style['upload-page']}>
      <Upload {...props}>
        <Button type="primary">
          <Icon type="upload" />
          上传Excel
        </Button>
      </Upload>
      <Button
        className={style['template-btn']}
        icon="download"
        download
        href={`${PUBLIC_URL}/templates/批量用户模板.xlsx`}
      >
      下载模版
      </Button>
      <Form {...formProps}>
        <Table
          rowKey="userName"
          style={{ marginTop: 20 }}
          columns={userForm}
          dataSource={getUploadUsers()}
          pagination={false}
          scroll={{ y: 240 }}
        />
        {/* <div style={{ marginTop: 20 }}>
          <FormItem label="关联组织机构">
            {getFieldDecorator('organization', {
              rules: [
                {
                  required: true,
                  message: '请选择组织机构'
                }
              ]
            })(<TreeSelect
              // onChange={handleTreeSelect}
              style={{ width: 272 }}
              treeNodeFilterProp="title"
              allowClear
              showSearch
              treeData={relateInsData}
              showCheckedStrategy={SHOW_ALL}
              placeholder="请选择关联组织机构"
            >
            </TreeSelect>)}
          </FormItem>
        </div> */}
      </Form>
      {/* <div style={{ marginTop: 20 }}>
        <Form autoComplete="off" {...formProps}>
          {genItems(userForm, form)}
        </Form>
      </div> */}
    </div>
  );
});

export default UploadPage;
