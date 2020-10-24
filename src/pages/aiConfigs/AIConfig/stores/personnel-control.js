/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:47:32
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-20 16:04:55
 */
// import { action } from 'mobx';
// import { message } from 'antd';
import { action } from 'mobx';
import { message } from 'antd';
import { tableMerge } from '@/decorators/store';
import _api from '../services/personnel-control';

/**
 * 默认状态
 */
const DEFAULTS = {
  entity: {},
  visible: false,
  action: 'add',
  // 视频源通道
  treeData: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // { key: 'save' },
    { key: 'delete' },
    { key: 'getTreeData', return: true },
    { key: 'queryFaceLibTree' },
    { key: 'queryEntity', map: { entity: 'data' } },
    { key: 'queryPaging', map: { entity: 'data' } }
  ]
};


/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class PersonnelControlStores {
  constructor() {
    this.init();
  }

  @action.bound
  async save(params) {
    try {
      if (this.action === 'add') {
        await _api.save(params);
        this.update({ visible: false });
        this.queryPaging();
        return;
      }
      await _api.update(params);
      this.update({ visible: false });
      this.queryPaging();
    } catch (e) {
      message.error(e.message);
    }
  }
}

export default new PersonnelControlStores();
