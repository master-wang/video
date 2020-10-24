import React from 'react';
import { observer } from 'mobx-react';
import style from './EqptInfo.module.less';

export default observer(({ store: { eqpt } }) => (
  <div className={style.eqpt}>
    <div className="row-1">
      <span className="eqpt-code">{`[ ${eqpt.equipmentCode || ''} ]`}</span>
      <span className="eqpt-name">{eqpt.equipmentName}</span>
    </div>
    <div className="row-2">
      <span className="eqpt-ip">
          设备IP：
        {eqpt.equipmentIp}
      </span>
    </div>
  </div>
));
