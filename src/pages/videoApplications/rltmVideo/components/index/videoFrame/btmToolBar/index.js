import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
import { SvgIcon } from '@/components/Icon';
import { useFullScreen } from '@/hooks';
import videoConStore from '../../../../stores/VideoConStore';

function BtmToolBar() {
  const { frameNum, destoryPlayer } = videoConStore;
  const handleIconClick = (num) => {
    destoryPlayer(frameNum);
    videoConStore.update({
      frameNum: num,
      focusFrame: 1 // 每次切换屏幕数默认都聚焦在第一个屏幕
    });
  };

  const { createDom } = useFullScreen({ store: videoConStore, controlFied: 'fullScreenState' });

  return (
    <div className={styles['toolbar-wrap']}>
      <span
        className={frameNum === 16 ? styles.active : ''}
        onClick={() => { handleIconClick(16); }}
      >
        <SvgIcon
          name="moreView"
          className={styles['svg-icon']}
        />
      </span>
      <span
        className={frameNum === 9 ? styles.active : ''}
        onClick={() => { handleIconClick(9); }}
      >
        <SvgIcon
          name="nine"
          className={styles['svg-icon']}
        />
      </span>
      <span
        className={frameNum === 4 ? styles.active : ''}
        onClick={() => { handleIconClick(4); }}
      >
        <SvgIcon
          name="sifenpin"
          className={styles['svg-icon']}
        />
      </span>
      <span
        className={frameNum === 1 ? styles.active : ''}
        onClick={() => { handleIconClick(1); }}
      >
        <SvgIcon
          name="more"
          className={styles['svg-icon']}
        />
      </span>
      <span className={styles['enlarge-icon']}>
        {createDom({ elID: 'frame-wrap', minIcon: 'narrow', largeIcon: 'enlarge' })}
      </span>

    </div>
  );
}

export default observer(BtmToolBar);
