import { tableMerge } from '@/decorators/store';
import _api from '../services/car';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆列表
  dataSource: [],
  // 抓拍用到树
  treeData: [],
  // 分页
  pagination: {
    current: 1,
    total: 0,
    pageSize: 18,
    pageSizeOptions: ['6', '12', '18', '30'],
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    showTotal: total => `共 ${total} 条`
  }
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取车辆列表
    { key: 'queryPaging' },
    // 获取抓拍通道通道
    { key: 'getTreeData', return: true }
  ]
};

/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Garage {
  constructor() {
    this.init();
  }
}

export default new Garage();
