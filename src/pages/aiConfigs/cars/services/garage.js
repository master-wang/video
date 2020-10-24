const config = {
  prefix: '/videobigdata',
  items: [
    // 车辆库名字的校验
    { key: 'checkName', url: '/carlib/check_lib_name', method: 'get' },
    // 获取车辆库列表
    { key: 'queryPaging', url: '/carlib/query_lib_page', method: 'get' },
    // 删除车辆库
    { key: 'delete', url: '/carlib/delete', method: 'delete' },
    // 添加车辆库
    { key: 'addGarage', url: '/carlib/create', method: 'post' },
    // 获取编辑的车辆库信息
    { key: 'getGarageInfo', url: '/carlib/query_lib', method: 'get' },
    // 编辑车辆库信息
    { key: 'editGarage', url: '/carlib/create', method: 'post' }
  ]
};

export default {
  ...req.genAjax(config)
};
