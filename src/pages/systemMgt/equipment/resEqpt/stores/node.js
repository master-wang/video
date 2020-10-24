import { action } from 'mobx';
import { message } from 'antd';
import { tableMerge } from '@/decorators/store';
import _api from '../services/node';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 当前列表点击的服务节点
  entity: {},
  // 服务节点弹窗是否可见
  visible: false,
  // 服务节点弹窗操作类型(add|edit)
  action: 'add',
  // 所有服务单元Array
  serveUnitArr: [],
  // 所有服务单元Map
  serveUnitMap: {}
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 保存服务节点
    { key: 'save' },
    // 删除服务节点
    { key: 'delete' },
    // 分页查询
    { key: 'queryPaging' },
    // 查询服务节点详情
    { key: 'queryEntity', map: { entity: 'data' } }
  ]
};


/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Node {
  constructor() {
    this.init();
  }

  @action.bound
  async queryServeUnits() {
    try {
      const data = await _api.queryUnits();
      if (data && data.length) {
        const map = {};
        data.forEach(item => {
          map[item.id] = item;
        });
        this.update({
          serveUnitArr: data,
          serveUnitMap: map
        });
      }
    } catch (err) {
      message.error(err.message);
    }
  }
}

export default new Node();
