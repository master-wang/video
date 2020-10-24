import React from 'react';
import { useMount, useUnmount } from 'react-use';
import { observer } from 'mobx-react';
import JdPlayer from '@/libs/jdPlayer';
import { useScreenshot, useFullScreen } from '@/hooks';
import SvgIcon from '@/components/Icon/Svg';
import styles from './OneFrame.module.less';
import videoConStore from '../../../../stores/VideoConStore';

function OneFrame() {
  useMount(() => {
    videoConStore.initPlayer(1);
    const jdPlayer = new JdPlayer({
      node: 'player1',
      mode: 'video'
      // debug: false
    });
    videoConStore.update({
      jdplayer1: jdPlayer
    });
  });

  useUnmount(() => {
    videoConStore.initPlayer(1);
  });

  const { createBtn } = useScreenshot();

  const { createDom, exitFullscreen } = useFullScreen({ store: videoConStore, controlFied: 'fullScreenState' });
  const close = ({ elID }) => {
    if (videoConStore.fullScreenState) {
      exitFullscreen();
    }
    const ele = document.getElementById(elID);
    videoConStore.update({ fullScreenState: false });
    videoConStore.destoryAllPlayer();
    ele.removeAttribute('src');
    ele.load();
  };

  const { fullScreenState } = videoConStore;

  return (
    <div className={styles['frame-wrap']} id="player1-box">
      <div className={!fullScreenState ? styles['frame-tool'] : [styles['frame-tool'], styles['frame-tool-fill']].join(' ')}>
        {createBtn({ elID: 'player1', icon: 'screenshot' })}
        {createDom({ elID: 'player1-box', minIcon: 'narrow', largeIcon: 'enlarge' })}
        <span className={styles['video-btn']} onClick={() => close({ elID: 'player1' })}>
          <SvgIcon name="close" />
        </span>
      </div>
      <video
        className={`${styles['video-frame']}`}
        id="player1"
      ></video>
    </div>
  );
}

export default observer(OneFrame);
