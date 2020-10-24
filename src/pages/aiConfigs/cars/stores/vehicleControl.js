import { tableMerge } from '@/decorators/store';
import _api from '../services/vehicleControl';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆布控列表
  dataSource: [],
  // 弹窗的visible
  visible: false,
  // 弹窗的行为
  action: 'add',
  // 布控车辆库列表
  garageList: [],
  // 点击编辑的车辆布控Id
  vehicleId: null,
  // 编辑的车辆布控的回显信息
  editInfo: {},
  // 回显信息的整理
  info: {},
  // 编辑的车辆布控taskId
  taskId: '',
  // 视频源通道
  treeData: []

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    { key: 'queryPaging' },
    // 获取布控车辆库列表
    { key: 'getGarageList', map: { garageList: 'data' } },
    // 获取视频源通道
    { key: 'getTreeData', return: true },
    // 添加布控任务
    { key: 'addGarage' },
    // 编辑
    { key: 'edit' },
    // 删除布控任务
    { key: 'delete' },
    // 获取单个布控任务信息
    { key: 'getEditInfo', map: { editInfo: 'data' } }
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
