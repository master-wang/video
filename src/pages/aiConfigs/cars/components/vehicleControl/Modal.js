import React, { useEffect } from 'react';
import {
  Modal, Form, Input, Select,
  DatePicker
} from 'antd';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { toJS } from 'mobx';
import moment from 'moment';
import { useCaptureWay } from '@/hooks';
import { genItems } from '@/utils/form';
import style from './index.module.less';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const formProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const ActionModal = observer(({ store, form }) => {
  const {
    visible, editInfo, info, garageList, action
  } = store;

  const { createWay, getChannelList, getChennels } = useCaptureWay({ store });

  const handleCancel = () => {
    store.update({ editInfo: {}, info: {} });
    store.reset(['visible']);
    form.setFieldsValue({ channelInfo: null });
  };

  const dataToEnd = (values) => {
    const { cardbInfo, channelInfo, time } = values;
    const channelIds = getChannelList(channelInfo);
    const arr = [];
    const chennels = getChennels();
    chennels.forEach(item => {
      if (channelIds.indexOf(item.channelId) > -1) {
        arr.push(item);
      }
    });
    const cardbInfoArr = [];
    garageList.forEach(item => {
      if (cardbInfo.indexOf(item.cardbId) > -1) {
        cardbInfoArr.push(item);
      }
    });
    return {
      ...editInfo,
      ...values,
      cardbInfo: JSON.stringify(cardbInfoArr),
      channelInfo: store.action === 'edit' ? null : toJS(arr),
      startTime: time[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: time[1].format('YYYY-MM-DD HH:mm:ss')
    };
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      const params = dataToEnd(values);
      if (store.action === 'edit') {
        await store.edit(params);
      } else {
        await store.addGarage(params);
      }
      store.queryPaging();
      handleCancel();
    });
  };

  // eslint-disable-next-line no-unused-vars
  const LableItem = (value) => <Input disabled value={info.channelName} />;

  const formItems = [
    {
      key: 'taskName',
      props: {
        label: '布控任务名称'
      },
      decorator: {
        initialValue: info.taskName || '',
        rules: [
          { required: true, message: '请输入布控任务名称' }
        ]
      },
      component: <Input placeholder="请输入布控任务名称" />
    },
    {
      key: 'cardbInfo',
      props: {
        label: '布控车辆库'
      },
      decorator: {
        initialValue: info.cardbInfo || [],
        rules: [
          { required: true, message: '请选择布控车辆库' }
        ]
      },
      component: <Select placeholder="请选择布控车辆库" mode="multiple">
        {
          garageList.map(({ cardbId, cardbName }) =>
            <Option key={cardbId} value={cardbId}>{cardbName}</Option>)
        }
      </Select>
    },
    {
      key: 'channelInfo',
      props: {
        label: '视频源通道'
      },
      decorator: {
        initialValue: store.action === 'edit' ? info.channelInfo : null,
        rules: [
          { required: true, message: '请选择视频源通道' }
        ]
      },
      component: action === 'edit' ? <LableItem /> : createWay({ style: { width: 335 } })
    },
    {
      key: 'time',
      props: {
        label: '布控时间'
      },
      decorator: {
        initialValue: info.time || [
          moment('00:00:00', 'HH:mm:ss'),
          moment('23:59:59', 'HH:mm:ss').add(3, 'years')
        ],
        rules: [
          { required: true, message: '请选择布控时间' }
        ]
      },
      component: <RangePicker
        placeholder="请选择布控时间"
        format="YYYY-MM-DD"
      />
    },
    {
      key: 'description',
      props: {
        label: '任务描述'
      },
      decorator: {
        initialValue: info.description || ''
      },
      component: <TextArea rows={4} placeholder="请输入任务描述" />
    }
  ];

  useMount(() => {
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
  });

  // 在挂载的时候判断是新增还是编辑,是编辑则回显信息
  useEffect(() => {
    if (store.action === 'edit' && Object.keys(editInfo).length) {
      const {
        taskName, cardbInfo, channelId, description, endTime, startTime, channelName
      } = editInfo;
      const name = taskName.split('_')[0];
      const dbIds = [];
      JSON.parse(cardbInfo).forEach(item => {
        dbIds.push(item.cardbId);
      });
      const channelInfo = [channelId];
      const time = [moment(startTime), moment(endTime)];
      const fixInfo = {
        taskName: name,
        cardbInfo: dbIds,
        channelInfo,
        time,
        description,
        channelName
      };
      store.update({ info: fixInfo });
    }
  }, [editInfo]);

  return (
    <Modal
      title={store.action === 'add' ? '新建布控任务' : '编辑布控任务'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={640}
      className={style['modal-wrap']}
      destroyOnClose
    >
      <Form {...formProps}>
        {genItems(formItems, form)}
      </Form>
    </Modal>
  );
});

export default Form.create()(ActionModal);
