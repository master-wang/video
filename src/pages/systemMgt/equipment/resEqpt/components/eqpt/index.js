/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Icon } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './SearchForm';
import ActionModal from './ActionModal';
import DataTable from './DataTable';
import store from '../../stores/eqpt';

export default observer(() => {
  const { onAdd, onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中的设备吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete(true)
    });
  }, [onDelete]);

  const leftHeadRender = () => (
    <>
      <Button icon="plus" type="primary" onClick={onAdd}>新增</Button>
      <Button
        disabled={store.selectedRowKeys.length === 0}
        onClick={_onDelete}
      >
        删除
      </Button>
    </>
  );

  const rightHeadRender = () => <SearchForm store={store} />;

  const dataRender = () => <DataTable store={store} />;

  return (
    <div className="video-eqpt-mgt">
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
