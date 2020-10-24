import _ from 'lodash';
import { action, extendObservable } from 'mobx';
import { message } from 'antd';
import { merge } from '@/decorators/store';

function toMap(data) {
  const map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  return map;
}

const DEFAULTS = {

};

/**
 * 全局枚举状态管理
 */
@merge(DEFAULTS)
class Enums {
  constructor() {
    this.init();
    // 追加静态路由
    const STATIC_ENUMS = CST.ENUMS;
    const keys = Object.keys(STATIC_ENUMS);
    keys.forEach(key => {
      this[key] = {
        array: STATIC_ENUMS[key],
        map: toMap(STATIC_ENUMS[key])
      };
    });
  }

  @action.bound
  async queryEnums(types = []) {
    types = (_.isArray(types) ? types : [types]).filter(type => _.isEmpty(this[type]));
    if (_.isEmpty(types)) {
      return;
    }
    try {
      const data = await api.common.queryEnums(types) || [];
      const payload = {};
      data.forEach(group => {
        const array = group.list || [];
        const map = {};
        array.forEach(item => {
          map[item.id] = item;
        });
        payload[group.type] = { array, map };
      });
      extendObservable(this, payload);
    } catch (e) {
      message.error(e.message);
    }
  }
}

export default new Enums();
