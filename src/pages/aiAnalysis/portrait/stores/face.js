
import { tableMerge } from '@/decorators/store';
import _api from '../services/face';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 人脸对比列表
  dataSource: [],
  treeData: [],
  // 人口库列表
  facelibs: [],
  // 左侧查询的上传图片控制
  previewVisible: false,
  previewImage: '',
  fileList: [],
  // 人脸对比弹窗详情弹窗控制
  visible: false,

  loading: false,
  // 新建对比任务之后获得的比对任务ID
  taskId: [],
  // 所有的已经执行的对比任务
  tasks: [],
  // 查询单个比中结果的详情
  detail: {}
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 人脸对比列表
    { key: 'queryPaging' },
    // 获取人口库列表
    { key: 'getFacelibs', map: { facelibs: 'data' } },
    // 新建比对任务
    { key: 'createTask', map: { taskId: 'data' } },
    // 删除比对任务
    { key: 'deleteTask' },
    // 查询单个比中结果的详情
    { key: 'getResult', map: { detail: 'data' } }
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
