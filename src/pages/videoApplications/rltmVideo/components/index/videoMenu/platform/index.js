import React, { useCallback } from 'react';
import { Collapse } from 'antd';
import CloudPlatform from './CloudPlatform';
import Adjust from './Adjust';
import RotateSpeed from './RotateSpeed';
import styles from './index.module.less';

const { Panel } = Collapse;

function Platform({ setCollapseState, collapseState }) {
  const changeState = useCallback(() => {
    setCollapseState(!collapseState);
  }, [collapseState]);

  return (
    <div className={styles['video-platform']}>
      {/* <div className={styles.label}>云台控制</div> */}
      <Collapse defaultActiveKey={[]} onChange={changeState}>
        <Panel header="云台控制" key="1">
          <CloudPlatform />
          <Adjust />
          <div className={styles.clearfix}></div>
          <RotateSpeed />
        </Panel>
      </Collapse>
    </div>
  );
}

export default Platform;
