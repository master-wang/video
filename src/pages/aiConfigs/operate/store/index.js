import { tableMerge } from '@/decorators/store';
import _api from '../services';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 列表
  dataSource: [],
  visible: false,
  action: 'add',
  treeData: [],
  selectTreeId: null,
  selectedRowKeys: [],
  // 服务器列表
  service: [],
  // 详情的信息
  info: {},
  deviceip: '',
  // 阀值配置
  configVisible: false

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取列表
    { key: 'queryPaging' },
    // 获取通道
    { key: 'getTreeData', return: true },
    // 添加任务布控
    { key: 'addTask' },
    // 编辑任务布控
    { key: 'updateTask' },
    // 获取详情
    { key: 'getEntry', map: { info: 'data' } },
    // 获取服务器列表
    { key: 'getService', map: { service: 'data' } },
    // 删除任务
    { key: 'delete' }
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
