/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:14:52
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-08 15:41:53
 */
import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import ActionModal from './ActionModal';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/personnel-control';

export default observer(() => {
  const { onAdd } = useOperateTable(store);
  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={onAdd}>
      新建布控任务
    </Button>
  );
  const rightHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <DataTable store={store} />;
  return (
    <div className="personnel-control">
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
