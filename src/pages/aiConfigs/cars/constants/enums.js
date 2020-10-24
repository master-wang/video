function arrayToMap(key, data) {
  const map = {};
  data.forEach(item => {
    map[item[key]] = item;
  });
  return map;
}

const ENUM_MAP = {
  // 车辆库
  // 车辆库类别
  GARAGE_TYPE: [
    { key: '1', value: 1, name: '社区全量库' },
    { key: '2', value: 2, name: '黑名单库' },
    { key: '3', value: 3, name: '其他' }
  ],
  // 车辆布控
  // 布控状态
  CONTROL_STATE: [
    {
      key: '0', value: 0, name: '未执行', states: 'default'
    },
    {
      key: '1', value: 1, name: '执行中', states: 'processing'
    },
    {
      key: '2', value: 2, name: '已完成', states: 'success'
    },
    {
      key: '3', value: 2, name: '执行错误', states: 'error'
    },
    {
      key: '4', value: 2, name: '执行超时', states: 'error'
    },
    {
      key: '5', value: 2, name: '退出指令', states: 'error'
    }
  ],
  // 车辆管理
  // 车辆类型
  CAR_TYPE: [
    { key: 'a', value: 0, name: '客车' },
    { key: 'b', value: 1, name: '轿车' },
    { key: 'c', value: 2, name: '卡车' },
    { key: 'd', value: 3, name: 'SUV' },
    { key: 'e', value: 4, name: '拖车' },
    { key: 'f', value: 5, name: '货车' },
    { key: 'g', value: 6, name: '厢式货车' },
    { key: 'h', value: 7, name: '马车' }
  ],
  // 车身颜色
  CAR_COLOR: [
    {
      key: 'a', value: 0, name: '黑', color: '#000000'
    },
    {
      key: 'b', value: 1, name: '白', color: '#EBEFFF'
    },
    {
      key: 'c', value: 2, name: '红', color: '#E94A4A'
    },
    {
      key: 'd', value: 3, name: '棕', color: '#804E22'
    },
    {
      key: 'e', value: 4, name: '绿', color: '#26FF4A'
    },
    {
      key: 'f', value: 5, name: '蓝', color: '#0080FF'
    },
    {
      key: 'g', value: 6, name: '黄', color: '#FFFF24'
    },
    {
      key: 'h', value: 7, name: '灰', color: '#808080'
    },
    {
      key: 'k', value: 8, name: '粉', color: '#FB6EBF'
    }
  ],
  // 入库状态
  GARAGE_STATE: [
    {
      key: '1', value: 0, name: '成功', type: 'success'
    },
    {
      key: '0', value: 1, name: '失败', type: 'error'
    }
  ],
  // 车辆品牌
  CAR_BRAND: [
    { key: 'baoma', value: 0, name: '宝马' },
    { key: 'aodi', value: 1, name: '奥迪' },
    { key: 'wuling', value: 1, name: '五菱宏光' }
  ],
  // 批量的导入方式
  REQUERE_FILE: [
    { key: 'LOCAL', value: 0, name: '本地文件' },
    { key: 'db', value: 1, name: '数据库导入' }
  ]
};

const ENUMS = {};

Object.keys(ENUM_MAP).forEach(key => {
  ENUMS[key] = {
    array: ENUM_MAP[key],
    keyMap: arrayToMap('key', ENUM_MAP[key]),
    valueMap: arrayToMap('value', ENUM_MAP[key]),
    reverseMap: arrayToMap('reverse', ENUM_MAP[key])
  };
});

export default ENUMS;
