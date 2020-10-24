import { tableMerge } from '@/decorators/store';
import _api from '../services/eqpt';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 当前列表点击的视频设备
  entity: {},
  // 视频设备弹窗是否可见
  visible: false,
  // 视频设备弹窗操作类型(add|edit)
  action: 'add',
  // 选中数据key值集合
  selectedRowKeys: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 新增
    { key: 'add' },
    // 编辑
    { key: 'edit' },
    // 删除
    { key: 'delete' },
    // 分页查询
    { key: 'queryPaging' },
    // 查询详情
    { key: 'queryEntity', map: { entity: 'data' } },
    // 校验编码唯一性
    { key: 'validateCode', return: true }
  ]
};


/**
 * 视频设备状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Eqpt {
  constructor() {
    this.init();
  }
}

export default new Eqpt();
