import React, { useCallback } from 'react';
import {
  Collapse, Icon, Button, Form,
  Select, InputNumber, Upload,
  Modal, message
} from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { genItems } from '@/utils/form';
import styles from './index.module.less';

const { Panel } = Collapse;
const { Option } = Select;

export default Form.create()(observer(({ store, form }) => {
  const { facelibs } = store;
  // 重置
  const reSet = useCallback(() => {
    form.resetFields();
    store.reset(['query', 'pagination']);
  }, [form, store]);

  // 定时查询对比任务
  const interSeach = (taskId) => {
    const obj = {
      i: 0,
      inter: null
    };
    const getRes = async () => {
      if (store.dataSource.length !== 0 || obj.i === 20) {
        obj.inter && clearInterval(obj.inter);
        store.update({
          loading: false
        });
        return;
      }
      await store.queryPaging({
        query: { taskId },
        pagination: { current: 1 }
      });
      obj.i += 1;
      store.update({
        loading: true
      });
    };
    obj.inter = setInterval(getRes, 1000);
  };

  // 查询
  const onSeach = useCallback(() => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      const list = toJS(store.fileList);
      if (list.length === 0) {
        message.error('未选择人脸图片！');
        return;
      }
      const { facedbList, similarity } = values;
      const nowImg = list[list.length - 1];
      const params = {
        ...values,
        facedbList: facedbList.join(','),
        similarity: Number(similarity) / 100,
        compareFace: [{ scriptFile: nowImg.thumbUrl }]
      };
      const { uid } = nowImg;
      // 判断任务是否存在
      const obj = {
        isExit: false,
        taskId: ''
      };
      store.tasks.forEach(item => {
        if (item.uid === uid) {
          obj.isExit = true;
          obj.taskId = item.taskId;
        }
      });
      // 如果存在此任务则直接执行
      if (obj.isExit) {
        store.update({
          loading: true
        });
        message.info('人脸对比当中，请耐心等待！');
        setTimeout(async () => {
          // 通过任务ID查看对比列表
          await store.queryPaging({
            query: { taskId: obj.taskId },
            pagination: { current: 1 }
          });
          store.update({
            loading: false
          });
        }, 0);
        return;
      }
      // 如果不存在此任务则直接创建在执行
      // 新建对比任务
      await store.createTask(params);
      const taskId = store.taskId[0];
      // 保存任务
      const oldList = store.tasks;
      oldList.push({
        uid, taskId
      });
      store.update({
        tasks: oldList,
        loading: true
      });
      message.info('人脸对比当中，请耐心等待！');
      // setTimeout(async () => {
      // // 通过任务ID查看对比列表
      //   await store.queryPaging({
      //     query: { taskId },
      //     pagination: { current: 1 }
      //   });
      //   store.update({
      //     loading: false
      //   });
      // }, 0);
      interSeach(taskId);
    });
  }, [store]);

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const handleCancel = useCallback(() => store.update({ previewVisible: false }), [store]);
  // 点击浏览图片的回调函数
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const { uid } = file;
    const obj = {
      isExit: false,
      taskId: ''
    };
    store.tasks.forEach(item => {
      if (item.uid === uid) {
        obj.isExit = true;
        obj.taskId = item.taskId;
      }
    });
    // 如果存在此任务则直接执行
    if (obj.isExit) {
      store.update({
        loading: true
      });
      message.info('人脸对比当中，请耐心等待！');
      setTimeout(async () => {
        // 通过任务ID查看对比列表
        await store.queryPaging({
          query: { taskId: obj.taskId },
          pagination: { current: 1 }
        });
        store.update({
          loading: false
        });
      }, 0);
      return;
    }
    // 如果不存在此任务则直接创建在执行
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      const { facedbList } = values;
      const nowImg = file;
      const params = {
        ...values,
        facedbList: facedbList.join(','),
        compareFace: [{ scriptFile: nowImg.thumbUrl }]
      };
      // 新建对比任务
      await store.createTask(params);
      const taskId = store.taskId[0];
      // 保存任务
      const oldList = store.tasks;
      oldList.push({
        uid, taskId
      });
      store.update({
        tasks: oldList,
        loading: true
      });
      message.info('人脸对比当中，请耐心等待！');
      // setTimeout(async () => {
      // // 通过任务ID查看对比列表
      //   await store.queryPaging({
      //     query: { taskId },
      //     pagination: { current: 1 }
      //   });
      //   store.update({
      //     loading: false
      //   });
      // }, 5000);
      interSeach(taskId);
    });

    // 浏览图片
    // store.update({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true
    // });
  };
  // 删除图片的回调函数
  const handleMove = (promise) => {
    const { uid } = promise;
    const obj = { taskId: '', isExit: false };
    const arr = [];
    store.tasks.forEach(item => {
      if (item.uid === uid) {
        obj.taskId = item.taskId;
        obj.isExit = true;
      } else {
        arr.push(item);
      }
    });
    if (!obj.isExit) {
      return;
    }
    store.update({ tasks: arr });
    store.deleteTask({ id: obj.taskId });
  };
  // 选择文件的回调函数
  const handleChange = async ({ file, fileList }) => {
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
    for (let i = 0; i < fileList.length; i++) {
      const element = fileList[i];
      // eslint-disable-next-line no-await-in-loop
      element.thumbUrl = await getBase64(element.originFileObj);
    }
    store.update({ fileList });
  };

  const { previewVisible, previewImage, fileList } = store;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传照片</div>
    </div>
  );

  const queryFormItems = [
    {
      key: 'title1',
      component: <span>人脸照片</span>
    },
    {
      key: 'radioTime',
      component: <div className={styles.clearfix}>
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleMove}
          className={styles['upload-wrap']}
          beforeUpload={() => false}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    },
    {
      key: 'title2',
      component: <span>人口库</span>
    },
    {
      key: 'facedbList',
      decorator: {
        rules: [
          { required: true, message: '请选择人口库' }
        ]
      },
      component: <Select
        mode="multiple"
        placeholder="请选择人口库"
      >
        {
          facelibs.map(({ facebdName, facedbId }) =>
            <Option key={facedbId} val={facedbId}>{facebdName}</Option>)
        }
      </Select>
    },
    {
      key: 'title3',
      component: <span>相似度</span>
    },
    {
      key: 'similarity',
      decorator: {
        initialValue: 80,
        rules: [
          { required: true, message: '请设置相似度' }
        ]
      },
      component: <InputNumber
        min={0}
        max={100}
        formatter={value => `${value}%`}
        parser={value => value.replace('%', '')}
        className={styles['form-number']}
      />
    },
    {
      key: 'title4',
      component: <span>展示TopN</span>
    },
    {
      key: 'top',
      decorator: {
        initialValue: 10,
        rules: [
          { required: true, message: '请设置top' }
        ]
      },
      component: <InputNumber min={0} max={100} className={styles['form-number']} />
    }
  ];

  return (
    <div className={styles['indexLeft-wrap']}>
      <Form>
        <div className={styles['indexLeft-top']}>
          <Collapse
            defaultActiveKey="query"
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
          >
            <Panel header="查询条件" key="query">
              {genItems(queryFormItems, form)}
            </Panel>
          </Collapse>
        </div>
        <div className={styles['indexLeft-botom']}>
          <Button onClick={reSet}>重置</Button>
          <Button onClick={onSeach}>查询</Button>
        </div>
      </Form>
    </div>
  );
}));
