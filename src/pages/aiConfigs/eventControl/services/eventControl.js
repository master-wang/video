/**
 * 布控事件
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 获取视频源通道
    // { key: 'getTreeData', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 新增事件布控
    { key: 'addEvent', url: '/eventmonitor/create', method: 'post' },
    // 获取事件布控任务列表
    { key: 'queryPaging', url: '/eventmonitor/query_task_page', method: 'get' },
    // 删除事件
    { key: 'delete', url: '/eventmonitor/delete_monitor', method: 'delete' },
    // 获取事件的信息
    { key: 'getDetail', url: '/eventmonitor/query_monitor', method: 'get' }
  ]
};

export default req.genAjax(config);
