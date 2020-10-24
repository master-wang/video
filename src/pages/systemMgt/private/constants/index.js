const menuItems = [{
  children: [{
    path: '/videoApplications/rltmVideo', name: '实时监控', id: 'videoApplication&&1', parentPaths: ['/videoApplications/rltmVideo']
  }, {
    path: '/videoApplications/inspection', name: '智能巡检', id: 'videoApplication&&2', parentPaths: ['/videoApplications/rltmVideo']
  }],
  path: '/videoApplications/rltmVideo',
  icon: 'rltm_video',
  name: '视频应用',
  isDropMenu: true,
  id: 'videoApplication&&1-2'
}, {
  children: [{
    path: '/aiAnalysis/portrait', name: '人像分析', id: 'aiAnalysis&&1', parentPaths: ['/aiAnalysis']
  }, {
    path: '/aiAnalysis/carRecognition', name: '车辆识别', id: 'aiAnalysis&&2', parentPaths: ['/aiAnalysis']
  }, {
    path: '/aiAnalysis/eventAlarm', name: '布控事件告警', id: 'aiAnalysis&&3', parentPaths: ['/aiAnalysis']
  }, {
    path: '/aiAnalysis/archives',
    name: '一人一档',
    id: 'aiAnalysis&&4',
    parentPaths: ['/aiAnalysis']
  }],
  path: '/aiAnalysis',
  icon: 'aiAnalysis',
  name: '智能分析',
  isDropMenu: true,
  id: 'aiAnalysis&&1-2-3-4'
}, {
  children: [{
    path: '/aiConfig',
    name: '人口库管理',
    id: 'videoSetting&&1',
    parentPaths: ['/aiconfigs']
  }, {
    path: '/aiconfigs/cars',
    name: '车辆库管理',
    id: 'videoSetting&&2',
    parentPaths: ['/aiconfigs']
  }, {
    path: '/aiconfigs/eventControl', name: '事件布控', id: 'videoSetting&&3', parentPaths: ['/aiconfigs']
  }, {
    path: '/aiconfigs/operate', name: '智能巡检配置', id: 'videoSetting&&4', parentPaths: ['/aiconfigs']
  }],
  path: '/aiconfigs',
  icon: 'res_eqpt',
  name: '智能配置',
  isDropMenu: true,
  id: 'videoSetting&&1-2-3-4'
}, {
  children: [{
    path: '/systemMgt/resEqpt',
    name: '资源设备管理',
    id: 'systemSetting&&1',
    parentPaths: ['/systemMgt']
  }, {
    path: '/systemMgt/maintain', name: '维护升级管理', id: 'systemSetting&&2', parentPaths: ['/systemMgt']
  }, {
    path: '/systemMgt/private', name: '权限管理', id: 'systemSetting&&3', parentPaths: ['/systemMgt']
  }],
  path: '/systemMgt',
  icon: 'systemMgt',
  name: '系统管理',
  isDropMenu: true,
  id: 'systemSetting&&1-2-3'
}];


export {
  menuItems
};
