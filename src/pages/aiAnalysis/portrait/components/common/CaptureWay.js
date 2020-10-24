import React from 'react';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
// import ChannelTree from './ChannelTree';
import { useCaptureWay } from '@/hooks';

import styles from './CaptureWay.module.less';

function CaptureWay({ item, store }) {
  const { createWay } = useCaptureWay({ store });
  const { title } = item;
  const onChange = (vals) => {
    const { updateParams } = store;
    if (!vals.length || !vals[vals.length - 1].includes('NODE')) {
      updateParams({ channelId: vals });
      return;
    }
    // 最后一个位置是标志位，不需要，只是需要拿来做判断
    const arr = vals[0].split(',');
    arr.pop();
    updateParams({ channelId: arr });
  };
  useMount(async () => {
    await store.getTreeData({ id: 0 }).then((data) => {
      store.update({ treeData: data });
    });
  });

  return (
    <div className={styles['wrap-main']}>
      <span>{title}</span>
      <div>
        {createWay({
          Props: {
            onChange
          }
        })}
      </div>
    </div>
  );
}

export default observer(CaptureWay);
