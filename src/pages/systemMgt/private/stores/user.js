import { action } from 'mobx';
import { tableMerge } from '@/decorators/store';
import _api from '../services/user';

/**
 * 默认状态
 */
const DEFAULTS = {
  dataSource: [],
  // 选中数据key值集合
  selectedRowKeys: [],
  // 添加用户弹窗变量
  visible: false,
  // 编辑用户
  editVisible: false,
  // 批量导入用户弹窗变量
  addUsersVisible: false,
  // 获取添加用户的扩展字段
  extendField: null,
  // 扩展字段要展示的数据
  extendShowData: [],
  // 扩展字段不展示的数据
  extendHidData: {},
  // 选择组织机构时
  orgData: [],
  createdUser: [],
  // 用户得详情
  userDetail: {},
  // 批量导入用户弹窗
  batchUserVisible: false,
  // 批量上传返回的表格信息
  fileList: [],
  errFileLise: [],
  batchUserRelateId: null,
  createdUsers: [],
  // 关联组织机构数据
  relateInsData: [],
  // 重置密码
  resetPasswordVisible: false,
  password: null
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 分页查询
    { key: 'queryPaging' },
    // 冻结
    { key: 'freezeUser' },
    // 获取扩展字段
    { key: 'getExtend', map: { extendField: 'data' } },
    // 创建用户
    { key: 'createUser', map: { createdUser: 'data' } },
    { key: 'checkUserName', return: true },
    // 获取单个用户信息
    { key: 'getUser', map: { userDetail: 'data' } },
    // 编辑用户信息
    { key: 'editUser' },
    // 重置密码
    { key: 'resetPassword', map: { password: 'data' } }
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

  @action.bound async batchCreateUser(params) {
    const res = await _api.batchCreateUser(params);
    this.update({
      createdUsers: res
    });
  }

  @action.bound async relateInstitute(params) {
    const res = await _api.relateInstitute(params);
    const treeData = (data) => {
      if (data) {
        return data.map((item) => {
          item.key = item.id;
          item.title = item.name;
          item.value = item.id;
          if (item.institutionTree) {
            item.children = treeData(item.institutionTree);
          }
          return item;
        });
      }
    };
    const relateInsData = treeData(res);
    this.update({
      relateInsData
    });
  }
}

export default new Eqpt();
