import React from 'react';
import { TreeSelect, message, Tree } from 'antd';
import { toJS } from 'mobx';
import { SvgIcon } from '@/components/Icon';
import styles from './useCaptureWay.module.less';

function TreeNodeTitle({ title }) {
  return <div className={styles['title-warp']}>
    <SvgIcon name="loc_block" className={styles['title-icon']} />
    <span>{title}</span>
  </div>;
}

function LeafTitle({ Title }) {
  return <div className={styles['title-warp']}>
    <SvgIcon name="loc_spot" className={styles['title-icon']} />
    <span>{Title}</span>
  </div>;
}

// 满足后台需要的多选树通道

function useCaptureWay({
  store,
  selectMore = true, // true 为可以选择父节点，也可以选择叶子节点，false 只能选择叶子节点
  type = 'TreeSelect',
  leafExtra = null
}) {
  const { SHOW_PARENT } = TreeSelect;
  const { TreeNode } = type === 'TreeSelect' ? TreeSelect : Tree;

  const displayArr = selectMore ? [false, false] : [true, false];
  const { treeData = [], action, editInfo } = store;
  // eslint-disable-next-line no-unused-vars
  const renderUi = toJS(treeData);
  const chennels = [];
  const Leafs = [];
  // 获取通道id列表
  const getChannelsID = (lists) => {
    const arr = [];
    lists && lists.forEach((item) => {
      chennels.push(toJS(item));
      arr.push(item.channelId);
    });
    return arr;
  };

  const findNode = (odata, oid, arr) => {
    const resetChirld = (data, id) => {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === oid) {
          const temp = data[i];
          temp.child = arr.child || [];
          temp.channelList = arr.channelList || [];
          return odata;
        }
        if (data[i].child && data[i].child.length) {
          return resetChirld(data[i].child, id);
        }
      }
    };
    resetChirld(odata.child, oid);
    return odata;
  };

  const onLoadData = treeNode => new Promise(resolve => {
    if (treeNode.props.dataRef.child || treeNode.props.dataRef.channelList) {
      resolve();
      return;
    }
    store.getTreeData({ id: treeNode.props.id }).then(async (res) => {
      if (res) {
        treeNode.props.dataRef.channelList = res.channelList;
        treeNode.props.dataRef.child = res.child;
        const newTree = findNode(treeData, treeNode.props.id, res);
        await store.update({ treeData: newTree });
      }
      resolve();
    }).catch((res) => {
      message.error(res.message);
    });
  });

  // 遍历该节点下所有的通道id
  const getNodeChanels = (channelList, child) => {
    const result = getChannelsID(channelList);
    const getLeaf = (data) => {
      data.forEach((one) => {
        if (one.channelList && one.channelList.length) {
          one.channelList.forEach((item) => {
            chennels.push(toJS(item));
            result.push(item.channelId);
          });
        } else {
          one.child && getLeaf(one.child);
        }
      });
    };
    child && child.length && getLeaf(child);
    return result.join(',');
  };

  const renderLeaf = (data) => {
    if (data) {
      return data.map((item) => {
        const {
          channelId, channelName
        } = item;
        Leafs.push(item);
        const Ele = <>{channelName}</>;
        return (
          <TreeNode
            className={styles['title-node-wrap']}
            key={channelId}
            disabled={displayArr[1]}
            value={channelId}
            isLeaf
            title={<LeafTitle Title={leafExtra ? leafExtra(channelName, item) : Ele} />}
          />
        );
      });
    }
  };

  const renderTreeNode = (data) => {
    if (!data) {
      return null;
    }
    const newData = Array.isArray(data)
      ? data : data.id
        ? [data] : data.child;
    if (newData) {
      return newData.map((item) => {
        const {
          child, name, id, channelList
        } = item;
        return (
          <TreeNode
            key={id}
            id={id}
            dataRef={item}
            disabled={displayArr[0]}
            value={`${getNodeChanels(channelList, child)},NODE${id}`}
            title={<TreeNodeTitle title={name} />}
            className={styles['title-node-wrap']}
          >
            {renderLeaf(channelList)}
            {renderTreeNode(child)}
          </TreeNode>
        );
      });
    }
  };

  const nodes = renderTreeNode(treeData);

  if (action === 'edit') {
    // eslint-disable-next-line no-console
    console.log('editInfo', toJS(editInfo));
  }

  // eslint-disable-next-line no-unused-vars
  const onSelect = (selectedKeys, info) => {
    store.update({ selectTreeId: selectedKeys[0] });
  };
  // 创建默认通道
  const createWay = ({
    Props = {}
  } = {}) => (
    type === 'TreeSelect' ? <TreeSelect
      treeCheckable
      loadData={onLoadData}
      showCheckedStrategy={SHOW_PARENT}
      placeholder="请选择抓拍通道"
      className={styles['channel-tree-wrap']}
      {...Props}
    >
      {
        nodes
      }
    </TreeSelect> : <Tree
      loadData={onLoadData}
      className={styles['channel-tree-wrap']}
      onSelect={onSelect}
      {...Props}
    >
      {
        nodes
      }
    </Tree>
  );

  // 获取到对应的id list
  const getChannelList = (channel) => {
    const obj = {
      channel: []
    };
    if (!channel) {
      return [];
    }
    const { length } = channel;
    if (!length || !channel[length - 1].includes('NODE')) {
      obj.channel = channel.join(',');
    } else {
      const arr = channel[0].split(',');
      arr.pop();
      obj.channel = arr.join(',');
    }
    return obj.channel.split(',');
  };


  // 获取所有的通道
  const getChennels = () => {
    const unique = {};
    chennels.forEach((a) => { unique[JSON.stringify(a)] = 1; });
    const arr = Object.keys(unique).map((u) => JSON.parse(u));
    return arr;
  };

  return {
    createWay,
    renderTreeNode,
    getChannelList,
    getChennels,
    Leafs
  };
}

export default useCaptureWay;
