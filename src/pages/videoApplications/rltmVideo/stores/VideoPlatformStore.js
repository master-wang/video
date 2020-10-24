import { action } from 'mobx';
import { message } from 'antd';
import { merge } from '@/decorators/store';
import _api from '../services/platform';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 是否正在加载
  loading: false,
  // 云台的速度
  speed: 50
};

/**
 * 云台管理
 */
@merge(DEFAULTS)
class VideoPlatformStore {
  constructor() {
    this.init();
  }

  @action.bound
  async adjustVideo(params) {
    try {
      await _api.adjustVideo({ ...params, t: Date.now() });
    } catch (e) {
      message.error(e.message);
    }
  }
}

export default new VideoPlatformStore();
