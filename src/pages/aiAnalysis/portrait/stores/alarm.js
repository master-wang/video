import { tableMerge } from '@/decorators/store';
import _api from '../services/alarm';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 车辆告警列表
  dataSource: [],
  // 详情的弹窗控制
  visible: false,
  // 通道列表
  treeData: [],
  // 人像分析的布控任务数据
  taskData: {},
  // 人口库列表
  faceLib: [],
  // 详情的loading
  detailLoading: true,
  // 查询布控告警的详情
  monitorLogInfo: {},
  // 更多人脸
  moreFaceList: [],
  // 放大的图片url
  imgUrl: '',
  // 放大的图片变量控制
  imgVisible: false
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
    { key: 'getTreeData', return: true },
    // 获取任务列表
    { key: 'getTasklist', mao: { taskData: 'data' } },
    // 获取人口库列表
    { key: 'getFacelib', map: { faceLib: 'data' } },
    // 查询布控告警的详情
    { key: 'getDetail', map: { monitorLogInfo: 'data' } },
    // 查询布控告警的详情更多人脸
    { key: 'getMoreFaces', map: { moreFaceList: 'data' } },
    // 删除布控告警
    { key: 'deleteItem' }
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
