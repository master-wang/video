import React from 'react';
import { Icon, message } from 'antd';
import { observer } from 'mobx-react';
import styles from './CloudPlatform.module.less';
import videoChannelStore from '../../../../stores/VideoChannelStore';
import videoPlatformStore from '../../../../stores/VideoPlatformStore';

function Platform() {
  const handleClick = (cmd) => {
    const { channelId } = videoChannelStore;
    if (!channelId) {
      message.error('请先选择视频通道');
      return;
    }
    const { adjustVideo, speed } = videoPlatformStore;
    adjustVideo({ channelId, cmd, speed });
    adjustVideo({ channelId, cmd: 0, speed });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.menu}>
        <div
          className={`${styles.item1} ${styles.item}`}
          onClick={() => { handleClick(100); }}
        >
          <div className={styles.content}>
            <Icon type="caret-up" />
          </div>
        </div>
        <div
          className={`${styles.item2} ${styles.item}`}
          onClick={() => { handleClick(113); }}
        >
          <div className={styles.content}>
            <div className={styles.spot}></div>
          </div>
        </div>
        <div
          className={`${styles.item3} ${styles.item}`}
          onClick={() => { handleClick(103); }}
        >
          <div className={styles.content}>
            <Icon type="caret-right" />
          </div>
        </div>
        <div
          className={`${styles.item4} ${styles.item}`}
          onClick={() => { handleClick(114); }}
        >
          <div className={styles.content}>
            <div className={styles.spot}></div>
          </div>
        </div>
        <div
          className={`${styles.item5} ${styles.item}`}
          onClick={() => { handleClick(101); }}
        >
          <div className={styles.content}>
            <Icon type="caret-down" />
          </div>
        </div>
        <div
          className={`${styles.item6} ${styles.item}`}
          onClick={() => { handleClick(116); }}
        >
          <div className={styles.content}>
            <div className={styles.spot}></div>
          </div>
        </div>
        <div
          className={`${styles.item7} ${styles.item}`}
          onClick={() => { handleClick(102); }}
        >
          <div className={styles.content}>
            <Icon type="caret-left" />
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.wrapper6}>
          <div
            className={`${styles.item8} ${styles.item}`}
            onClick={() => { handleClick(115); }}
          >
            <div className={styles.content}>
              <div className={styles.spot}></div>
            </div>
          </div>
        </div>
        <div className={styles.center}></div>
      </div>
    </div>
  );
}

export default observer(Platform);
