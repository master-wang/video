/**
 * 实时直播视频相关接口
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 查询节点信息和通道信息
    // { key: 'queryChannelInfo', url: '/location/channel/tree/:id', method: 'get' }
    { key: 'queryChannelInfo', url: '/location/list/:id', method: 'get' }
  ]
};

export default req.genAjax(config);
