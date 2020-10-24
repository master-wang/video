import { tableMerge } from '@/decorators/store';
import _api from '../services/carsMgmt';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆列表
  dataSource: [],
  // 控制新增编辑车辆的弹窗
  visible: false,
  // 新增编辑车辆的弹窗的 action
  action: 'add',
  // 车辆号码的校验
  isValid: false,
  // 布控车辆库列表
  garageList: [],
  // 页面所属车辆库id
  cardbId: '',
  // 获取编辑车辆的信息
  editInfo: {},
  // 获取编辑的车辆车牌号
  cardNumber: '',

  // 逐个上传图片的控制
  previewVisible: false,
  previewImage: '',
  fileList: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取车辆列表
    { key: 'queryPaging' },
    // 获取车辆库列表
    { key: 'getGarageList', map: { garageList: 'data' } },
    // 车辆号码校验
    { key: 'checkCarNumber', map: { isValid: 'data' } },
    // 添加车辆
    { key: 'addGarage' },
    // 删除车辆
    { key: 'delete' },
    // 获取车辆信息
    { key: 'getEditInfo', map: { editInfo: 'data' } },
    // 获取车辆信息
    { key: 'deleteImg' }
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
