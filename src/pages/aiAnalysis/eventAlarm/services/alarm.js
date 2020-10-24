/**
 * 布控事件告警
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 查询节点信息和通道信息
    { key: 'queryPaging', url: '/eventmonitorLog/query_log_page', method: 'get' },
    // 删除告警
    { key: 'delete', url: '/eventmonitorLog/delete', method: 'delete' },
    // 获取告警详情
    { key: 'getDetail', url: '/eventmonitorLog/query_log', method: 'get' },
    // 获取视频源通道
    // { key: 'getTreeData', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 获取布控任务
    { key: 'getTask', url: '/eventmonitor/query_task_page', method: 'get' },
    // 更新事件告警审核状态
    { key: 'updateLog', url: '/eventmonitorLog/update_log', method: 'get' }
  ]
};

export default req.genAjax(config);
