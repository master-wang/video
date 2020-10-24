const config = {
  prefix: '/videobigdata',
  items: [
    { key: 'queryPaging', url: '/', method: 'get' },
    // 获取服务器列表
    { key: 'getTreeData', url: '/device/get_list', method: 'get' },
    // 获取单个服务器的信息
    { key: 'getDeviceInfo', url: '/device/get_one', method: 'get' },
    // 查询服务单元的类型
    { key: 'queryUnits', url: '/unit/common/units', method: 'get' },
    // 查询告警记录
    { key: 'queryPaging', url: '/device/query_log_page', method: 'post' },
    // 查询单个告警
    { key: 'getEntry', url: '/device/query_log', method: 'get' },
    // 删除告警
    { key: 'delete', url: '/device/delete_log', method: 'delete' }
  ]
};

export default {
  ...req.genAjax(config)
};
