/**
 * 视频设备相关接口
 */

const basicConfig = {
  prefix: '/videobigdata',
  items: [
    // 新增视频设备信息
    { key: 'add', url: '/equipment/' },
    // 编辑视频设备信息
    { key: 'edit', url: '/equipment/:id', method: 'put' },
    // 删除服务节点
    { key: 'delete', url: '/equipment/delete' },
    // 分页查询视频设备信息
    { key: 'queryPaging', url: '/equipment/', method: 'get' },
    // 查询单个视频设备信息
    { key: 'queryEntity', url: '/equipment/:id', method: 'get' },
    // 校验视频设备编码唯一性
    { key: 'validateCode', url: '/equipment/check/:code', method: 'get' }
  ]
};

const extraConfig = {
  prefix: '/videobigdata',
  items: [
    // 查询位置信息, 查询根节点下的子节点时，id传0
    { key: 'queryLocs', url: '/location/tree/:id', method: 'get' }
  ]
};

export default {
  ...req.genAjax(basicConfig),
  ...req.genAjax(extraConfig)
};
