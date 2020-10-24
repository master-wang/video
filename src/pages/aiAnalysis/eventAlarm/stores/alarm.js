import { tableMerge } from '@/decorators/store';
import _api from '../services/alarm';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 告警列表
  dataSource: [],
  // 控制告警的弹窗变量
  visible: false,
  // 告警的弹窗信息
  alarmItem: {},
  treeData: [],
  taskList: [],
  id: '',

  // 弹窗图片的放大控制
  imgVisible: false,
  imgUrl: ''
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取告警列表
    { key: 'queryPaging' },
    // 删除告警
    { key: 'delete' },
    // 获取告警详情
    { key: 'getDetail', map: { alarmItem: 'data' } },
    // 获取抓拍通道通道
    { key: 'getTreeData', return: true },
    // 获取布控任务
    { key: 'getTask', map: { taskList: 'data' } },
    // 更新事件告警审核状态
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
