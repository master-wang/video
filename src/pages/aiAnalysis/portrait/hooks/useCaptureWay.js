import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { TreeSelect } from 'antd';

const { SHOW_PARENT, TreeNode } = TreeSelect;

export default observer(({ treeData }) => {
  const [changeData, setChangeData] = useState([]);
  const OnChange = (vals) => {
    if (!vals.length || !vals[vals.length - 1].includes('NODE')) {
      updateParams({ channelId: vals });
      return;
    }
    // 最后一个位置是标志位，不需要，只是需要拿来做判断
    const arr = vals[0].split(',');
    arr.pop();
    setChangeData({ channelId: arr });
  };
  // 获取通道id列表
  const getChannelsID = (list) => {
    const arr = [];
    list.forEach(({ channelId }) => arr.push(channelId));
    return arr.join(',');
  };

  // 遍历该节点下所有的通道id
  const getNodeChanels = (child) => {
    const result = [];
    const getLeaf = (data) => {
      data.forEach((one) => {
        if (one.channelList.length) {
          one.channelList.forEach(({ channelId }) => result.push(channelId));
        } else {
          getLeaf(one.child);
        }
      });
    };
    getLeaf(child);
    return result.join(',');
  };

  const renderLeaf = (data) => {
    if (data) {
      return data.map(({
        channelId, channelName
      }) => (
        <TreeNode key={channelId} value={channelId} title={channelName} />
      ));
    }
  };

  const renderTreeNode = (data) => {
    if (data) {
      return data.map(({
        child, name, id, channelList
      }) => {
        if (child) {
          return (
            <TreeNode key={id} value={`${getNodeChanels(child)},NODE${id}`} title={name}>
              {renderTreeNode(child)}
            </TreeNode>
          );
        }
        if (channelList) {
          return (
            <TreeNode key={id} value={getChannelsID(channelList)} title={name}>
              {renderLeaf(channelList)}
            </TreeNode>
          );
        }
        // 没有子节点的时候
        return (
          <TreeNode key={id} value={id} title={name} />
        );
      });
    }
  };

  const createTree = () =>
    <TreeSelect
      onChange={OnChange}
      treeCheckable
      showCheckedStrategy={SHOW_PARENT}
      placeholder="请选择抓拍通道"
      style={{ width: 195 }}
    >
      {
        renderTreeNode(treeData)
      }
    </TreeSelect>;

  return {
    createTree,
    OnChange,
    changeData
  };
});
