/**
 * 车辆告警
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 获取车辆告警列表
    { key: 'queryPaging', url: '/carmonitorLog/query_log_page', method: 'get' },
    // 获取视频源通道
    // { key: 'getTreeData', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 获取车辆布控任务
    { key: 'getTask', url: '/carmonitor/query_task_page', method: 'get' },
    // 获取车辆库列表
    { key: 'getCarLib', url: '/carlib/all', method: 'get' },
    // 删除车辆告警
    { key: 'delete', url: '/carmonitorLog/delete', method: 'delete' },
    // 查询布控告警的详情
    { key: 'getDetail', url: '/carmonitorLog/query_log', method: 'get' },
    // 提交告警正误报
    { key: 'updateLog', url: '/carmonitorLog/update_log', method: 'get' }
  ]
};

export default req.genAjax(config);
