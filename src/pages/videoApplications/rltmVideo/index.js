import React from 'react';
import styles from './index.module.less';
import VideoMenu from './components/index/videoMenu';
import VideoFrame from './components/index/videoFrame';

function rltmVideo() {
  return (
    <div className={styles['p-rltm-video-warp']}>
      <div className={styles['video-menu']}>
        <VideoMenu />
      </div>
      <div className={styles['video-content']}>
        <VideoFrame />
      </div>
    </div>
  );
}

export default rltmVideo;
