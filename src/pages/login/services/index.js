/**
 * 用户登录相关接口
 */
// 老的登录
// const config = {
//   prefix: '/usercenter',
//   items: [
//     // 查询节点信息和通道信息
//     {
//       key: 'login', url: '/user/login', method: 'post', baseURL: ''
//     }
//   ]
// };
const { REACT_APP_USER_API_PREFIX, REACT_APP_COM_API_PREFIX } = process.env;

// 天权登录
const config = {
  prefix: '/',
  baseURL: `${REACT_APP_COM_API_PREFIX}`,
  items: [
    // // 登录
    // {
    //   key: 'login', url: 'login', method: 'post'
    // },
    // 获取登录用户的信息
    {
      key: 'getContext', url: 'user/web/v1/user/context', method: 'get'
    }
    // 退出登录
    // {
    //   key: 'logout', url: 'logout', method: 'post'
    // }
  ]
};

const userConfig = {
  prefix: '/',
  baseURL: `${REACT_APP_USER_API_PREFIX}`,
  items: [
    // 登录
    {
      key: 'login', url: 'login', method: 'post'
    },
    // 退出登录
    {
      key: 'logout', url: 'logout', method: 'post'
    }
  ]
};

export default {
  ...req.genAjax(config),
  ...req.genAjax(userConfig)
};
