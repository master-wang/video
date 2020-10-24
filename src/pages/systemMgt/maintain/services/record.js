
const basicConfig = {
  prefix: '/videobigdata',
  items: [
    // 分页查询
    { key: 'queryPaging', url: '/character/query_systemlog_page' },
    // 删除
    { key: 'delete', url: '/character/delete_systemlog', method: 'delete' }
  ]
};


export default {
  ...req.genAjax(basicConfig)
};
