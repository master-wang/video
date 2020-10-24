/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:47:32
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-01 14:46:13
 */
// import { action } from 'mobx';
// import { message } from 'antd';
import { tableMerge } from '@/decorators/store';
import _api from '../services/portrait';

/**
 * 默认状态
 */
const DEFAULTS = {
  entity: {},
  visible: false,
  action: 'add',
  imgUrl: '',
  imgVisible: false
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    { key: 'save' },
    { key: 'delete' },
    { key: 'deleteFace' },
    { key: 'queryEntity', map: { entity: 'data' } },
    { key: 'queryPaging', map: { entity: 'data' } }
  ]
};


/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class PortraitStores {
  constructor() {
    this.init();
  }
}

export default new PortraitStores();
