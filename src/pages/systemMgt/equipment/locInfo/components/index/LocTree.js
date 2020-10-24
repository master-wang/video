/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Tree, Menu, Dropdown, Icon, Modal
} from 'antd';
import SvgIcon from '@/components/Icon/Svg';
import store from '../../stores';
import style from './LocTree.module.less';

const { TreeNode } = Tree;

const { Item: MenuItem } = Menu;

let uid = 1;

export default observer(() => {
  const { query, expandedKeys, treeData } = store;

  const loadData = (treeNode) => new Promise(resolve => {
    if (treeNode.props.child) {
      resolve();
      return;
    }
    store.querySubLocs({ id: treeNode.props.dataRef.id, lazy: true }).then((data) => {
      treeNode.props.dataRef.child = data || [];
      resolve();
    });
  });

  const onExpand = useCallback((keys) => {
    store.update({ expandedKeys: keys });
  });

  const onAdd = useCallback((item) => {
    store.update({
      visible: true,
      action: 'add',
      loc: {
        pid: item.id,
        pname: item.name
      }
    });
  }, [treeData]);

  const onEdit = useCallback((item) => {
    store.update({ visible: true, action: 'edit' });
    store.queryLoc({ id: item.id });
  }, [treeData]);

  const onDelete = useCallback((item) => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除该节点吗',
      content: '该节点及其子节点的位置都将删除，删除后无法恢复。',
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => new Promise((resolve) => {
        store.delete(
          item,
          resolve,
          resolve
        );
      })
    });
  }, [treeData]);

  const handleMenuClick = (key, item) => {
    switch (key) {
      case 'add':
        onAdd(item);
        break;
      case 'edit':
        onEdit(item);
        break;
      case 'delete':
        onDelete(item);
        break;
      default:
        break;
    }
  };

  const renderTreeNodeTitle = useCallback((item) => {
    const menu = (
      <Menu onClick={(e) => handleMenuClick(e.key, item)}>
        <MenuItem key="add">添加子节点</MenuItem>
        <MenuItem key="edit">编辑</MenuItem>
        <MenuItem key="delete">删除</MenuItem>
      </Menu>
    );
    return (
      <>
        <SvgIcon className="title-icon" name="loc_block" />
        {/* <SvgIcon className="title-icon" name={item.hasChild ? 'loc_block' : 'loc_spot'} /> */}
        <span className="title-text">{item.name}</span>
        <span className="title-extra">
          <Dropdown overlay={menu}>
            <Icon type="ellipsis" />
          </Dropdown>
        </span>
      </>
    );
  });

  const renderTreeNodes = useCallback((data) => data.map(item => {
    if (item.hasChild && item.child) {
      return (
        <TreeNode key={item.id} title={renderTreeNodeTitle(item)} dataRef={item}>
          {renderTreeNodes(item.child)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        key={item.id}
        title={renderTreeNodeTitle(item)}
        dataRef={item}
        isLeaf={!item.hasChild}
      />
    );
  }));

  useMount(() => {
    store.querySubLocs({ id: 0, lazy: true }).then(data => {
      store.update({ treeData: data || [] });
    });
  });

  useEffect(() => {
    uid++;
  }, [query]);

  return (
    <div className={style['loc-tree']}>
      <div className="tree-head">
        设备位置信息
      </div>
      <div className="tree-body">
        <Tree
          key={uid}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          loadData={query ? null : loadData}
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </div>
    </div>
  );
});
