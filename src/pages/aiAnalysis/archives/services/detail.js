
const config = {
  prefix: '/videobigdata',
  items: [
    // 获取列表
    { key: 'queryPaging', url: '/persondb/query_dbface_page', method: 'post' },
    // 获取基本信息
    { key: 'getInfo', url: '/persondb/query_dbmsg', method: 'get' },
    // 删除档案
    { key: 'delete', url: '/persondb/delete_db', method: 'delete' },
    // 添加标签
    { key: 'addSign', url: '/persondb/update_dbmsg', method: 'post' },
    // 删除人像
    { key: 'delete', url: '/persondb/delete_face_byparam', method: 'delete' },
    // 获取出行轨迹分析
    { key: 'getTraves', url: '/persondb/getlocation_stat', method: 'post' },
    // 查询节点信息和通道信息
    // { key: 'queryChannelInfo', url: '/location/channel/all', method: 'get' },
    { key: 'getTreeData', url: '/location/list/:id', method: 'get' },
    // 获取地图抓拍地点信息
    { key: 'getlocation', url: '/persondb/getlocation', method: 'post' }
  ]
};

export default req.genAjax(config);
