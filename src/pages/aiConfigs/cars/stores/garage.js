import { tableMerge } from '@/decorators/store';
import _api from '../services/garage';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆库列表
  dataSource: [],
  // 添加车辆库的校验返回
  isValid: false,
  // 添加和编辑车辆库的弹框控制
  garageVisible: false,
  // 弹窗的状态
  action: 'add',
  // 编辑获取的车辆库的Id
  garageId: null,
  // 编辑获取的车辆库信息
  editGarageInfo: {}
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 车辆库名字的校验
    { key: 'checkName', map: { isValid: 'data' } },
    // 获取车辆库列表
    { key: 'queryPaging' },
    // 删除车辆库
    { key: 'deleteGarage' },
    // 创建或者编辑车辆库
    { key: 'addGarage' },
    // 获取编辑的车辆库信息
    { key: 'getGarageInfo', map: { editGarageInfo: 'data' } },
    // 编辑车辆库信息
    { key: 'delete' }
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
