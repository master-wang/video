/**
 * 服务节点相关接口
 */

const config1 = {
  prefix: '/videobigdata',
  items: [
    // 新增或编辑服务节点
    { key: 'save', url: '/node/' },
    // 删除服务节点
    { key: 'delete', url: '/node/:nodeCode', method: 'delete' },
    // 分页查询服务节点信息
    { key: 'queryPaging', url: '/node/', method: 'get' },
    // 查询单个服务节点信息
    { key: 'queryEntity', url: '/node/:nodeCode', method: 'get' },
    { key: 'queryUnits', url: '/unit/common/units', method: 'get' }
  ]
};

export default {
  ...req.genAjax(config1)
};
