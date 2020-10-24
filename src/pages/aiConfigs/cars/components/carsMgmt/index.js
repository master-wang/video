import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useMount } from 'react-use';
import { OperateTable } from '@/components/PageLayout';
import RenderTable from './renderTable';
import Modal from './Modal';
import { useRouter } from '@/hooks';
import SearchForm from './SearchForm';
import ToolTop from './ToolTop';
import store from '../../stores/carsMgmt';
import Bread from '@/layouts/BasicLayout/Bread';
import style from './index.module.less';


export default observer(() => {
  const { query: { id } } = useRouter();
  // 显示添加车辆库的弹窗
  const showModal = () => {
    store.update({ visible: true, action: 'add' });
  };

  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={showModal}>
      新增车辆
    </Button>
  );
  // const rightHeadRender = () => <SearchForm store={store} />;
  const topHeadRender = () => <SearchForm store={store} />;
  const dataRender = () => <RenderTable store={store} />;
  useMount(() => {
    store.queryPaging({ query: { dbTableName: id } });
    // 获取车辆库列表
    store.getGarageList();
  });
  const breadItems = useMemo(() => [
    { id: 1, name: '车辆库管理', path: '/aiconfigs/cars' },
    { id: 2, name: '车辆管理' }
  ]);
  return (
    <div className={style['carsMgmt-wrap']}>
      <Bread items={breadItems} />
      <ToolTop store={store} />
      <div className={style['main-box']}>
        <OperateTable
          leftHeadRender={leftHeadRender}
          topHeadRender={topHeadRender}
          // rightHeadRender={rightHeadRender}
          dataRender={dataRender}
        />
      </div>
      {/* 新增和编辑车辆布控的弹窗 */}
      <Modal store={store} />
    </div>
  );
});
