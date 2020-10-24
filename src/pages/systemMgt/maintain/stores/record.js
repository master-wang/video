import { tableMerge } from '@/decorators/store';
import _api from '../services/record';

/**
 * 默认状态
 */
const DEFAULTS = {
  dataSource: [],
  // 选中数据key值集合
  selectedRowKeys: []

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 分页查询
    { key: 'queryPaging' },
    // 删除
    { key: 'delete' }

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
