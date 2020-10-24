import React from 'react';
import { observer } from 'mobx-react';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './SearchForm';
import RenderTable from './renderTable';
import Actionmodal from './Actionmodal';
import store from '../../stores/alarm';
import style from './index.module.less';


export default observer(() => {
  const topHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <RenderTable store={store} />;
  return (
    <div className={style['box-wrap']}>
      <OperateTable
        topHeadRender={topHeadRender}
        dataRender={dataRender}
      />
      {/* 弹窗详情 */}
      <Actionmodal store={store} />
    </div>
  );
});
