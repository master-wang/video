import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useMount } from 'react-use';
import { OperateTable } from '@/components/PageLayout';
import RenderTable from './renderTable';
import Modal from './Modal';
import SearchForm from './SearchForm';
import store from '../../stores/vehicleControl';
import style from './index.module.less';


export default observer(() => {
  // 显示添加车辆库的弹窗
  const showModal = () => {
    store.update({ visible: true, action: 'add' });
  };

  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={showModal}>
      新建布控任务
    </Button>
  );
  const topHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <RenderTable store={store} />;
  useMount(() => {
    store.queryPaging();
    // 获取车辆库列表
    store.getGarageList();
  });
  return (
    <div className={style['vehicleControl-wrap']}>
      <OperateTable
        topHeadRender={topHeadRender}
        leftHeadRender={leftHeadRender}
        dataRender={dataRender}
      />
      {/* 创建和编辑车辆布控的弹窗 */}
      <Modal store={store} />
    </div>
  );
});
