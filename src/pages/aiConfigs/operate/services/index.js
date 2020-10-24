
const config = {
  prefix: '/videobigdata',
  items: [
    // 获取列表
    { key: 'queryPaging', url: '/device/query_monitor_page', method: 'post' },
    // 获取服务器列表
    { key: 'getService', url: '/device/get_list', method: 'get' },
    // 获取通道列表
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 添加任务布控
    { key: 'addTask', url: '/device/create_monitor', method: 'post' },
    // 编辑任务布控
    { key: 'updateTask', url: '/device/create_monitor', method: 'post' },
    // 查询单个任务的信息
    { key: 'getEntry', url: '/device/query_monitor', method: 'get' },
    // 删除任务
    { key: 'delete', url: '/device/delete_monitors', method: 'delete' }
  ]
};

export default req.genAjax(config);
