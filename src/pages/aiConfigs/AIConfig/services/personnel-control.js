/*
 * @describe: 请添加描述
 * @Author: 秋扬诺布(L.B.J)
 * @Date: 2020-03-23 14:50:44
 * @LastEditors: 秋扬诺布(L.B.J)
 * @LastEditTime: 2020-04-08 17:09:25
 */

const config = {
  prefix: '/videobigdata',
  items: [
    {
      key: 'queryPaging',
      url: '/monitor/query_task_page',
      method: 'get'
    },
    {
      key: 'queryEntity',
      url: '/monitor/query_monitor',
      method: 'get'
    },
    {
      key: 'save', url: '/monitor/create', method: 'post'
    },
    {
      key: 'update', url: '/monitor/update', method: 'post'
    },
    {
      key: 'delete', url: '/monitor/delete_monitor', method: 'delete'
    },
    // {
    //   key: 'queryNodeTree',
    //   url: '/location/channel/all',
    //   method: 'get'
    // },
    {
      key: 'getTreeData',
      url: '/location/list/:id',
      method: 'get'
    },
    {
      key: 'queryFaceLibTree',
      url: '/facelib/all',
      method: 'get'
    }
  ]
};

export default {
  ...req.genAjax(config)
};
