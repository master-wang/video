import React from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import JdPlayer from '@/libs/jdPlayer';
import { useScreenshot, useFullScreen } from '@/hooks';
import styles from './FourFrame.module.less';
import videoConStore from '../../../../stores/VideoConStore';

function FourFrame() {
  const { focusFrame } = videoConStore;
  const initPlayer = () => {
    for (let i = 0; i < 4; i++) {
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
    videoConStore.initPlayer(4);
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

  const renderFunc = () => {
    const render = [];
    for (let i = 0; i < 4; i++) {
      const func = () => { handleClickVideo(i + 1); };
      const item = (
        <div
          className={styles['four-frame']}
          key={i}
          onClick={func}
        >
          <div
            className={`${styles['video-frame']} ${(focusFrame === (i + 1)) ? styles.active : ''}`}
            id={`player1-box${i}`}
          >
            <div className={styles['frame-tool']}>
              {createBtn({ elID: `player${i + 1}`, title: '截图' })}
              {createDom({ elID: `player1-box${i}`, title: '全屏' })}
              <Button style={{ marginLeft: '12px' }} onClick={() => close({ elID: `player${i + 1}`, unit: i + 1 })}>关闭</Button>
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
