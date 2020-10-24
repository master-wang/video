function arrayToMap(key, data) {
  const map = {};
  data.forEach(item => {
    map[item[key]] = item;
  });
  return map;
}

const ENUM_MAP = {
  // 车辆识别
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
  // 性别
  SEX: [
    { key: '1', value: 1, name: '男' },
    { key: '2', value: 2, name: '女' }
  ],
  // 证件照
  CARDTYPE: [
    { key: '0', value: 0, name: '身份证' },
    { key: '1', value: 1, name: '护照' },
    { key: '2', value: 2, name: '工号' }
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
