import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import Bread from '@/layouts/BasicLayout/Bread';
import { OperateTable } from '@/components/PageLayout';
import {
  EqptInfo, SearchForm, DataTable, ActionModal
} from './components/channel';
import store from './stores/channel';

/**
 * 视频设备通道管理
 */
export default observer(() => {
  const leftHeadRender = () => <EqptInfo store={store} />;
  const rightHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <DataTable store={store} />;
  const breadItems = useMemo(() => [
    { id: 1, name: '视频设备管理', path: '/systemMgt/resEqpt?key=eqpt' },
    { id: 2, name: '通道管理' }
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
