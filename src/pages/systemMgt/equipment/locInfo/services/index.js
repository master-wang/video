/**
 * 位置信息库相关接口
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 新增或编辑位置节点
    { key: 'save', url: '/location/' },
    // 删除位置节点
    { key: 'delete', url: '/location/:id', method: 'delete' },
    // 查询单个位置节点信息
    { key: 'queryLoc', url: '/location/:id', method: 'get' },
    // 查询某个位置节点的子节点集合
    { key: 'querySubLocs', url: '/location/tree/:id', method: 'get' },
    // 根据关键词检索
    { key: 'queryLocs', url: '/location/searching', method: 'get' },
    // 校验位置节点编码唯一性
    { key: 'validateCode', url: '/location/check/:code', method: 'get' }
  ]
};

export default req.genAjax(config);
