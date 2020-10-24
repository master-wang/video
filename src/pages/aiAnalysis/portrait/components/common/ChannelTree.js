import React, { useState } from 'react';
import {
  Tree, message
} from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
// import _ from 'lodash';
import { SvgIcon } from '@/components/Icon';
import styles from './ChannelTree.module.less';

const { TreeNode } = Tree;

function TreeNodeTitle({ title }) {
  return <div className={styles['title-warp']}>
    <SvgIcon name="loc_block" className={styles['title-icon']} />
    <span>{title}</span>
  </div>;
}

function LeafTitle({ title }) {
  return <div className={styles['title-warp']}>
    <SvgIcon name="loc_spot" className={styles['title-icon']} />
    <span>{title}</span>
  </div>;
}

function ChannelTree({ store }) {
  // const { field } = items;
  const [
    Treedata, setTreeData
  ] = useState({});

  // 获取到store的树的多选
  // const idArr = toJS(_.at(store.queryParams, field)) || [];
  // const channelKeys = _.compact(idArr);

  useMount(async () => {
    const res = await store.queryChannelInfo(0);
    setTreeData(res);
  });

  const handleClickChannel = (selectedKeys, e) => {
    const { node: { props: { isChannel, dataRef } } } = e;
    const { channelId } = dataRef;
    const { updateParams } = store;
    if (isChannel) {
      store.update({
        channelId
      });
      updateParams({ channelId: [channelId] });
    }
  };

  // 多选框函数
  // const onCheck = (checkedKeys) => {
  //   console.log('onCheck', checkedKeys);
  //   // this.setState({ checkedKeys });
  //   const { updateParams } = store;
  //   const obj = {};
  //   obj[field] = checkedKeys;
  //   updateParams(obj);
  // };

  const onLoadData = treeNode => new Promise(resolve => {
    store.queryChannelInfo(treeNode.props.id).then((res) => {
      if (res) {
        treeNode.props.dataRef.children = res;
        setTreeData({ ...toJS(Treedata) });
      }
      resolve();
    }).catch((res) => {
      message.error(res.message);
    });
  });

  const renderTreeNodes = (data) => {
    const treeNodesData = [];
    data.channelList && data.channelList.forEach((item) => {
      treeNodesData.push(
        <TreeNode
          className={styles['title-node-wrap']}
          key={item.channelId}
          title={<LeafTitle title={item.channelName} />}
          dataRef={item}
          isChannel
          isLeaf
        />
      );
    });
    data.child && data.child.forEach((item) => {
      treeNodesData.push(<TreeNode
        title={<TreeNodeTitle title={item.name} />}
        id={item.id}
        key={item.id}
        dataRef={item}
        className={styles['title-node-wrap']}
      >
        {item.children && renderTreeNodes(item.children)}
      </TreeNode>);
    });
    return treeNodesData;
  };

  return (
    <Tree
      loadData={onLoadData}
      className={styles['channel-tree-wrap']}
      onSelect={handleClickChannel}
      // checkable
      // onCheck={onCheck}
      // checkedKeys={channelKeys}
    >
      {renderTreeNodes(Treedata)}
    </Tree>
  );
}

export default observer(ChannelTree);
