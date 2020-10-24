import { tableMerge } from '@/decorators/store';
import _api from '../services/detail';

import { PAGINATION } from '../constants/index';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 列表
  dataSource: [],
  loading: false,
  // 分页信息
  pagination: PAGINATION,
  // tab的路由
  tabVal: 'capture',
  // 通道信息
  treeData: [],
  // 出现规律分析选中的记录id
  selectedRowKeys: [],
  // 档案库基本信息
  dbInfo: {},
  // 新增的标签
  sign: '',
  // 抓拍图片的放大
  imgUrl: '',
  imgVisible: false,
  // 查询档案下人脸的通道
  channelId: [],

  // 地图抓拍位置信息
  locations: [],
  name: ''

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取列表
    { key: 'queryPaging', map: { dataSource: 'faceList' } },
    // 获取基本信息
    { key: 'getInfo', map: { dbInfo: 'data' } },
    // 添加标签
    { key: 'addSign' },
    // 删除人像
    { key: 'delete' },
    // 获取通道
    { key: 'getTreeData', return: true },
    // 获取地图抓拍地点信息
    { key: 'getlocation', map: { locations: 'data' } }
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
