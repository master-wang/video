/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:14:52
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-03-27 12:17:46
 */
import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import ActionModal from './ActionModal';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/population';


export default observer(() => {
  const { onAdd } = useOperateTable(store);
  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={onAdd}>
      新建人口库
    </Button>
  );
  const rightHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <DataTable store={store} />;
  return (
    <div className="population">
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
