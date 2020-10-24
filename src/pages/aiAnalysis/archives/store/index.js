
import _ from 'lodash';
import { action } from 'mobx';
import { message } from 'antd';
import { tableMerge } from '@/decorators/store';
import _api from '../services';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 列表
  dataSource: [],
  loading: false,
  // 关键字查询
  key: '',
  // 智能搜索图片
  fileList: []

};

/**
 * 可配置ACTION
 */
const ACTIONS = {
  caller: _api,
  items: [
    // 获取列表
    { key: 'queryPaging' },
    // 删除档案
    { key: 'delete' }
  ]
};

/**
 *
 */
@tableMerge(DEFAULTS, ACTIONS)
class Alarm {
  constructor() {
    this.init();
  }

  @action.bound async getDataByImg({ query, sorter, pagination } = {}) {
    this.update({
      loading: true,
      query: { ...this.query, ...query },
      sorter: { ...this.sorter, ...sorter },
      pagination: { ...this.pagination, ...pagination }
    });
    try {
      const data = await _api.getDataByImg({
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
          total: data.pageInfo ? _.get(data, 'pageInfo.total', 0) : _.get(data, 'pageInfoDto.total', 0)
        },
        dataSource: _.get(data, 'list', [])
      });
    } catch (err) {
      message.error(typeof err === 'string' ? err : err.message);
      this.update({ loading: false });
    }
  }
}

export default new Alarm();
