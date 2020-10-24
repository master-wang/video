/* eslint-disable no-unused-vars */
import { toJS } from 'mobx';
import { message } from 'antd';
import _ from 'lodash';
import { merge } from '@/decorators/store';
import _api from '../services';

function findNode(data, id) {
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i].id === id) {
      return data[i];
    }
    if (data[i].child && data[i].child.length) {
      return findNode(data[i].child, id);
    }
  }
}

function getAllParentKeys(data = []) {
  const keys = [];
  function filter(nodes) {
    for (let i = 0, len = nodes.length; i < len; i++) {
      if (nodes[i].hasChild && !_.isEmpty(nodes[i].child)) {
        keys.push(`${nodes[i].id}`);
        filter(nodes[i].child);
      }
    }
  }
  filter(data);
  return keys;
}

/**
 * 默认状态
 */
const DEFAULTS = {
  // 位置信息弹窗是否可见
  visible: false,
  // 位置信息弹窗操作类型(add|edit)
  action: 'add',
  // 查询条件
  query: null,
  // 展开指定的树节点
  expandedKeys: [],
  // 当前位置信息
  loc: {},
  // 位置信息列表
  treeData: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 查询位置节点详情
    { key: 'queryLoc', map: { loc: 'data' } },
    // 查询位置节点子节点集合
    { key: 'querySubLocs', return: true },
    // 校验编码唯一性
    { key: 'validateCode', return: true }
  ]
};


/**
 * 服务节点状态管理
 */
@merge(DEFAULTS, ACTIONS)
class Loc {
  constructor() {
    this.init();
  }

  async save(params, done, fail) {
    const { id, pid } = _.pick(params, ['id', 'pid']);
    try {
      const res = await _api.save(params);
      const parent = findNode(this.treeData, pid);
      if (!id) {
        const newNode = { ...params, id: res };
        // 新增
        if (!parent) {
          this.treeData.unshift(newNode);
        } else if (parent && !parent.child) {
          if (!parent.hasChild) {
            parent.hasChild = true;
          }
          if (this.query) {
            parent.child = [newNode];
          }
        } else {
          parent.child.unshift(newNode);
        }
      } else {
        // 编辑
        const child = parent ? parent.child : this.treeData;
        for (let i = 0, len = child.length; i < len; i++) {
          if (child[i].id === id) {
            child.splice(i, 1, { ...child[i], ...params });
            break;
          }
        }
      }
      done && done();
    } catch (err) {
      message.error(err.message);
      fail && fail();
    }
  }

  async delete(params, done, fail) {
    try {
      await _api.delete({ id: params.id });
      const parent = findNode(this.treeData, params.pid);
      const child = parent ? parent.child : this.treeData;
      for (let i = 0, len = child.length; i < len; i++) {
        if (child[i].id === params.id) {
          child.splice(i, 1);
          if (parent && !child.length) {
            parent.hasChild = false;
          }
          break;
        }
      }
      done && done();
    } catch (err) {
      message.error(err.message);
      fail && fail();
    }
  }

  // 根据关键词检索
  async queryLocs(query) {
    try {
      const data = await _api.queryLocs(query);
      this.update({
        query,
        treeData: data,
        expandedKeys: getAllParentKeys(data)
      });
    } catch (err) {
      message.error(err.message);
    }
  }
}

export default new Loc();
