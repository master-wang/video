/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:50:44
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-08 17:08:59
 */

const config = {
  prefix: '/videobigdata',
  items: [
    {
      key: 'queryPaging',
      url: '/facelib/query_lib_face',
      method: 'get'
    },
    {
      key: 'queryEntity',
      url: '/facelib/query_person',
      method: 'get'
    },
    {
      key: 'save', url: '/facelib/update_face', method: 'post'
    },
    {
      key: 'delete', url: '/facelib/delete_person', method: 'delete'
    },
    {
      key: 'deleteFace', url: '/facelib/delete_one_face', method: 'delete'
    }
  ]
};

export default {
  ...req.genAjax(config)
};
