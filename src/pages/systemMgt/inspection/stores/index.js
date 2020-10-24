import { tableMerge } from '@/decorators/store';
import _api from '../services';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆列表
  dataSource: [],
  treeData: [],
  // 选中的服务器
  device: null,
  // 获取的单个服务器的信息
  DeviceInfo: {},
  // 服务单元的类型
  Units: [],
  // 告警的详情
  detailVisible: false,
  entries: {},
  // 选中数据key值集合
  selectedRowKeys: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取告警列表
    { key: 'queryPaging' },
    // 获取通道
    { key: 'getTreeData', map: { treeData: 'data' } },
    // 获取单个服务器的信息
    { key: 'getDeviceInfo', map: { DeviceInfo: 'data' } },
    // 查询服务单元的类型
    { key: 'queryUnits', map: { Units: 'data' } },
    // 查看告警详情
    { key: 'getEntry', map: { entries: 'data' } },
    // 删除表的一条记录
    { key: 'delete' }
  ]
};

/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Store {
  constructor() {
    this.init();
  }
}

export default new Store();
