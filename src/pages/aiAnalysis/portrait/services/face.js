/**
 * 人脸对比
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 获取人脸对比列表
    { key: 'queryPaging', url: '/compare/getresult', method: 'get' },
    // 获取人口库列表
    { key: 'getFacelibs', url: '/facelib/all', method: 'get' },
    // 新建比对任务
    { key: 'createTask', url: '/compare/create', method: 'post' },
    // 删除比对任务
    { key: 'deleteTask', url: '/compare/delete', method: 'delete' },
    // 查询单个比中结果的详情
    { key: 'getResult', url: '/compare/getone', method: 'get' }
  ]
};

export default req.genAjax(config);
