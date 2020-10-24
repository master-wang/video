import React from 'react';
import { observer } from 'mobx-react';
import style from './OperateTable.module.less';

const OperateTable = observer(({
  topHeadRender,
  leftHeadRender,
  rightHeadRender,
  dataRender
}) => (
  <div className={style['operate-table']}>
    <div className="table-hd f-cb">
      {
        topHeadRender ? <div className="f-top">{topHeadRender()}</div> : null
      }
      <>
        <div className="col-l f-fl">
          {leftHeadRender && leftHeadRender()}
        </div>
        <div className="col-r f-fr">
          {rightHeadRender && rightHeadRender()}
        </div>
      </>
    </div>
    <div className="table-bd">
      {dataRender && dataRender()}
    </div>
  </div>
));

export default OperateTable;
