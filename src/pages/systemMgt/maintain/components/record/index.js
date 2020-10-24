import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Modal, Icon } from 'antd';
import { useMount } from 'react-use';
import { OperateTable } from '@/components/PageLayout';
import { useOperateTable } from '@/hooks';
import SearchForm from './SearchForm';
import DataTable from './dataTable';
import store from '../../stores/record';

export default observer(() => {
  const { onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete({ ids: store.selectedRowKeys })
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
    </div>
  );
});
