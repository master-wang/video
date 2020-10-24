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
  // 审核状态
  APPROL_STATE: [
    {
      key: '0', value: 0, name: '未审核', states: 'default'
    },
    {
      key: '1', value: 1, name: '已审核', states: 'success'
    }
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
