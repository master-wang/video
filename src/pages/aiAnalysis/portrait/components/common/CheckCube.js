import React from 'react';
import { observer } from 'mobx-react';
import CheckCubeBtn from './CheckCubeBtn';
import styles from './CheckCube.module.less';


function CheckCube({ item, store }) {
  const { title, cubeArr } = item;

  return (
    <div className={styles['cube-wrap']}>
      <span>{title}</span>
      <div>
        <div className={styles['my-radio-box']}>
          {
            cubeArr.map((checkItem, i) =>
              <CheckCubeBtn checkItem={checkItem} key={i} store={store} val={i + 1} />)
          }
        </div>
      </div>
    </div>
  );
}

export default observer(CheckCube);
