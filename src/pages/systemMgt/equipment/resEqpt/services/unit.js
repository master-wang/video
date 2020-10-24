/**
 * 服务单元相关接口
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 编辑服务单元信息
    { key: 'save', url: '/unit/:serverUnitId', method: 'put' },
    // 查询服务节点下的服务单元列表
    { key: 'queryPaging', url: '/unit/', method: 'get' },
    // 查询单个服务单元
    { key: 'queryEntity', url: '/unit/:serverUnitId', method: 'get' }
  ]
};

export default req.genAjax(config);
