import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { OperateTable } from '@/components/PageLayout';
import Bread from '@/layouts/BasicLayout/Bread';
import {
  NodeInfo, SearchForm, DataTable, ActionModal
} from './components/unit';
import store from './stores/unit';

/**
 * 服务单元管理
 */
export default observer(() => {
  const leftHeadRender = () => <NodeInfo store={store} />;

  const rightHeadRender = () => <SearchForm store={store} />;

  const dataRender = () => <DataTable store={store} />;

  const breadItems = useMemo(() => [
    { id: 1, name: '服务节点管理', path: '/systemMgt/resEqpt?key=node' },
    { id: 2, name: '服务单元管理' }
  ]);
  return (
    <div className="p-base">
      <Bread items={breadItems} />
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
