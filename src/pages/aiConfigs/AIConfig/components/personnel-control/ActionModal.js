/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-24 16:12:41
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 16:05:35
 */
import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Form, Input
} from 'antd';
import { useMount } from 'react-use';
import moment from 'moment';
import { useActionModal, useCaptureWay } from '@/hooks';
import LibInfoList from './widgets/LibInfoList';
// import TreeSelectInput from './widgets/TreeSelectInput';
import RangePicker from './widgets/RangePicker';
import style from './ActionModal.module.less';

const { TextArea } = Input;

const ActionModal = observer(({
  form,
  store
}) => {
  const { action, entity } = store;
  const { createWay, getChennels, getChannelList } = useCaptureWay({ store });
  // const [treeData, setTreeData] = useState([]);
  const [faceLibList, setFaceLibList] = useState([]);
  useMount(() => {
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
    store.queryFaceLibTree({}, data => {
      setFaceLibList(data);
    });
  });
  const dataToEnd = useCallback(({
    time, facedbInfo, channelInfo, ...rest
  }) => {
    // const { keyList, arr } = channelInfo;
    let startTime;
    let endTime;
    if (time) {
      startTime = time[0] && moment(time[0]).format('YYYY-MM-DD');
      endTime = time[1] && moment(time[1]).format('YYYY-MM-DD');
    }
    for (let i = 0; i < facedbInfo.length; i++) {
      const element = facedbInfo[i];
      if (element.similarity) {
        element.similarity = `${element.similarity / 100}`;
        delete element.key;
      }
    }
    const arr = [];
    const channelIds = getChannelList(channelInfo);
    const chennels = getChennels();
    chennels.forEach(item => {
      if (channelIds.indexOf(item.channelId) > -1) {
        arr.push(item);
      }
    });
    return {
      ...entity,
      startTime,
      endTime,
      // keyList: keyList.toString(),
      channelInfo: store.action === 'edit' ? null : arr.slice(),
      facedbInfo: JSON.stringify(facedbInfo),
      ...rest
    };
  });
  const { createModal } = useActionModal({
    name: '布控任务', form, store, dataToEnd
  });

  // eslint-disable-next-line no-unused-vars
  const LableItem = () => <Input disabled value={entity.channelName} />;
  const formItems = [
    {
      key: 'taskName',
      props: {
        label: '布控任务名称'
      },
      decorator: {
        initialValue: entity.taskName,
        rules: [
          { required: true, message: '请输所属单位' }
        ]
      },
      component: <Input />
    },
    {
      key: 'facedbInfo',
      props: {
        label: '布控人口库'
      },
      // decorator: {
      //   rules: [
      //     { required: true, message: '请输所属单位' }
      //   ]
      // },
      component: <LibInfoList facedbInfo={entity.facedbInfo} faceLibList={faceLibList} />
    },
    {
      key: 'channelInfo',
      props: {
        label: '视频源通道'
      },
      // component: <TreeSelectInput disabled={action === 'edit'}
      // keyList={entity.keyList} treeData={treeData} />
      component: action === 'edit' ? <LableItem /> : createWay({ style: { width: 335 } })
    },
    {
      key: 'time',
      props: {
        label: '布控时间'
      },
      component: <RangePicker entity={entity} />
    },
    {
      key: 'description',
      props: {
        label: '任务描述（描述）'
      },
      decorator: {
        initialValue: entity.description,
        rules: [
          { max: 50, message: '节点描述不能超过50个字符' }
        ]
      },
      component: <TextArea />
    }
  ];
  return createModal({
    modalProps: {
      width: 640,
      destroyOnClose: true,
      className: style['action-modal']
    },
    formProps: {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    },
    formItems
  });
});


export default Form.create()(ActionModal);
