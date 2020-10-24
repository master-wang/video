/**
 * 云台相关接口
 */
const config = {
  prefix: '/videobigdata',
  items: [
    // 查询节点信息和通道信息
    { key: 'adjustVideo', url: '/monitor/ptz', method: 'post' }
  ]
};

export default req.genAjax(config);
