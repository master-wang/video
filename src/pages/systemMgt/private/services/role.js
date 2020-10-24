/**
 * 服务节点相关接口
 */

const config1 = {
  prefix: '/videobigdata',
  items: [
    // 分页查询服务节点信息
    { key: 'queryPaging', url: '/character/query_page', method: 'post' },
    // 获取通道列表
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 创建角色
    { key: 'save', url: '/character/create', method: 'post' },
    // 角色名称校验
    { key: 'checkName', url: '/character/check_name', method: 'get' },
    // 查询角色信息
    { key: 'queryEntity', url: '/character/query_one', method: 'get' },
    // 删除角色
    { key: 'delete', url: '/character/delete', method: 'delete' },
    // 冻结/启用角色
    { key: 'feelRole', url: '/character/change_status', method: 'get' },
    // 更新权限
    { key: 'updatePri', url: '/character/update', method: 'post' }
  ]
};

export default {
  ...req.genAjax(config1)
};
