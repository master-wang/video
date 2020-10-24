const config = {
  prefix: '/videobigdata',
  items: [
    { key: 'queryPaging', url: '/carmonitor/query_task_page', method: 'get' },
    // 获取布控车辆库列表
    { key: 'getGarageList', url: '/carlib/all', method: 'get' },
    // 获取视频源通道
    // { key: 'getTreeData', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 添加布控任务
    { key: 'addGarage', url: '/carmonitor/create', method: 'post' },
    { key: 'edit', url: '/carmonitor/update', method: 'post' },
    // 删除布控任务
    { key: 'delete', url: '/carmonitor/delete_monitor', method: 'delete' },
    // 获取单个布控任务信息
    { key: 'getEditInfo', url: '/carmonitor/query_monitor', method: 'get' }
  ]
};

export default {
  ...req.genAjax(config)
};
