import { tableMerge } from '@/decorators/store';
import _api from '../services/backups';

/**
 * 默认状态
 */
const DEFAULTS = {
  dataSource: [{ id: 1, name: 'sss' }],
  // 列表的选项
  selectedRowKeys: [],
  //
  entity: {},
  // 节点弹窗是否可见
  visible: false,
  // 操作类型(add|edit)
  action: 'add'

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 分页查询
    { key: 'queryPaging' }
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
}

export default new Node();
