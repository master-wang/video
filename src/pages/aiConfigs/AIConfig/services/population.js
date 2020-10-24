/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:50:44
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-08 17:44:20
 */
const config = {
  prefix: '/videobigdata',
  items: [
    { key: 'save', url: '/facelib/create' },
    {
      key: 'queryEntity',
      url: '/facelib/query_lib',
      method: 'get'
    },
    {
      key: 'edit', url: '/facelib/query_lib', method: 'put'
    },
    {
      key: 'delete', url: '/facelib/delete', method: 'delete'
    },
    {
      key: 'queryPaging',
      url: '/facelib/query_lib_page',
      method: 'get'
    }
  ]
};

export default {
  ...req.genAjax(config)
};
