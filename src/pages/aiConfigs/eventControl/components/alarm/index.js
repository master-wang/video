import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './SearchForm';
import RenderTable from './renderTable';
import Actionmodal from './Actionmodal';
import EreaModal from './EreaModal';
import store from '../../stores/eventControl';
import style from './index.module.less';


export default observer(() => {
  const showModal = () => {
    store.update({ visible: true, action: 'add' });
  };
  const topHeadRender = () => <SearchForm store={store} />;
  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={showModal}>
      新建布控任务
    </Button>
  );
  const dataRender = () => <RenderTable store={store} />;
  return (
    <div className={style['box-wrap']}>
      <OperateTable
        topHeadRender={topHeadRender}
        leftHeadRender={leftHeadRender}
        dataRender={dataRender}
      />
      {/* 弹窗详情 */}
      <Actionmodal store={store} />
      {/* 设置布控区域的弹窗 */}
      <EreaModal store={store} />
    </div>
  );
});
