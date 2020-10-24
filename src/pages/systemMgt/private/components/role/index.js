import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Modal } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import ActionModal from './ActionModal';
import Config from './config';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/role';


export default observer(() => {
  const { onAdd, onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中的角色吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete(true)
    });
  }, [onDelete]);

  const leftHeadRender = () => (
    <>
      <Button icon="plus" type="primary" onClick={onAdd}>
      添加角色
      </Button>
      <Button
        disabled={store.selectedRowKeys.length === 0}
        onClick={_onDelete}
      >
      批量删除
      </Button>
    </>
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
      <Config store={store} />
    </div>
  );
});
