import React from 'react';
import { useMount, useUnmount } from 'react-use';
import { observer } from 'mobx-react';
import JdPlayer from '@/libs/jdPlayer';
import styles from './OneFrame.module.less';
import videoConStore from '../../../stores/VideoConStore';
import store from '../../../stores/eventControl';

function OneFrame() {
  useMount(() => {
    videoConStore.initPlayer(1);
    const jdPlayerInit = new JdPlayer({
      node: 'player1',
      mode: 'video'
      // debug: false
    });
    videoConStore.update({
      jdplayer1: jdPlayerInit
    });

    // 同时播放视频
    const { focusFrame } = videoConStore;
    if (videoConStore[`jdplayer${focusFrame}`]) {
      videoConStore[`jdplayer${focusFrame}`].destroy();
    }
    const jdPlayer = new JdPlayer({
      node: `player${focusFrame}`,
      mode: 'video'
      // debug: true
    });
    jdPlayer.monitorChannel({
      url: '/videobigdata/monitor/channel',
      channelId: store.channelId
    });
    videoConStore.update({
      [`jdplayer${focusFrame}`]: jdPlayer
    });
  });

  useUnmount(() => {
    videoConStore.initPlayer(1);
  });

  return (
    <div className={styles['frame-wrap']}>
      <video
        className={`${styles['video-frame']}`}
        id="player1"
      ></video>
    </div>
  );
}

export default observer(OneFrame);
