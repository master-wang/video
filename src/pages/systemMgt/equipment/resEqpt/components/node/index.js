import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import ActionModal from './ActionModal';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/node';


export default observer(() => {
  const { onAdd } = useOperateTable(store);

  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={onAdd}>
      新增
    </Button>
  );

  const rightHeadRender = () => <SearchForm store={store} />;

  const dataRender = () => <DataTable store={store} />;

  return (
    <div className="serve-node-mgt">
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
