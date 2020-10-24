import React from 'react';
import { observer } from 'mobx-react';
import style from './NodeInfo.module.less';

export default observer(({ store: { node } }) => (
  <div className={style.node}>
    <div className="row-1">
      <span className="node-code">{`[ ${node.nodeCode || ''} ]`}</span>
      <span className="node-name">{node.nodeName}</span>
    </div>
    <div className="row-2">
      <span className="node-ip">
          节点IP：
        {node.nodeIp}
      </span>
    </div>
  </div>
));
