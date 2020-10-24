const config = {
  prefix: '/videobigdata',
  items: [
    { key: 'queryPaging', url: '/carlib/query_lib_car', method: 'get' },
    // 获取车辆库列表
    { key: 'getGarageList', url: '/carlib/all', method: 'get' },
    // 车辆号码校验
    { key: 'checkCarNumber', url: '/carlib/check_car', method: 'get' },
    // 添加车辆
    { key: 'addGarage', url: '/carlib/update_car', method: 'post' },
    // 删除车辆
    { key: 'delete', url: '/carlib/delete_car', method: 'delete' },
    // 获取车辆信息
    { key: 'getEditInfo', url: '/carlib/query_car', method: 'get' },
    // 删除车辆图片
    { key: 'deleteImg', url: '/carlib/delete_one_img', method: 'delete' }
  ]
};

export default {
  ...req.genAjax(config)
};
