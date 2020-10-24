import React from 'react';
import ChannelTree from './ChannelTree';
import styles from './index.module.less';

function VideoChannel({ collapseState }) {
  return (
    <div className={!collapseState ? styles['video-channel-long'] : styles['video-channel']}>
      <div className={styles.title}>
        视频通道
      </div>
      <ChannelTree />
    </div>
  );
}

export default VideoChannel;
