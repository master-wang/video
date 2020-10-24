import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Button, Input } from 'antd';
import { LocTree, ActionModal } from './components/index';
import store from './stores';
import style from './index.module.less';

const { Search } = Input;

/**
 * 位置信息库
 */
export default observer(() => {
  const onAdd = useCallback(() => {
    store.update({ visible: true, action: 'add', loc: {} });
  });

  const onSearch = useCallback((val) => {
    if (val) {
      store.queryLocs({ code: val, hasChannel: false });
    } else {
      store.querySubLocs({ id: 0, lazy: true }).then((data => {
        store.update({ query: null, treeData: data || [], expandedKeys: [] });
      }));
    }
  });

  return (
    <div className={style['p-loc-info']}>
      <div className="p-head f-cb">
        <div className="f-fl">
          <Button icon="plus" type="primary" onClick={onAdd}>新增一级节点</Button>
        </div>
        <div className="f-fr">
          <Search placeholder="搜索关键字" onSearch={onSearch} />
        </div>
      </div>
      <div className="p-body">
        <LocTree />
      </div>
      <ActionModal />
    </div>
  );
});
