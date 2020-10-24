import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Modal } from 'antd';
import { OperateTable } from '@/components/PageLayout';
import { useOperateTable } from '@/hooks';
import RenderTable from './renderTable';
import SearchForm from './SearchForm';
import DetailModal from './detailModal';
import styles from './index.module.less';


export default observer(({ store }) => {
  const { onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中的告警记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete({ id: JSON.stringify(store.selectedRowKeys) })
    });
  }, [onDelete]);
  const leftHeadRender = () => (
    <Button
      disabled={store.selectedRowKeys.length === 0}
      onClick={_onDelete}
    >
      批量删除
    </Button>
  );
  const rightHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <RenderTable store={store} />;
  return (
    <div className={styles['recored-wrap']}>
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      <DetailModal store={store} />
    </div>
  );
});
