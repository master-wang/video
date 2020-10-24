import React from 'react';
import styles from './index.module.less';
import BtmToolBar from './btmToolBar';
import VideoCon from './videoCon';

function VideoFrame() {
  return (
    <div className={styles['video-frame-wrap']}>
      <VideoCon />
      <BtmToolBar />
    </div>
  );
}

export default VideoFrame;
