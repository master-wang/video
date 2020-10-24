import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useMount } from 'react-use';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './SearchForm';
import DataTable from './dataTable';
import AddModal from './addModal';
import BatchUserModal from './batchUserModal';
import store from '../../stores/user';

export default observer(() => {
  const addUser = () => {
    store.update({ visible: true });
  };
  const addUsers = () => {
    store.update({ batchUserVisible: true });
  };

  const leftHeadRender = () => (
    <>
      <Button
        type="primary"
        onClick={addUser}
      >
        添加用户
      </Button>
      <Button
        type="primary"
        onClick={addUsers}
      >
        批量添加
      </Button>
    </>
  );

  const rightHeadRender = () => <SearchForm store={store} />;

  const dataRender = () => <DataTable store={store} />;

  useMount(() => {
    // 获取组织机构
    // store.relateInstitute({ type: 'search', keyword: '' });
  });

  return (
    <div className="video-eqpt-mgt">
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <AddModal store={store} />
      <BatchUserModal store={store} />
    </div>
  );
});
