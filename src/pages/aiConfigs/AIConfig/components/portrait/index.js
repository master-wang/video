/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:14:52
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-03-26 11:27:34
 */
import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { useOperateTable } from '@/hooks';
import { OperateTable } from '@/components/PageLayout';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import store from '../../stores/portrait';
import ActionModal from './ActionModal';
import Bread from '@/layouts/BasicLayout/Bread';
import styles from './index.module.less';

export default observer(() => {
  const { onAdd } = useOperateTable(store);
  const topHeadRender = () => <SearchForm store={store} />;
  const leftHeadRender = () => (
    <Button icon="plus" type="primary" onClick={onAdd}>
      新建人像
    </Button>
  );
  const dataRender = () => <DataTable store={store} />;
  const breadItems = useMemo(() => [
    { id: 1, name: '人口库管理', path: '/aiConfig' },
    { id: 2, name: '人口库' }
  ]);
  return (
    <div className={styles.portrait}>
      <Bread items={breadItems} />
      <OperateTable
        topHeadRender={topHeadRender}
        leftHeadRender={leftHeadRender}
        dataRender={dataRender}
      />
      <ActionModal store={store} />
    </div>
  );
});
