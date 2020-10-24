import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, Input, Select,
  Tooltip, Icon, message, DatePicker
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useMount } from 'react-use';
import { toJS } from 'mobx';
import ControlArea from './ControlArea';
import ENUMS from '../../constants/enums';
import { genItems } from '@/utils/form';
import style from './index.module.less';


const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const formProps = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

export default Form.create()(observer(({ form, store }) => {
  const {
    visible, ControlAreaList, editInfo, info
  } = store;
  // 布控事件类型的改变
  const [eventType, setEventType] = useState('');

  // 在挂载的时候判断是新增还是编辑,是编辑则回显信息
  useEffect(() => {
    if (store.action === 'edit' && Object.keys(editInfo).length) {
      const params = toJS(editInfo);
      const infoText = {
        ...params,
        taskName: params.taskName.split('_')[0],
        time: [moment(params.startTime), moment(params.endTime)]
      };
      const areaList = JSON.parse(params.channelInfo).map((item, index) => ({
        ...item,
        id: index,
        timeRange: {
          start: moment(item.startTime, 'HH:mm:ss'), end: moment(item.endTime, 'HH:mm:ss')
        }
      }));
      setEventType(infoText.eventType);
      store.update({ info: infoText, ControlAreaList: areaList });
    }
  }, [editInfo]);

  const handleCancel = () => {
    store.update({
      visible: false, ControlAreaList: [], editInfo: {}, info: {}
    });
    setEventType('');
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      if (!ControlAreaList.length) {
        message.error('请设置布控范围！');
      }
      const channelInfo = store.ControlAreaList.map(item => {
        const tempObj = _.cloneDeep(item);
        delete tempObj.id;
        const startTime = tempObj.timeRange.start.format('HH:mm:ss');
        const endTime = tempObj.timeRange.end.format('HH:mm:ss');
        delete tempObj.timeRange;
        return {
          ...tempObj,
          startTime,
          endTime
        };
      });
      const { time, alarmThreshold, alarmInterval } = values;
      const startTime = time[0].format('YYYY-MM-DD');
      const endTime = time[1].format('YYYY-MM-DD');
      const alarmObj = {};
      if (alarmThreshold || alarmInterval) {
        alarmObj.alarmThreshold = Number(alarmThreshold);
        alarmObj.alarmInterval = Number(alarmInterval);
      }
      const params = {
        ...values,
        startTime,
        endTime,
        channelInfo: JSON.stringify(channelInfo),
        taskId: store.taskId || '',
        ...alarmObj
      };
      delete params.time;
      if (store.action === 'edit' || !params.taskId) {
        delete params.taskId;
      }
      await store.addEvent(params);
      store.queryPaging();
      handleCancel();
    });
  };

  // 设置区域的校验
  const validateErea = useCallback(async (rule, value, callback) => {
    const isValid = ControlAreaList.length;
    if (!isValid) {
      callback('请设置布控范围');
    } else {
      callback();
    }
  });

  const topItem = [
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
      key: 'eventType',
      props: {
        label: '布控事件类型'
      },
      decorator: {
        initialValue: info.eventType || '',
        rules: [
          { required: true, message: '请选择布控事件类型' }
        ]
      },
      component: <Select placeholder="请选择布控事件类型" onChange={(val) => setEventType(val)}>
        {
        ENUMS.TASK_TYPE.array.map(({ key, name }) =>
          <Option key={key} value={key}>{name}</Option>)
      }
      </Select>
    },
    {
      key: 'targetType',
      props: {
        label: '入侵告警对象'
      },
      hide: !_.get(ENUMS.TASK_TYPE.keyMap[eventType], 'showObj'),
      decorator: {
        initialValue: info.targetType || '',
        rules: [
          { required: true, message: '请选择入侵告警对象' }
        ]
      },
      component: <Select placeholder="请选择入侵告警对象">
        {
        ENUMS.ALARM_OBJ.array.map(({ key, name }) =>
          <Option key={key} value={key}>{name}</Option>)
      }
      </Select>
    },
    {
      key: 'alarmThreshold',
      props: {
        label: '人群密度报警阈值',
        extra: <span>目标区域内达到</span>,
        className: style['control-errInline']
      },
      hide: !_.get(ENUMS.TASK_TYPE.keyMap[eventType], 'showPerson'),
      decorator: {
        initialValue: info.alarmThreshold || 0,
        rules: [
          {
            pattern: /^\d+$|^\d+[.]?\d+$/,
            required: true,
            min: 0,
            message: '请输入人群密度报警阈值且大于0'
          }
        ]
      },
      component: <Input style={{ width: 96 }} suffix="人" />
    },
    {
      key: 'alarmInterval',
      props: {
        label: <span>
          <span className={style['alarm-time']}>报警频次</span>
          <Tooltip placement="right" title="人群密度持续超过阈值时，在间隔时间范围内不进行重复告警">
            <Icon type="question-circle" />
          </Tooltip>
        </span>,
        extra: <span>告警时间间隔</span>,
        className: style['control-errInline']
      },
      hide: !_.get(ENUMS.TASK_TYPE.keyMap[eventType], 'showPerson'),
      decorator: {
        initialValue: info.alarmInterval || 10,
        rules: [
          {
            pattern: /^\d+$|^\d+[.]?\d+$/,
            required: true,
            min: 0,
            message: '请输入报警频次且大于0'
          }
        ]
      },
      component: <Input style={{ width: 96 }} suffix="分钟" />
    },
    {
      key: 'channelInfo',
      props: {
        label: '布控范围'
      },
      decorator: {
        rules: [
          {
            required: true,
            validator: validateErea,
            message: '请选择布控范围'
          }
        ]
      },
      component: <div style={{ width: 609 }}>
        <ControlArea store={store} />
      </div>
    },
    {
      key: 'time',
      props: {
        label: '布控周期'
      },
      decorator: {
        initialValue: info.time || [
          moment('00:00:00', 'HH:mm:ss'),
          moment('23:59:59', 'HH:mm:ss').add(3, 'years')
        ],
        rules: [
          { required: true, message: '请输入布控周期' }
        ]
      },
      component: <RangePicker />
    },
    {
      key: 'description',
      props: {
        label: '任务描述（选填）'
      },
      decorator: {
        initialValue: info.description || ''
      },
      component: <TextArea rows={4} />
    }
  ];

  useMount(() => {
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
  });
  return (
    <Modal
      title={store.action === 'add' ? '新建布控任务' : '编辑布控任务'}
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
