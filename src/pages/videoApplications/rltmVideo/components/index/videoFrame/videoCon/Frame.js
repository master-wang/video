import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import JdPlayer from '@/libs/jdPlayer';
import { useScreenshot, useFullScreen } from '@/hooks';
import SvgIcon from '@/components/Icon/Svg';
import styles from './Frame.module.less';
import videoConStore from '../../../../stores/VideoConStore';

function FourFrame() {
  const { focusFrame, frameNum } = videoConStore;
  const initPlayer = () => {
    for (let i = 0; i < frameNum; i++) {
      const jdPlayer = new JdPlayer({
        node: `player${i + 1}`,
        mode: 'video'
        // debug: false
      });
      videoConStore.update({
        [`jdplayer${i + 1}`]: jdPlayer
      });
    }
  };

  const handleClickVideo = (num) => {
    videoConStore.update({
      focusFrame: num
    });
  };

  useMount(() => {
    videoConStore.initPlayer(frameNum);
    initPlayer();
  });

  const { createBtn } = useScreenshot();

  const { createDom, exitFullscreen } = useFullScreen({ store: videoConStore, controlFied: 'fullScreenState' });
  const close = ({ elID, unit }) => {
    if (videoConStore.fullScreenState) {
      exitFullscreen();
    }
    const ele = document.getElementById(elID);
    videoConStore.update({ fullScreenState: false });
    videoConStore.destoryAllPlayer(unit);
    ele.removeAttribute('src');
    ele.load();
  };

  const { fullScreenState } = videoConStore;

  const renderFunc = () => {
    const render = [];
    const num = 100 / Math.sqrt(frameNum);
    for (let i = 0; i < frameNum; i++) {
      const func = () => { handleClickVideo(i + 1); };
      const item = (
        <div
          className={styles['four-frame']}
          key={i}
          onClick={func}
          style={{
            height: `${num}%`,
            width: `${num}%`
          }}
        >
          <div
            className={`${styles['video-frame']} ${(focusFrame === (i + 1)) ? styles.active : ''}`}
            id={`player1-box${i}`}
          >
            <div className={!fullScreenState ? styles['frame-tool'] : [styles['frame-tool'], styles['frame-tool-fill']].join(' ')}>
              {createBtn({ elID: `player${i + 1}`, icon: 'screenshot' })}
              {createDom({ elID: `player1-box${i}`, minIcon: 'narrow', largeIcon: 'enlarge' })}
              <span className={styles['video-btn']} onClick={() => close({ elID: `player${i + 1}`, unit: i + 1 })}>
                <SvgIcon name="close" />
              </span>
            </div>
            <video
              id={`player${i + 1}`}
            ></video>
          </div>
        </div>
      );
      render.push(item);
    }
    return render;
  };
  return (
    <div className={styles.wrap}>
      {renderFunc()}
    </div>
  );
}

export default observer(FourFrame);
