/* eslint-disable no-unused-vars */
import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, Input, Select,
  DatePicker, InputNumber,
  Tooltip, Icon
} from 'antd';
import moment from 'moment';
import { useMount } from 'react-use';
import { genItems } from '@/utils/form';
import style from './index.module.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const formProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

export default Form.create()(observer(({ form, store }) => {
  const {
    visible, info
  } = store;
  // 布控事件类型的改变


  const handleCancel = () => {
    store.update({
      visible: false
    });
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      const { time, taskType } = values;
      const startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      const endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
      const query = {
        ...values,
        startTime,
        endTime,
        taskType: taskType.join(',')
      };
      delete query.time;
      if (store.action === 'edit') {
        await store.updateTask({
          ...info,
          ...query
        });
      } else {
        await store.addTask(query);
      }

      store.queryPaging();
      handleCancel();
    });
  };

  const topItem = [
    {
      key: 'taskName',
      props: {
        label: '任务名称'
      },
      decorator: {
        initialValue: info.taskName || '',
        rules: [
          { required: true, message: '请输入任务名称' }
        ]
      },
      component: <Input placeholder="请输入任务名称" />
    },
    {
      key: 'deviceip',
      props: {
        label: '选择服务器'
      },
      decorator: {
        initialValue: info.deviceip || [],
        rules: [
          { required: true, message: '请选择服务器' }
        ]
      },
      component: <Select placeholder="请输入服务器名称以搜索">
        {
          store.service.map((item) =>
            <Option key={item.deviceip} value={item.deviceip}>{item.deviceName}</Option>)
        }
      </Select>
    },
    {
      key: 'taskType',
      props: {
        label: '任务类型'
      },
      decorator: {
        initialValue: info.taskType ? info.taskType.split(',') : [],
        rules: [
          { required: true, message: '请选择任务类型' }
        ]
      },
      component: <Select mode="tags" placeholder="请选择任务类型">
        <Option key={1} value="1">cpu诊断</Option>
        <Option key={2} value="2">内存诊断</Option>
        <Option key={3} value="3">网卡诊断</Option>
      </Select>
    },
    {
      key: 'time',
      props: {
        label: '开始截止时间'
      },
      decorator: {
        initialValue: info.startTime ? [moment(info.startTime), moment(info.endTime)] : [
          moment('00:00:00', 'HH:mm:ss'),
          moment('23:59:59', 'HH:mm:ss').add(3, 'years')
        ],
        rules: [
          { required: true, message: '请选择开始截止时间' }
        ]
      },
      component: <RangePicker />
    },
    {
      key: 'intervals',
      props: {
        label: <span>
          <span>扫描间隔</span>
          <Tooltip placement="right" title="间隔单位：分钟">
            <Icon type="question-circle" />
          </Tooltip>
        </span>
      },
      decorator: {
        initialValue: info.intervals || 20,
        rules: [
          { required: true, message: '请输入扫描间隔' }
        ]
      },
      component: <InputNumber />
    }
  ];

  useMount(() => {

  });
  return (
    <Modal
      title={store.action === 'add' ? '新建服务器巡检任务' : '编辑服务器巡检任务'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={860}
      destroyOnClose
      className={style['modal-wrap']}
    >
      <Form {...formProps}>
        {genItems(topItem, form)}
      </Form>
    </Modal>
  );
}));
