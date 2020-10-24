function arrayToMap(key, data) {
  const map = {};
  data.forEach(item => {
    map[item[key]] = item;
  });
  return map;
}

const ENUM_MAP = {
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
