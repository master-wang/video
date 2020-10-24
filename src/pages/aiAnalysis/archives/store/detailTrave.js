import { tableMerge } from '@/decorators/store';
import _api from '../services/detail';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 列表
  dataSource: [],
  loading: false,
  // 通道信息
  treeData: [],
  // 出现规律分析选中的记录id
  selectedRowKeys: []

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取列表
    { key: 'queryPaging', callee: 'getTraves' },
    // 删除出现轨迹
    { key: 'delete' },
    // 获取通道
    { key: 'getTreeData', return: true }
  ]
};

/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Alarm {
  constructor() {
    this.init();
  }
}

export default new Alarm();
