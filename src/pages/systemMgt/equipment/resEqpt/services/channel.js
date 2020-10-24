/**
 * 视频设备通道相关接口
 */
const config = {
  prefix: '/videobigdata',
  items: [
    // 编辑通道信息
    { key: 'save', url: '/channel/:channelId', method: 'put' },
    // 查询通道列表
    { key: 'queryPaging', url: '/channel/', method: 'get' },
    // 查询单个通道
    { key: 'queryEntity', url: '/channel/:channelId', method: 'get' }
  ]
};

export default req.genAjax(config);
