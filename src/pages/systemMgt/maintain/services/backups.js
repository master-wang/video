/**
 * 服务节点相关接口
 */

const config1 = {
  prefix: '/videobigdata',
  items: [
    // 分页查询服务节点信息
    { key: 'queryPaging', url: '/', method: 'get' }
  ]
};

export default {
  ...req.genAjax(config1)
};
