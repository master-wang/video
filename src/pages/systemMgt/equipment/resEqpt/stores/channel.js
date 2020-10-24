import { action } from 'mobx';
import { message } from 'antd';
import _ from 'lodash';
import { tableMerge } from '@/decorators/store';
import _api from '../services/channel';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 当前视频设备
  eqpt: {},
  // 当前列表点击的通道
  entity: {},
  // 通道弹窗操作类型(add|edit)
  action: 'edit',
  // 通道弹窗是否可见
  visible: false
};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 保存
    { key: 'save' },
    // 查询详情
    { key: 'queryEntity', map: { entity: 'data' } }
  ]
};


/**
 * 服务节点状态管理
 */
@tableMerge(DEFAULTS, ACTIONS)
class Channel {
  constructor() {
    this.init();
  }

  /**
   * 服务节点列表分页查询
   * @param {object} query
   * @param {object} pagination
   */
  @action.bound
  async queryPaging({ query, pagination } = {}) {
    this.update({
      loading: true,
      query: { ...this.query, ...query },
      pagination: { ...this.pagination, ...pagination }
    });
    try {
      const data = await _api.queryPaging({
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        orderProperty: this.sorter.field,
        orderDirection: this.sorter.order,
        ...this.query
      });
      this.update({
        loading: false,
        pagination: {
          ...this.pagination,
          total: _.get(data, 'pageInfo.total', 0)
        },
        eqpt: _.pick(data.list, ['equipmentCode', 'equipmentName', 'equipmentIp']),
        dataSource: _.get(data, 'list.channelList', [])
      });
    } catch (e) {
      message.error(e.message);
      this.update({ loading: false });
    }
  }
}

export default new Channel();
