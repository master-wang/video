import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.module.less';
import OneFrame from './OneFrame';
// import FourFrame from './FourFrame';
import Frame from './Frame';
import videoConStore from '../../../../stores/VideoConStore';

function VideoCon() {
  const { frameNum } = videoConStore;
  if (frameNum === 1) {
    return (
      <div className={styles['con-wrap']} id="frame-wrap">
        <OneFrame />
        {/* <canvas id="canvas" style={{ width: 'auto', height: '100%' }}></canvas> */}
      </div>
    );
  }
  return (
    <div className={styles['con-wrap']} id="frame-wrap">
      <Frame />
    </div>
  );
}

export default observer(VideoCon);
