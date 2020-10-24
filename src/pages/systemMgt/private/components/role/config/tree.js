import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { Badge, Checkbox } from 'antd';
import { useCaptureWay } from '@/hooks';
import style from '../index.module.less';

export default observer(({ store }) => {
  const {
    // 资源操作的全选控制
    resIndeterminate, resCheckAll, resCheckedList
  } = store;

  const leafExtra = (channelName, item) => {
    const node = <>
      {channelName}
      <span style={{ marginLeft: '10px' }}>{item.status ? <Badge status="default" /> : <Badge status="success" />}</span>
    </>;
    return node;
  };
  const { createWay, getChennels } = useCaptureWay({
    store, selectMore: false, type: 'Tree', leafExtra
  });
  const privateArr = getChennels().map((item) => item.channelId);
  
  useMount(() => {
    // 获取通道信息
    store.getTreeData({ id: 0 }).then((treeData) => {
      store.update({ treeData });
    });
    store.update({ selectTreeId: '' });
  });

  // 当点击树节点时查询服务器的状态
  useEffect(() => {
    if (!store.selectTreeId) {
      return;
    }
    console.log('store.selectTreeId', store.selectTreeId);
  }, [store.selectTreeId]);

  const onCheck = (checkedKeys, info) => {
    // eslint-disable-next-line no-console
    console.log('资源权限onCheck', checkedKeys, info);
    store.update({
      resCheckedList: checkedKeys,
      resIndeterminate: !!checkedKeys.length && checkedKeys.length < privateArr.length,
      resCheckAll: checkedKeys.length === privateArr.length
    });
  };

  const onCheckAllChange = e => {
    store.update({
      resCheckedList: e.target.checked ? privateArr : [],
      resIndeterminate: false,
      resCheckAll: e.target.checked
    });
  };

  const Props = {
    checkable: true,
    onCheck: onCheck,
    checkedKeys: resCheckedList
  };

  return (
    <div>
      <h1>
        资源权限
        <Checkbox
          indeterminate={resIndeterminate}
          onChange={onCheckAllChange}
          checked={resCheckAll}
          className={style['chack-all']}
        >
          全选
        </Checkbox>
      </h1>
      {createWay({
        Props
      })}
    </div>
  );
});
