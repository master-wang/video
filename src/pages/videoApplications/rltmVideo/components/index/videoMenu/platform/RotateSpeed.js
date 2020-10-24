import React from 'react';
import { Slider, message } from 'antd';
import { observer } from 'mobx-react';
import videoPlatformStore from '../../../../stores/VideoPlatformStore';
import videoChannelStore from '../../../../stores/VideoChannelStore';
import styles from './RotateSpeed.module.less';

function Rotate() {
  const onChange = (val) => {
    const { channelId } = videoChannelStore;
    const { adjustVideo } = videoPlatformStore;
    if (!channelId) {
      message.error('请先选择视频通道');
      return;
    }
    adjustVideo({ channelId, speed: val });
    adjustVideo({ channelId, cmd: 0, speed: val });
    videoPlatformStore.update({
      speed: val
    });
  };
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>转速：</span>
      <Slider
        className={styles.slider}
        value={videoPlatformStore.speed}
        onChange={onChange}
      />
    </div>
  );
}

export default observer(Rotate);
