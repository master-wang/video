/**
 * 抓拍记录
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 查询人脸列表
    { key: 'queryFaceList', url: '/query/face', method: 'post' },
    // 查询节点信息和通道信息
    // { key: 'queryChannelInfo', url: '/location/channel/all', method: 'get' }
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' }
  ]
};

export default req.genAjax(config);
