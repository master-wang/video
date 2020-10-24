import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { useMount } from 'react-use';
import { useSearchForm, useCaptureWay } from '@/hooks';

const SearchForm = observer(({
  form,
  store
}) => {
  const { createWay } = useCaptureWay({ store });
  const dataToEnd = useCallback((value) => {
    const { channel } = value;
    const obj = {
      channelId: []
    };
    if (!channel) {
      delete obj.channelId;
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
    delete value.channel;
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

  const formItems = [
    {
      key: 'channel',
      component: createWay({
        Props: {
          style: { width: 210, padding: '4px' },
          onChange: onSearch
        }
      })
    }

  ];
  return createForm({ formItems });
});

export default Form.create()(SearchForm);
