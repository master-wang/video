import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Icon } from 'antd';
import { OperateTable } from '@/components/PageLayout';
import { useOperateTable } from '@/hooks';
import ActionModal from './ActionModal';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/backups';


export default observer(() => {
  const { onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete(true)
    });
  }, [onDelete]);
  const showModal = () => {
    store.update({ visible: true });
  };
  const leftHeadRender = () => (
    <>
      <Button
        disabled={store.selectedRowKeys.length === 0}
        onClick={_onDelete}
      >
        批量删除
      </Button>
      <Button icon="plus" type="primary" onClick={showModal}>
      系统还原
      </Button>
      <Button
        icon="download"
        type="primary"
      >
      系统备份
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
    </div>
  );
});
