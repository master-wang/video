/**
 * 公共接口
 */
const config = {
  prefix: '/videobigdata',
  items: [
    // 查询枚举值
    { key: 'queryEnums', url: '/equipment/common/enum/', method: 'post' }
  ]
};

export default req.genAjax(config);
