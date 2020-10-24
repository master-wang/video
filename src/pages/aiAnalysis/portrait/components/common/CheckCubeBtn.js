import React from 'react';
import { observer } from 'mobx-react';
// import _ from 'lodash';
// import { Icon } from 'antd';
import styles from './CheckCube.module.less';


function CheckCube({ checkItem, store, val }) {
  const { icon, desc, field } = checkItem;
  const isCotain = store.queryParams[field]
    ? store.queryParams[field].slice().includes(val) : false;

  const setState = (state) => {
    const { updateAccessory } = store;
    updateAccessory({ state, val });
  };
  return (
    <div onClick={() => setState(!isCotain)} className={isCotain ? styles['radio-wraper-select'] : styles['radio-wraper']}>
      <div className={styles['my-radio-icon']}><span className={`iconfont ${icon}`}></span></div>
      <div className={styles['cube-desc']}>
        {desc}
      </div>
    </div>
  );
}

export default observer(CheckCube);
