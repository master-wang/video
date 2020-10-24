import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Form, DatePicker } from 'antd';
import { useMount } from 'react-use';
import { useSearchForm, useCaptureWay } from '@/hooks';

const { RangePicker } = DatePicker;

const SearchForm = observer(({
  form,
  store
}) => {
  const { name } = store;
  const { createWay } = useCaptureWay({ store });
  const dataToEnd = useCallback((value) => {
    const { time, channel } = value;
    const obj = {
      startTime: '',
      endTime: '',
      channelId: []
    };
    if (time && time.length) {
      obj.startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      obj.endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
    } else {
      delete obj.startTime;
      delete obj.endTime;
    }
    if (!channel) {
      delete obj.channelId;
      return {
        ...value,
        ...obj
      };
    }
    if (typeof channel === 'string') {
      delete value.channel;
      obj.channelId = store.channelId;
      return {
        ...value,
        ...obj
      };
    }
    const { length } = channel;
    if (!length || !channel[length - 1].includes('NODE')) {
      obj.channelId = channel;
    } else {
      const arr = channel[0].split(',');
      arr.pop();
      obj.channelId = arr;
    }
    delete value.time;
    delete value.channel;
    store.update({
      channelId: obj.channelId
    });
    return {
      ...value,
      ...obj
    };
  });
  const { onSearch, createForm } = useSearchForm({ form, store, dataToEnd });

  useMount(() => {
    store.getTreeData({ id: 0 }).then((data) => {
      store.update({ treeData: data });
    });
  });

  useEffect(() => {
    if (!name) {
      return;
    }
    form.setFieldsValue({ channel: name });
  }, [name]);

  const formItems = [
    {
      key: 'channel',
      component: createWay({
        Props: {
          style: { width: 335, padding: '4px' },
          onChange: onSearch
        }
      })
    },
    {
      key: 'time',
      component: <RangePicker placeholder="选择时间范围" onChange={onSearch} />
    }


  ];
  return createForm({ formItems });
});

export default Form.create()(SearchForm);
