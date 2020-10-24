/**
 *
 */

const config = {
  prefix: '/videobigdata',
  items: [
    // 车辆识别列表
    { key: 'queryPaging', url: '/query/face', method: 'post' },
    // 获取视频源通道
    // { key: 'getTreeData', url: '/location/channel/all', method: 'get' }
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' }
  ]
};

export default {
  ...req.genAjax(config)
};
