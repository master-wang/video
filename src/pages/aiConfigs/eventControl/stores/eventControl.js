import { action } from 'mobx';
import { tableMerge } from '@/decorators/store';
import _api from '../services/eventControl';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 布控列表
  dataSource: [],
  // 控制添加布控任务的弹窗变量
  visible: false,
  action: 'add',
  // 控制布控区域的弹窗
  ereaVisible: false,
  // 编辑的id
  taskId: '',
  // 弹窗信息
  editInfo: {},
  // 处理好的弹窗信息
  info: {},
  // 布控任务弹窗的table列表
  ControlAreaList: [],
  // 通道
  treeData: [],

  // 进行画图的数据id
  id: '',
  // 进行画图的通道id
  channelId: '',
  // 点击画图的通道名称
  channelName: '',
  // 进行画图的数据
  regions: []
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取抓拍通道通道
    // { key: 'getTreeData', map: { treeData: 'data' } },
    { key: 'getTreeData', return: true },
    // 新增事件布控
    { key: 'addEvent' },
    // 获取事件布控任务列表
    { key: 'queryPaging' },
    // 删除事件
    { key: 'delete' },
    // 获取事件的信息
    { key: 'getDetail', map: { editInfo: 'data' } }
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

  // 更新布控范围的数据
  @action.bound updateControlArea({ id, field, val }) {
    const newArr = [];
    this.ControlAreaList.forEach(item => {
      const temp = item;
      if (item.id === id) {
        field.forEach((fie, index) => {
          temp[fie] = val[index];
        });
      }
      newArr.push(temp);
    });
    this.update({
      ControlAreaList: newArr
    });
  }
}

export default new Alarm();
