import { action, extendObservable } from 'mobx';
// import { message } from 'antd';
import { merge } from '@/decorators/store';

/**
 * 默认状态
 */
const DEFAULTS = {
  // 大屏幕数量
  frameNum: 1,
  // 焦点屏幕号
  focusFrame: 1,

  // 控制视频全屏的变量
  fullScreenState: false
};

/**
 * 实时采集监控展示状态管理
 */
@merge(DEFAULTS)
class VideoConStore {
  constructor() {
    this.init();
  }

  @action.bound initPlayer(num) {
    for (let i = 0; i < num; i++) {
      if (this[`jdplayer${i + 1}`] === undefined) {
        extendObservable(this, { [`jdplayer${i + 1}`]: null });
      } else {
        this[`jdplayer${i + 1}`] = null;
      }
    }
  }

  @action.bound destoryPlayer(num) {
    for (let i = 0; i < num; i++) {
      if (this[`jdplayer${i + 1}`]) {
        this[`jdplayer${i + 1}`].destroy();
        this[`jdplayer${i + 1}`] = null;
      }
    }
  }

  @action.bound destoryAllPlayer(unit) {
    if (this[`jdplayer${unit || this.focusFrame}`]) {
      this[`jdplayer${unit || this.focusFrame}`].destroy();
      this[`jdplayer${unit || this.focusFrame}`] = null;
    }
  }
}

export default new VideoConStore();
