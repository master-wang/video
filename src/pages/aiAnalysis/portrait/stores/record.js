import { action } from 'mobx';
import { message } from 'antd';
import { merge } from '@/decorators/store';
import { PAGINATION } from '../constants/index';
// 人脸查询的接口
import _api from '../services/record';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 是否正在加载
  loading: false,
  // 通道树
  treeData: [],
  // 选中的channelId
  channelId: null,

  // 人脸查询列表
  faceList: [],
  // 分页信息
  pagination: PAGINATION,
  // 控制今天、近三天、近一周的变量
  ctDay: 3,
  // 查询列表参数
  queryParams: {
    dbType: '0',
    startTime: null,
    endTime: null,
    channelId: null,
    sex: null,
    age: null,
    hair: null,
    bodilyForm: null,
    jacketColor: null,
    bottomColor: null,
    accessory: null,
    pageInfo: {
      pageNumber: 1,
      pageSize: 20,
      total: null
    }
  },
  // 上次查询条件
  lastQueryParams: {}
};


/**
 * 人脸查询状态管理
 */
@merge(DEFAULTS)
class FacePage {
  constructor() {
    this.init();
  }

  /**
   * 查询人脸列表
   */
  @action.bound
  async queryFaceList({ pageInfo = { } } = { }) {
    const { pageSize, current: pageNumber } = this.pagination;
    const query = {
      ...this.lastQueryParams,
      pageInfo: {
        pageNumber,
        pageSize,
        total: null,
        ...pageInfo
      }
    };
    try {
      const result = await _api.queryFaceList(query);
      const {
        list = [],
        pageInfoDto: { pageNumber: resPageNumber, pageSize: resPageSize, total }
      } = result;
      this.update({
        faceList: list,
        pagination: {
          ...this.pagination,
          ...{
            current: resPageNumber,
            pageSize: resPageSize,
            total
          }
        }
      });
    } catch (e) {
      message.error(e.message);
    }
  }

  /**
   * 查询节点信息和通道信息
   */
  @action.bound
  async getTreeData(params) {
    try {
      return await _api.getTreeData(params);
    } catch (e) {
      message.error(e.message);
      this.update({ loading: false });
    }
  }

  @action.bound updateParams(params) {
    this.update({
      queryParams: {
        ...this.queryParams,
        ...params
      }
    });
  }

  // 更新
  @action.bound updateAccessory(params) {
    const {
      queryParams: {
        accessory: arr
      }
    } = this;
    const mySet = new Set(arr);
    const { state, val } = params;
    if (state) {
      mySet.add(val);
    } else {
      mySet.delete(val);
    }
    this.update({
      queryParams: {
        ...this.queryParams,
        ...{
          accessory: [...mySet]
        }
      }
    });
  }

  @action.bound resetQueryParams() {
    this.update({
      queryParams: {
        dbType: 0,
        startTime: null,
        endTime: null,
        channelId: null,
        sex: null,
        age: null,
        hair: null,
        bodilyForm: null,
        jacketColor: null,
        bottomColor: null,
        accessory: null
      }
    });
  }

  // 设置上一次查询条件
  @action.bound setLastQueryParams() {
    this.update({
      lastQueryParams: {
        ...this.queryParams,
        sex: this.queryParams.sex ? `${this.queryParams.sex}` : null,
        age: this.queryParams.age ? `${this.queryParams.age}` : null
      }
    });
  }
}

export default new FacePage();
