import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Modal } from 'antd';
import { useOperateTable, useRouter } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './outRoutes/SearchForm';
import DataTable from './outRoutes/DataTable';
import styles from './index.module.less';


export default observer(({ store }) => {
  const { onDelete } = useOperateTable(store);
  const { query } = useRouter();
  const { personid } = query;

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => {
        const pas = {
          personid,
          channelids: toJS(store.selectedRowKeys)
        };
        onDelete(pas);
      }
    });
  }, [onDelete]);

  const leftHeadRender = () => (
    <>
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
    <div className={styles['routes-wrap']}>
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
    </div>
  );
});
