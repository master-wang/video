
const { REACT_APP_COM_API_PREFIX } = process.env;
const basicConfig = {
  prefix: `${REACT_APP_COM_API_PREFIX}/user/web/v1`,
  items: [
    // 分页查询
    { key: 'queryPaging', url: '/users/command/search' },
    // 冻结用户
    { key: 'freezeUser', url: '/user/:userId/command/freeze/:freeze', method: 'PATCH' },
    // 获取扩展字段
    { key: 'getExtend', url: '/user/extend/column', method: 'get' },
    // 创建用户
    { key: 'createUser', url: '/user' },
    // 用户名校验
    { key: 'checkUserName', url: '/user/command/check', method: 'get' },
    // 获取单个用户
    { key: 'getUser', url: '/user/:userId', method: 'get' },
    // 更改单个用户
    { key: 'editUser', url: '/user/:userDetailId', method: 'PUT' },
    // 批量创建用户
    { key: 'batchCreateUser', url: '/users' },
    // Excel上传
    { key: 'excelUpload', url: '/user/command/upload' },
    // 重置密码
    { key: 'resetPassword', url: '/user/accountcipher/reset/:userId', method: 'PUT' }
  ]
};

const config2 = {
  prefix: `${REACT_APP_COM_API_PREFIX}/institution/web/v1`,
  items: [
    // 关联组织机构
    {
      key: 'relateInstitute', url: '/institutions', method: 'get', headers: { 'content-Type': 'application/json' }
    }
  ]
};


export default {
  ...req.genAjax(basicConfig),
  ...req.genAjax(config2)
};
