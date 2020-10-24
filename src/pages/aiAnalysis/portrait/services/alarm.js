/**
 * 布控告警
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 查询布控告警列表
    { key: 'queryPaging', url: '/monitorLog/query_log_page', method: 'get' },
    // 查询节点信息和通道信息
    // { key: 'queryChannelInfo', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 获取人像分析布控任务列表
    { key: 'getTasklist', url: '/monitor/query_task_page', method: 'get' },
    // 获取人口库列表
    { key: 'getFacelib', url: '/facelib/all', method: 'get' },
    // 查询布控告警的详情
    { key: 'getDetail', url: '/monitorLog/query_log', method: 'get' },
    // 查询布控告警的详情更多人脸
    { key: 'getMoreFaces', url: '/monitorLog/query_other_log', method: 'get' },
    // 删除布控告警
    { key: 'deleteItem', url: '/monitorLog/delete', method: 'delete' }
  ]
};

export default req.genAjax(config);
