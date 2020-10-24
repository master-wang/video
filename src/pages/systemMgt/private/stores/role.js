import { tableMerge } from '@/decorators/store';
import _api from '../services/role';

/**
 * 默认状态
 */
const DEFAULTS = {
  dataSource: [],
  // 列表的选项
  selectedRowKeys: [],
  // 弹窗是否可见
  visible: false,
  // 弹窗操作类型(add|edit)
  action: 'add',
  entity: {},
  // 角色配置
  configVisible: false,
  treeData: [],
  // 操作权限
  checkedList: [],
  indeterminate: false,
  checkAll: false,
  // 资源权限
  resCheckedList: [],
  resIndeterminate: false,
  resCheckAll: false
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 分页查询
    { key: 'queryPaging' },
    // 获取通道
    { key: 'getTreeData', return: true },
    // 创建角色
    { key: 'save' },
    // 角色名称校验
    { key: 'checkName', return: true },
    // 查询角色信息
    { key: 'queryEntity', map: { entity: 'data' } },
    // 删除角色
    { key: 'delete' },
    // 冻结/启用角色
    { key: 'feelRole' },
    // 更新权限
    { key: 'updatePri' }
  ]
};


/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Node {
  constructor() {
    this.init();
  }
}

export default new Node();
