function arrayToMap(key, data) {
  const map = {};
  data.forEach(item => {
    map[item[key]] = item;
  });
  return map;
}

const ENUM_MAP = {
  // 任务类型
  TASK_TYPE: [
    {
      key: '101', value: 101, name: '周界入侵', showObj: true
    }, // showObj 变量控制选择周围入侵的话，显示入侵告警对象表单
    { key: '110', value: 110, name: '物品拿取' },
    {
      key: '106', value: 106, name: '人群聚集', showPerson: true
    },
    {
      key: '102', value: 102, name: '越界侦测'
    },
    {
      key: '103', value: 103, name: '进入区域'
    },
    {
      key: '104', value: 104, name: '离开区域'
    },
    {
      key: '105', value: 105, name: '人员徘徊'
    },
    {
      key: '107', value: 107, name: '快速移动'
    },
    {
      key: '108', value: 108, name: '停车侦测'
    },
    {
      key: '109', value: 109, name: '物品遗留'
    }
  ],
  // 入侵告警对象
  ALARM_OBJ: [
    { key: '1', value: 0, name: '人员' },
    { key: '2', value: 1, name: '车辆' },
    { key: '3', value: 2, name: '全部' }
  ],
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
