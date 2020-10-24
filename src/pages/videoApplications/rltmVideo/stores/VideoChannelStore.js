import { action } from 'mobx';
import { message } from 'antd';
import { merge } from '@/decorators/store';
import _api from '../services';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 是否正在加载
  loading: false,
  // 视频设备列表数据
  treeData: [],
  // 选中的channelId
  channelId: null
};


/**
 * 视频设备状态管理
 */
@merge(DEFAULTS)
class VideoTreeStore {
  constructor() {
    this.init();
  }

  /**
   * 查询节点信息和通道信息
   */
  @action.bound
  async queryChannelInfo(id) {
    try {
      const data = await _api.queryChannelInfo({ id, lazy: false });
      this.update({
        treeData: data
      });
      return data;
    } catch (e) {
      message.error(e.message);
      this.update({ loading: false });
    }
  }
}

export default new VideoTreeStore();
