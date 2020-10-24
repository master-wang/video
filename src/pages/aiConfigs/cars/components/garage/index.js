import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { OperateTable } from '@/components/PageLayout';
import GarageModal from './GarageModal';
import RenderTable from './renderTable';
import SearchForm from './SearchForm';
import store from '../../stores/garage';
import style from './index.module.less';


export default observer(() => {
  // 显示添加车辆库的弹窗
  const showModal = () => {
    store.update({ garageVisible: true, action: 'add' });
  };

  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={showModal}>
      新建车辆库
    </Button>
  );
  const rightHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <RenderTable store={store} />;
  return (
    <div className={style['cars-wrap']}>
      <OperateTable
        leftHeadRender={leftHeadRender}
        rightHeadRender={rightHeadRender}
        dataRender={dataRender}
      />
      {/* 创建和编辑车辆库的弹窗 */}
      <GarageModal store={store} />
    </div>
  );
});
