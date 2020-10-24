import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Modal } from 'antd';
import { OperateTable } from '@/components/PageLayout';
import { useOperateTable } from '@/hooks';
import SearchForm from './SearchForm';
import RenderTable from './renderTable';
import Actionmodal from './Actionmodal';
import ConfigModal from './ConfigModal';
import store from '../store';
import style from './index.module.less';


export default observer(() => {
  const showModal = () => {
    store.update({ visible: true, action: 'add' });
  };
  const { onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => onDelete({ deviceips: JSON.stringify(store.selectedRowKeys) })
    });
  }, [onDelete]);
  const topHeadRender = () => <SearchForm store={store} />;
  const leftHeadRender = () => (
    <>
      <Button icon="plus" type="primary" onClick={showModal}>
        添加
      </Button>
      <Button
        disabled={store.selectedRowKeys.length === 0}
        onClick={_onDelete}
      >
        批量删除
      </Button>
    </>
  );
  const dataRender = () => <RenderTable store={store} />;
  return (
    <div className={style['box-wrap']}>
      <OperateTable
        topHeadRender={topHeadRender}
        leftHeadRender={leftHeadRender}
        dataRender={dataRender}
      />
      {/* 弹窗 */}
      <Actionmodal store={store} />
      <ConfigModal store={store} />
    </div>
  );
});
