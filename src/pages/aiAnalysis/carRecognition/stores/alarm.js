import { tableMerge } from '@/decorators/store';
import _api from '../services/alarm';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆告警列表
  dataSource: [],
  // 通道
  treeData: [],
  // 车辆布控任务列表
  taskList: [],
  // 车辆库列表
  carLib: [],
  // 控制车辆告警的弹窗变量
  visible: false,
  // 车辆告警的弹窗信息
  alarmItem: {},
  // 车辆告警的弹窗记录id
  alarmId: '',
  // 控制车辆图片放大弹窗
  carVisible: false,
  // 控制的图片的url
  imgUrl: ''
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取车辆告警列表
    { key: 'queryPaging' },
    // 获取抓拍通道通道
    { key: 'getTreeData', return: true },
    // 获取车辆布控任务
    { key: 'getTask', map: { taskList: 'data' } },
    // 获取车辆库列表
    { key: 'getCarLib', map: { carLib: 'data' } },
    // 删除车辆告警
    { key: 'delete' },
    // 查询布控告警的详情
    { key: 'getDetail', map: { alarmItem: 'data' } },
    // 提交告警正误报
    { key: 'updateLog' }
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
