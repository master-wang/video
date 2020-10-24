
const config = {
  prefix: '/videobigdata',
  items: [
    // 获取列表
    { key: 'queryPaging', url: '/persondb/query_db_page', method: 'post' },
    // 通过图片获取列表
    { key: 'getDataByImg', url: '/persondb/get_from_img', method: 'post' },
    // 删除档案
    { key: 'delete', url: '/persondb/delete_db', method: 'delete' }
  ]
};

export default req.genAjax(config);
