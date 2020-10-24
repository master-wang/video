import React from 'react';
import { Button, Icon, message } from 'antd';
import { observer } from 'mobx-react';
import videoChannelStore from '../../../../stores/VideoChannelStore';
import videoPlatformStore from '../../../../stores/VideoPlatformStore';
import styles from './Adjust.module.less';

const ButtonGroup = Button.Group;

function Adjust() {
  const handleClick = (e) => {
    const { value } = e.target;
    const { channelId } = videoChannelStore;
    if (!channelId) {
      message.error('请先选择视频通道');
      return;
    }
    const { adjustVideo, speed } = videoPlatformStore;
    adjustVideo({ channelId, cmd: value, speed });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles['btn-wrap']}>
        <span>光圈：</span>
        <ButtonGroup size="small" onClick={handleClick}>
          <Button value={108}><Icon type="plus" /></Button>
          <Button value={109}><Icon type="minus" /></Button>
        </ButtonGroup>
      </div>
      <div className={styles['btn-wrap']} onClick={handleClick}>
        <span>焦距：</span>
        <ButtonGroup size="small">
          <Button value={104}><Icon type="plus" /></Button>
          <Button value={105}><Icon type="minus" /></Button>
        </ButtonGroup>
      </div>
      <div className={styles['btn-wrap']}>
        <span>焦点：</span>
        <ButtonGroup size="small" onClick={handleClick}>
          <Button value={106}><Icon type="plus" /></Button>
          <Button value={107}><Icon type="minus" /></Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default observer(Adjust);
