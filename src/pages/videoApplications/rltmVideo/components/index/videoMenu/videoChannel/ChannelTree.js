import React, { useState } from 'react';
import { Tree, message, List } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { SvgIcon } from '@/components/Icon';
import JdPlayer from '@/libs/jdPlayer';
// import JdH265Player from '@/libs/jdH265Player';
import videoChannelStore from '../../../../stores/VideoChannelStore';
import videoConStore from '../../../../stores/VideoConStore';
import styles from './ChannelTree.module.less';
/* eslint-disable */
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

function ChannelTree() {
  const [
    Treedata, setTreeData
  ] = useState([]);
  const [loading, setLoading] = useState(true);

  // const formatRes = (data) => data && Array.isArray(data) && data.map((item) => {
  //   if (item.channelList && !!item.channelList.length) {
  //     item.children = item.channelList;
  //     if (item.child && !!item.child.length) {
  //       item.children = [...item.channelList, ...item.child];
  //     }
  //     delete item.channelList;
  //   }
  //   return item;
  // });
  const formatRes = (data) => {
    const { channelList, child } = data;
    const channels = [...(channelList || []), ...(child || [])];
    return channels;
  };

  useMount(async () => {
    let res = await videoChannelStore.queryChannelInfo(0);
    res = formatRes(res);
    setTreeData(res);
    setLoading(false);
  });

  const handleClickChannel = (selectedKeys, e) => {
    const { node: { props: { isChannel, dataRef } } } = e;
    const { focusFrame } = videoConStore;
    const { channelId } = dataRef;
    if (isChannel) {
      videoChannelStore.update({
        channelId
      });
      if (videoConStore[`jdplayer${focusFrame}`]) {
        videoConStore[`jdplayer${focusFrame}`].destroy();
      }
      const jdPlayer = new JdPlayer({
        node: `player${focusFrame}`,
        mode: 'video'
        // debug: true
      });
      jdPlayer.monitorChannel({
        url: '/videobigdata/monitor/channel',
        channelId
      });
      videoConStore.update({
        [`jdplayer${focusFrame}`]: jdPlayer
      });
      // const jdH265Player = new JdH265Player();
      // jdH265Player.monitorChannel({
      //   url: '/videobigdata/monitor/channel',
      //   channelId,
      //   streamNum: 1
      // });
      
    }
  };


  const onLoadData = treeNode => new Promise(resolve => {
    // if (!treeNode.props.children.length) {
    //   resolve();
    //   return;
    // }
    videoChannelStore.queryChannelInfo(treeNode.props.id).then((res) => {
      if (res) {
        res = formatRes(res);
        console.log('dataRef',treeNode.props.dataRef)
        treeNode.props.dataRef.children = res;
        setTreeData([...toJS(Treedata)]);
      }
      resolve();
    }).catch((res) => {
      message.error(res.message);
    });
  });

  const renderTreeNodes = (data) => {
    const treeNodesData = [];
    data && Array.isArray(data) && data.forEach((item) => {
      if (item.children) {
        treeNodesData.push(<TreeNode
          title={<TreeNodeTitle title={item.name} />}
          id={item.id}
          key={item.id}
          dataRef={item}
          className={styles['title-node-wrap']}
        >
          {renderTreeNodes(item.children)}
        </TreeNode>);
      }
      if (item.children) {
        return treeNodesData;
      }
      if (item.id) {
        treeNodesData.push(
          <TreeNode
            title={<TreeNodeTitle title={item.name} />}
            id={item.id}
            key={item.id}
            dataRef={item}
            className={styles['title-node-wrap']}
          />
        );
      }
      if (item.channelId) {
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
      }
    });
    return treeNodesData;
  };

  return (
    loading ? <List loading className={styles['list-emp']}/> : <Tree
      loadData={onLoadData}
      className={styles['channel-tree-wrap']}
      onSelect={handleClickChannel}
    >
      {renderTreeNodes(Treedata)}
    </Tree>
  );
}

export default observer(ChannelTree);
